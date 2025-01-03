import React, { useEffect, useState } from "react";
import { Button } from "../components/theme/Button";
import { useCustomer } from "../context/CustomerContext";

export const Profile = () => {
  const { fetchCustomerDetails, customer, logout } = useCustomer();
  const [customerData, setCustomerData] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Manage Subscription");
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address1: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    const getCustomerData = async () => {
      if (customer?.accessToken) {
        try {
          const data = await fetchCustomerDetails(customer.accessToken);
          setCustomerData(data);

          if (data) {
            setEditForm({
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              phone: data.phone || "",
              address1: data.addresses?.[0]?.address1 || "",
              city: data.addresses?.[0]?.city || "",
              country: data.addresses?.[0]?.country || "",
            });
          }
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      }
    };

    getCustomerData();
  }, [customer, fetchCustomerDetails]);

  if (!customerData) {
    return <div className="text-cream text-center py-12">Loading...</div>;
  }

  const { email, firstName, lastName } = customerData;

  const handleTabChange = (tab) => setSelectedTab(tab);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSave = async () => {
    const updatedData = {};

    for (const key in editForm) {
      if (editForm[key]?.trim() !== customerData[key]?.trim()) {
        updatedData[key] = editForm[key].trim();
      }
    }

    try {
      const response = await fetch("/api/customers/updateCustomer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: customer.accessToken,
          customerData: updatedData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update customer data.");
      }

      const updatedCustomer = await response.json();

      // Update only the customer data without resetting accessToken
      setCustomerData(updatedCustomer);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile.");
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "Manage Subscription":
        return (
          <div>
            <h2 className="font-bold mb-4">Manage Subscription</h2>
            <div className="flex space-x-4">
              <Button isSelected>4-PACK</Button>
              <Button>12-PACK</Button>
              <Button>24-PACK</Button>
              <Button>32-PACK</Button>
            </div>
          </div>
        );
      case "Order History":
        return <h2 className="font-bold">Order History</h2>;
      case "Account & Payment":
        return (
          <div>
            <h2 className="font-bold mb-4">Edit Account Information</h2>
            <form className="space-y-4">
              <div>
                <label className="block">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editForm.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded bg-cream text-charcoal"
                />
              </div>
              <div>
                <label className="block">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editForm.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded bg-cream text-charcoal"
                />
              </div>
              <div>
                <label className="block">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded bg-cream text-charcoal"
                />
              </div>
              <div>
                <label className="block">Address</label>
                <input
                  type="text"
                  name="address1"
                  value={editForm.address1}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded bg-cream text-charcoal"
                />
              </div>
              <div>
                <label className="block">City</label>
                <input
                  type="text"
                  name="city"
                  value={editForm.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded bg-cream text-charcoal"
                />
              </div>
              <div>
                <label className="block">Country</label>
                <input
                  type="text"
                  name="country"
                  value={editForm.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded bg-cream text-charcoal"
                />
              </div>
              <Button onClick={handleSave}>Save</Button>
            </form>
          </div>
        );
      case "Community":
        return <h2 className="font-bold">Community</h2>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-charcoal text-cream px-20">
      {/* Sidebar */}
      <aside className="w-1/4 p-6">
        <ul className="space-y-6 text-[25px] font-medium hover:cursor-pointer">
          {[
            "Manage Subscription",
            "Order History",
            "Account & Payment",
            "Community",
          ].map((tab) => (
            <li
              key={tab}
              className={selectedTab === tab ? "font-bold" : ""}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
        <Button className="mt-8" onClick={logout}>
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 text-[20px]">
        <div className="mb-8">
          <h1 className="font-bold">
            Welcome, {firstName || lastName || email}!
          </h1>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};
