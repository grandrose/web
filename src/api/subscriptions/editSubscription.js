export const editSubscription = async (
  accessToken,
  subscriptionId,
  updates
) => {
  try {
    const response = await fetch(`/api/subscriptions/editSubscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken, subscriptionId, updates }),
    });

    if (!response.ok) {
      throw new Error("Failed to edit subscription");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error editing subscription:", error.message);
  }
};
