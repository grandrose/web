export const fetchCustomerDetails = async (accessToken) => {
  try {
    const response = await fetch(
      `/api/customers/fetchCustomerDetails?accessToken=${accessToken}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch customer details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customer details:", error.message);
    throw error;
  }
};
