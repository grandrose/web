export const fetchStorePolicies = async () => {
  try {
    const response = await fetch(`/api/fetchStorePolicies`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch policies");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching policies:", error.message);
  }
};
