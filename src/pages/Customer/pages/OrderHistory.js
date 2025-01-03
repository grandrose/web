import React, { useEffect, useState } from "react";
import { fetchOrderHistory } from "../../../api/";
import { useCustomer } from "../../../context/CustomerContext";
import { OrderItemCard as ItemCard, Loader } from "../../../components/theme";
import { formatPrice } from "../../../common";

export const OrderHistory = () => {
  const { customer } = useCustomer();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Slide-in panel states
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      if (!customer?.accessToken) {
        setError("Access token is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchOrderHistory(customer.accessToken);
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [customer]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  // Click a specific order => open panel
  const handleOpenPanel = (order) => {
    setSelectedOrder(order);
    setActiveSection(null);
  };

  // Close the panel
  const handleClosePanel = () => {
    setSelectedOrder(null);
    setActiveSection(null);
  };

  // Toggle collapsible sections in panel
  const handleToggleSection = (sectionName) => {
    setActiveSection((prev) => (prev === sectionName ? null : sectionName));
  };

  return (
    <div className="min-h-screen text-cream p-6 bg-charcoal">
      {orders.length === 0 ? (
        <p>You have no order history.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            console.log("order", order);
            const status = order.fulfillmentStatus || "FULFILLED";
            const itemCount = order.lineItems.edges.length;
            const dateStr = new Date(order.processedAt).toLocaleDateString();
            const totalStr = `(Total: ${formatPrice(
              order.totalPriceV2.amount,
              order.totalPriceV2.currencyCode
            )})`;

            return (
              <div
                key={order.id}
                className="bg-cream text-charcoal rounded-lg shadow-md p-4 hover:cursor-pointer flex gap-4 items-center max-w-[800px] mx-auto text-[20px]"
                onClick={() => handleOpenPanel(order)}
              >
                {/* Left: Image */}
                <div className="w-[75px] h-[75px] bg-gray-800 rounded-xl flex items-center justify-center">
                  {order.lineItems.edges[0]?.node.variant?.image?.src ? (
                    <img
                      src={order.lineItems.edges[0]?.node.variant?.image?.src}
                      alt={order.lineItems.edges[0]?.node.title}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-sm">No Image</span>
                  )}
                </div>

                {/* Right: Order Details */}
                <div className="grid grid-cols-3 gap-4 w-full">
                  {/* First Row */}
                  <div className="font-bold">Order {order.name}</div>
                  <div className="text-center">
                    {itemCount} Item{itemCount > 1 ? "s" : ""}
                  </div>
                  <div className="text-right">{dateStr}</div>
                  {/* Second Row */}
                  <div>{totalStr}</div>
                  <div
                    className={`text-center font-bold ${
                      status === "FULFILLED" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    STATUS: {status}
                  </div>
                  <div></div> {/* Empty Cell */}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Overlay + Slide-in Side Panel */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex">
          {/* The semi-transparent overlay, clicking it closes the panel */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClosePanel}
          />

          {/* The panel itself, anchored to the right */}
          <div
            className={`
              ml-auto relative w-full sm:w-[400px] md:w-[480px] h-full bg-[#222] text-cream
              shadow-lg transform transition-transform duration-300
              ${selectedOrder ? "translate-x-0" : "translate-x-full"}
            `}
            // Stopping clicks from bubbling up to the overlay
            onClick={(e) => e.stopPropagation()}
          >
            {/* Panel Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-600">
              <h2 className="text-xl font-bold">
                Order #{selectedOrder.name} –{" "}
                {new Date(selectedOrder.processedAt).toLocaleString()}
              </h2>
              <button
                onClick={handleClosePanel}
                className="text-2xl font-bold px-2"
              >
                &times;
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
              <p className="text-sm uppercase text-green-400 mb-4">
                {selectedOrder.fulfillmentStatus || "FULFILLED"}
              </p>

              <CollapsibleSection
                title="Shipping Option"
                isOpen={activeSection === "shippingOption"}
                onToggle={() => handleToggleSection("shippingOption")}
              >
                <p className="text-sm">
                  {selectedOrder.shippingOption || "Standard Shipping"}
                </p>
              </CollapsibleSection>

              <CollapsibleSection
                title="Shipping Address"
                isOpen={activeSection === "shippingAddress"}
                onToggle={() => handleToggleSection("shippingAddress")}
              >
                <div className="text-sm space-y-1">
                  <p>{selectedOrder.shippingAddress?.name}</p>
                  <p>{selectedOrder.shippingAddress?.address1}</p>
                  <p>
                    {selectedOrder.shippingAddress?.city},{" "}
                    {selectedOrder.shippingAddress?.province}{" "}
                    {selectedOrder.shippingAddress?.zip}
                  </p>
                  <p>{selectedOrder.shippingAddress?.country}</p>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Summary"
                isOpen={activeSection === "summary"}
                onToggle={() => handleToggleSection("summary")}
              >
                <div className="space-y-4">
                  {selectedOrder.lineItems.edges.map(({ node }) => (
                    <ItemCard
                      key={node.id}
                      id={node.id}
                      title={node.title}
                      subtitle=""
                      price={node.variant?.price?.amount}
                      quantity={node.quantity}
                      variant={node.variant}
                      imageUrl={node.variant?.image?.src}
                    />
                  ))}

                  <div className="mt-4 border-t border-gray-600 pt-2">
                    <p className="text-sm">
                      Order total: {selectedOrder.totalPriceV2.amount}{" "}
                      {selectedOrder.totalPriceV2.currencyCode}
                    </p>
                    <p className="text-sm">
                      Shipping: {selectedOrder.shippingPrice?.amount || "0.00"}{" "}
                      {selectedOrder.shippingPrice?.currencyCode || ""}
                    </p>
                    <p className="text-sm">
                      Sales tax: {selectedOrder.totalTax?.amount || "0.00"}{" "}
                      {selectedOrder.totalTax?.currencyCode || ""}
                    </p>
                    <p className="font-bold text-md mt-2">
                      Order total: {selectedOrder.totalPriceV2.amount}{" "}
                      {selectedOrder.totalPriceV2.currencyCode}
                    </p>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Billing Address"
                isOpen={activeSection === "billingAddress"}
                onToggle={() => handleToggleSection("billingAddress")}
              >
                <div className="text-sm space-y-1">
                  <p>{selectedOrder.billingAddress?.name}</p>
                  <p>{selectedOrder.billingAddress?.address1}</p>
                  <p>
                    {selectedOrder.billingAddress?.city},{" "}
                    {selectedOrder.billingAddress?.province}{" "}
                    {selectedOrder.billingAddress?.zip}
                  </p>
                  <p>{selectedOrder.billingAddress?.country}</p>
                </div>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Collapsible sections in side panel
const CollapsibleSection = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-gray-600 mb-4">
      <button
        className="w-full flex items-center justify-between py-3 text-left focus:outline-none"
        onClick={onToggle}
      >
        <span className="font-semibold text-md">{title}</span>

        {/* SVG Arrow Container */}
        <div
          aria-hidden="true"
          className="w-3.5 h-3.5 relative flex items-center justify-center"
        >
          <span
            className={`
              block w-[8px] h-[14px] transform transition duration-200
              ${isOpen ? "rotate-[270deg]" : "rotate-90"}
            `}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              data-name="Group 490"
              width="100%"
              height="100%"
              viewBox="0 0 8 14"
            >
              <defs>
                <clipPath id="dpuo5a2tba">
                  <path data-name="Rectangle 50" d="M0 0h8v14H0z" />
                </clipPath>
              </defs>
              <path
                fill="currentColor"
                data-name="Path 23"
                d="M1.351 14 0 12.658 5.693 7 0 1.342 1.351 0 7.72 6.329a.945.945 0 0 1 0 1.342z"
                style={{ clipPath: "url(#dpuo5a2tba)" }}
              />
            </svg>
          </span>
        </div>
      </button>

      {isOpen && <div className="pl-2 pb-4 text-gray-200">{children}</div>}
    </div>
  );
};
