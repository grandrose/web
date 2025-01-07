export const updateCustomerDetails = async (accessToken, customerData) => {
  const response = await fetch("/api/customers/updateCustomer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ accessToken, customerData }),
  });

  if (!response.ok) {
    throw new Error("Failed to update customer details.");
  }

  return await response.json();
};
