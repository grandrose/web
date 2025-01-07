export const cancelSubscription = async (accessToken, subscriptionId) => {
  try {
    const response = await fetch(`/api/subscriptions/cancelSubscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken, subscriptionId }),
    });

    if (!response.ok) {
      throw new Error("Failed to cancel subscription");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error canceling subscription:", error.message);
  }
};
