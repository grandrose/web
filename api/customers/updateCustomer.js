export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { accessToken, customerData } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  if (!customerData || Object.keys(customerData).length === 0) {
    return res.status(400).json({ error: "No data provided to update." });
  }

  const SHOPIFY_STORE_DOMAIN = process.env.REACT_APP_SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
    process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  try {
    // ---------------------------------
    // 1) Basic Customer Update (Email, Name, Phone, etc.)
    // ---------------------------------
    // Define valid fields for CustomerUpdateInput
    const customerFields = ["email", "firstName", "lastName", "phone"];
    const sanitizedCustomerData = Object.fromEntries(
      Object.entries(customerData)
        .filter(([key, value]) => customerFields.includes(key) && value)
        .map(([key, value]) => {
          if (key === "phone") {
            // Allow only digits and a leading "+" for phone numbers
            value = value.replace(/(?!^\+)[^\d]/g, "");

            // Add a default country code if missing
            if (!value.startsWith("+")) {
              value = "+1" + value; // Default to US country code
            }
          }
          return [key, value];
        })
    );

    // Update customer details if valid fields are provided
    if (Object.keys(sanitizedCustomerData).length > 0) {
      const customerUpdateMutation = `
        mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
          customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
            customer {
              email
              firstName
              lastName
              phone
            }
            customerUserErrors {
              field
              message
            }
          }
        }
      `;

      const response = await fetch(
        `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query: customerUpdateMutation,
            variables: {
              customerAccessToken: accessToken,
              customer: sanitizedCustomerData,
            },
          }),
        }
      );

      const result = await response.json();

      if (result.errors && result.errors.length > 0) {
        console.error("GraphQL Errors:", result.errors);
        throw new Error("GraphQL error occurred during customer update.");
      }

      if (result.data.customerUpdate.customerUserErrors.length > 0) {
        throw new Error(
          result.data.customerUpdate.customerUserErrors[0].message
        );
      }

      console.log(
        "Customer updated successfully:",
        result.data.customerUpdate.customer
      );
    }

    // ---------------------------------
    // 2) Set Default/Primary Address
    // ---------------------------------
    // If your front-end sends something like { primaryAddressId: '...' } in customerData
    if (customerData.primaryAddressId) {
      const customerDefaultAddressUpdateMutation = `
        mutation customerDefaultAddressUpdate(
          $customerAccessToken: String!,
          $addressId: ID!
        ) {
          customerDefaultAddressUpdate(
            customerAccessToken: $customerAccessToken,
            addressId: $addressId
          ) {
            customer {
              defaultAddress {
                id
                address1
              }
            }
            customerUserErrors {
              field
              message
            }
          }
        }
      `;

      const resp = await fetch(
        `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query: customerDefaultAddressUpdateMutation,
            variables: {
              customerAccessToken: accessToken,
              addressId: customerData.primaryAddressId,
            },
          }),
        }
      );
      const json = await resp.json();
      if (
        json.data.customerDefaultAddressUpdate.customerUserErrors.length > 0
      ) {
        throw new Error(
          json.data.customerDefaultAddressUpdate.customerUserErrors[0].message
        );
      }
      console.log(
        "Primary address set successfully:",
        json.data.customerDefaultAddressUpdate.customer?.defaultAddress
      );
    }

    // ---------------------------------
    // 3) Delete an Address
    // ---------------------------------
    // If your front-end sends something like { deleteAddressId: '...' } in customerData
    if (customerData.deleteAddressId) {
      const customerAddressDeleteMutation = `
        mutation customerAddressDelete(
          $customerAccessToken: String!,
          $id: ID!
        ) {
          customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
            deletedCustomerAddressId
            customerUserErrors {
              field
              message
            }
          }
        }
      `;

      const deleteResp = await fetch(
        `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query: customerAddressDeleteMutation,
            variables: {
              customerAccessToken: accessToken,
              id: customerData.deleteAddressId,
            },
          }),
        }
      );
      const deleteResult = await deleteResp.json();

      if (
        deleteResult.data.customerAddressDelete.customerUserErrors.length > 0
      ) {
        throw new Error(
          deleteResult.data.customerAddressDelete.customerUserErrors[0].message
        );
      }
      console.log(
        "Address deleted successfully:",
        deleteResult.data.customerAddressDelete.deletedCustomerAddressId
      );
    }

    // ---------------------------------
    // 4) Create or Update an Address
    // ---------------------------------
    // For creating/updating an address, your front-end might send something like:
    // {
    //   addressId: '...',
    //   address1: '123 Apple St',
    //   city: 'New York',
    //   zip: '10001',
    //   ...
    // }
    const addressData = {
      address1: customerData.address1,
      address2: customerData.address2,
      city: customerData.city,
      province: customerData.province,
      zip: customerData.zip,
      country: customerData.country || "US",
    };

    // If the user is providing at least address1 + (city OR zip), treat it as a valid address input
    const hasMinimalAddressInfo =
      customerData.address1 && (customerData.city || customerData.zip);

    if (hasMinimalAddressInfo) {
      if (customerData.addressId) {
        // --- Update existing address ---
        const customerAddressUpdateMutation = `
          mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
            customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
              customerAddress {
                id
                address1
                address2
                city
                province
                country
                zip
              }
              customerUserErrors {
                field
                message
              }
            }
          }
        `;

        const addressUpdateResponse = await fetch(
          `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token":
                SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            },
            body: JSON.stringify({
              query: customerAddressUpdateMutation,
              variables: {
                customerAccessToken: accessToken,
                id: customerData.addressId,
                address: addressData,
              },
            }),
          }
        );

        const addressUpdateResult = await addressUpdateResponse.json();

        if (
          addressUpdateResult.data.customerAddressUpdate.customerUserErrors
            .length > 0
        ) {
          throw new Error(
            addressUpdateResult.data.customerAddressUpdate.customerUserErrors[0].message
          );
        }

        console.log(
          "Customer address updated successfully:",
          addressUpdateResult.data.customerAddressUpdate.customerAddress
        );
      } else {
        // --- Create new address ---
        const customerAddressCreateMutation = `
          mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
            customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
              customerAddress {
                id
                address1
                address2
                city
                province
                country
                zip
              }
              customerUserErrors {
                field
                message
              }
            }
          }
        `;

        const addressCreateResponse = await fetch(
          `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token":
                SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            },
            body: JSON.stringify({
              query: customerAddressCreateMutation,
              variables: {
                customerAccessToken: accessToken,
                address: addressData,
              },
            }),
          }
        );

        const addressCreateResult = await addressCreateResponse.json();

        if (
          addressCreateResult.data.customerAddressCreate.customerUserErrors
            .length > 0
        ) {
          throw new Error(
            addressCreateResult.data.customerAddressCreate.customerUserErrors[0].message
          );
        }

        console.log(
          "Customer address created successfully:",
          addressCreateResult.data.customerAddressCreate.customerAddress
        );
      }
    }

    // If everything above succeeds:
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(
      "Error updating customer information:",
      error.message,
      customerData
    );
    res.status(500).json({
      error: error.message || "Failed to update customer information.",
    });
  }
}

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { accessToken, customerData } = req.body;

//   if (!accessToken) {
//     return res.status(400).json({ error: "Access token is required" });
//   }

//   if (!customerData || Object.keys(customerData).length === 0) {
//     return res.status(400).json({ error: "No data provided to update." });
//   }

//   const SHOPIFY_STORE_DOMAIN = process.env.REACT_APP_SHOPIFY_STORE_DOMAIN;
//   const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
//     process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

//   try {
//     // Define valid fields for CustomerUpdateInput
//     const customerFields = ["email", "firstName", "lastName", "phone"];
//     const sanitizedCustomerData = Object.fromEntries(
//       Object.entries(customerData)
//         .filter(([key, value]) => customerFields.includes(key) && value)
//         .map(([key, value]) => {
//           if (key === "phone") {
//             // Allow only digits and a leading "+" for phone numbers
//             value = value.replace(/(?!^\+)[^\d]/g, ""); // Remove all non-digits except leading "+"

//             // Add a default country code if missing
//             if (!value.startsWith("+")) {
//               value = "+1" + value; // Default to US country code
//             }
//           }
//           return [key, value];
//         })
//     );

//     // Update customer details if valid fields are provided
//     if (Object.keys(sanitizedCustomerData).length > 0) {
//       const customerUpdateMutation = `
//         mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
//           customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
//             customer {
//               email
//               firstName
//               lastName
//               phone
//             }
//             customerUserErrors {
//               field
//               message
//             }
//           }
//         }
//       `;

//       const response = await fetch(
//         `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "X-Shopify-Storefront-Access-Token":
//               SHOPIFY_STOREFRONT_ACCESS_TOKEN,
//           },
//           body: JSON.stringify({
//             query: customerUpdateMutation,
//             variables: {
//               customerAccessToken: accessToken,
//               customer: sanitizedCustomerData,
//             },
//           }),
//         }
//       );

//       const result = await response.json();

//       if (result.errors && result.errors.length > 0) {
//         console.error("GraphQL Errors:", result.errors);
//         throw new Error("GraphQL error occurred during customer update.");
//       }

//       if (result.data.customerUpdate.customerUserErrors.length > 0) {
//         throw new Error(
//           result.data.customerUpdate.customerUserErrors[0].message
//         );
//       }

//       console.log(
//         "Customer updated successfully:",
//         result.data.customerUpdate.customer
//       );
//     }

//     // Address update or creation
//     const addressData = {
//       address1: customerData.address1,
//       address2: customerData.address2,
//       city: customerData.city,
//       province: customerData.province,
//       zip: customerData.zip,
//       country: customerData.country || "US",
//     };

//     if (customerData.address1 && (customerData.city || customerData.zip)) {
//       if (customerData.addressId) {
//         // Update existing address
//         const customerAddressUpdateMutation = `
//           mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
//             customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
//               customerAddress {
//                 id
//                 address1
//                 address2
//                 city
//                 province
//                 country
//                 zip
//               }
//               customerUserErrors {
//                 field
//                 message
//               }
//             }
//           }
//         `;

//         const addressUpdateResponse = await fetch(
//           `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "X-Shopify-Storefront-Access-Token":
//                 SHOPIFY_STOREFRONT_ACCESS_TOKEN,
//             },
//             body: JSON.stringify({
//               query: customerAddressUpdateMutation,
//               variables: {
//                 customerAccessToken: accessToken,
//                 id: customerData.addressId,
//                 address: addressData,
//               },
//             }),
//           }
//         );

//         const addressUpdateResult = await addressUpdateResponse.json();

//         if (
//           addressUpdateResult.data.customerAddressUpdate.customerUserErrors
//             .length > 0
//         ) {
//           throw new Error(
//             addressUpdateResult.data.customerAddressUpdate.customerUserErrors[0].message
//           );
//         }

//         console.log(
//           "Customer address updated successfully:",
//           addressUpdateResult.data.customerAddressUpdate.customerAddress
//         );
//       } else {
//         // Create new address
//         const customerAddressCreateMutation = `
//           mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
//             customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
//               customerAddress {
//                 id
//                 address1
//                 address2
//                 city
//                 province
//                 country
//                 zip
//               }
//               customerUserErrors {
//                 field
//                 message
//               }
//             }
//           }
//         `;

//         const addressCreateResponse = await fetch(
//           `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "X-Shopify-Storefront-Access-Token":
//                 SHOPIFY_STOREFRONT_ACCESS_TOKEN,
//             },
//             body: JSON.stringify({
//               query: customerAddressCreateMutation,
//               variables: {
//                 customerAccessToken: accessToken,
//                 address: addressData,
//               },
//             }),
//           }
//         );

//         const addressCreateResult = await addressCreateResponse.json();

//         if (
//           addressCreateResult.data.customerAddressCreate.customerUserErrors
//             .length > 0
//         ) {
//           throw new Error(
//             addressCreateResult.data.customerAddressCreate.customerUserErrors[0].message
//           );
//         }

//         console.log(
//           "Customer address created successfully:",
//           addressCreateResult.data.customerAddressCreate.customerAddress
//         );
//       }
//     }

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error(
//       "Error updating customer information:",
//       error.message,
//       customerData
//     );
//     res.status(500).json({
//       error: error.message || "Failed to update customer information.",
//     });
//   }
// }
