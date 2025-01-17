export const fetchOrderDetails = async (orderId) => {
  try {
    const response = await fetch(
      `/api/customers/fetchOrderDetails?orderId=${encodeURIComponent(orderId)}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch order details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order details:", error.message);
    return null;
  }
};
