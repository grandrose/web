export const fetchOrderHistory = async (accessToken) => {
  try {
    const response = await fetch(
      `/api/customers/fetchOrderHistory?accessToken=${accessToken}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch order history");
    }

    const data = await response.json();
    console.log("DATA", data);
    return data.orders;
  } catch (error) {
    console.error("Error fetching order history:", error.message);
    throw error;
  }
};
