export const fetchSubscriptions = async (accessToken) => {
  try {
    const response = await fetch(
      `/api/subscriptions/fetchSubscriptions?accessToken=${accessToken}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch subscriptions");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching subscriptions:", error.message);
  }
};
