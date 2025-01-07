import React, { useEffect, useState } from "react";
import { Account, OrderHistory, Subscriptions } from "./pages";
import { useCustomer } from "../../context/CustomerContext";
import { Button } from "../../components/theme";
import { useNavigate } from "react-router-dom";

export const Customer = () => {
  const navigate = useNavigate();
  const { fetchCustomerDetails, customer, logout } = useCustomer();
  const [selectedTab, setSelectedTab] = useState("Manage Subscription");
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const getCustomerData = async () => {
      if (customer?.accessToken) {
        try {
          const data = await fetchCustomerDetails(customer.accessToken);
          setCustomerData(data);
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      }
    };

    getCustomerData();
  }, [customer, fetchCustomerDetails]);

  const handleTabChange = (tab) => setSelectedTab(tab);

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "Account & Payment":
        return <Account customerData={customerData} />;
      case "Order History":
        return <OrderHistory />;
      case "Manage Subscription":
        return <Subscriptions />;
      case "Community":
        return (
          <div className="flex text-center justify-center align-center">
            Community content coming soon!
          </div>
        );
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div
      // Changed from `flex` to `flex-col md:flex-row` for mobile stacking
      className="flex flex-col md:flex-row min-h-screen bg-charcoal text-cream
                 px-6 md:px-[16.15vw] py-6 md:py-12 gap-8"
    >
      {/* Sidebar */}
      <aside
        // Full width on mobile, 1/3 on desktop
        className="w-full md:w-1/3"
      >
        <ul
          // Smaller text on mobile, bigger on desktop
          className="space-y-4 md:space-y-6 text-base md:text-[25px] font-medium hover:cursor-pointer"
        >
          {[
            "Manage Subscription",
            "Order History",
            "Account & Payment",
            "Community",
          ].map((tab) => (
            <li
              key={tab}
              className={`${selectedTab === tab ? "font-bold" : "text-cream"}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
        <Button
          className="mt-6 md:mt-8 px-4"
          onClick={handleLogout}
          variant="danger"
        >
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main
        // Slightly smaller base text on mobile
        className="flex-1 text-base md:text-[20px]"
      >
        {renderContent()}
      </main>
    </div>
  );
};
