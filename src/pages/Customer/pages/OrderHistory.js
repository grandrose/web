import React, { useEffect, useState, useRef } from "react";
import { fetchOrderHistory } from "../../../api/";
import { useCustomer } from "../../../context/CustomerContext";
import { Loader } from "../../../components/theme";
import { formatPrice } from "../../../common";
import { IoClose } from "react-icons/io5";
import LogoIcon from "../../../assets/icons/GR-logo-garnet.png";

export const OrderHistory = () => {
  const { customer } = useCustomer();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const orderRef = useRef(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenPanel = (order) => {
    setSelectedOrder(order);
  };

  const handleClosePanel = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        selectedOrder &&
        orderRef.current &&
        !orderRef.current.contains(event.target)
      ) {
        handleClosePanel();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectedOrder, handleClosePanel]);

  // Fetch & sort from newest to oldest
  useEffect(() => {
    const loadOrders = async () => {
      if (!customer?.accessToken) {
        setError("Access token is missing.");
        setLoading(false);
        return;
      }
      try {
        const data = await fetchOrderHistory(customer.accessToken);
        data.sort((a, b) => new Date(b.processedAt) - new Date(a.processedAt));
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

  return (
    // More flexible container, so it’s not forced to a large min-height on mobile
    <div className="min-h-screen text-cream p-4 md:p-6 bg-charcoal">
      {orders.length === 0 ? (
        <p>You have no order history.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
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
                onClick={() => handleOpenPanel(order)}
                className="bg-cream text-charcoal rounded-lg shadow-md p-4
                           hover:cursor-pointer flex gap-4 items-center
                           max-w-[800px] mx-auto text-base md:text-[20px]"
              >
                {/* Thumbnail */}
                <div
                  className="w-[75px] h-[75px] rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}
                >
                  {order.lineItems.edges[0]?.node.variant?.image?.src ? (
                    <FallbackImage
                      src={order.lineItems.edges[0].node.variant.image.src}
                      alt={order.lineItems.edges[0].node.title}
                      fallback={<span className="text-sm">Loading...</span>}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-sm">No Image</span>
                  )}
                </div>

                {/* Order info */}
                <div className="grid grid-cols-3 gap-2 md:gap-4 w-full">
                  <div className="font-bold">Order {order.name}</div>
                  <div className="text-center">
                    {itemCount} Item{itemCount > 1 ? "s" : ""}
                  </div>
                  <div className="text-right">{dateStr}</div>

                  <div>{totalStr}</div>
                  <div
                    className={`text-center font-bold ${
                      status === "FULFILLED" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    STATUS: {status}
                  </div>
                  <div></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          {/*
      Outer container:
      - By default (mobile), items are aligned to the bottom (items-end).
      - On md+ screens, we center vertically (items-center).
      - We also center horizontally with justify-center.
    */}
          <div className="w-full h-full flex items-end md:items-center justify-center">
            <div
              ref={orderRef}
              onClick={(e) => e.stopPropagation()}
              className={`
                relative w-full max-w-6xl bg-cream text-charcoal
                overflow-auto

                /*
                  Bottom sheet on mobile:
                  - absolute bottom-0 left-0 right-0
                  - rounded top corners only
                  - fixed height (80vh) with vertical scroll
                */
                absolute bottom-0 left-0 right-0
                rounded-t-2xl
                h-[80vh]
                p-6

                /*
                  Desktop (md+):
                  - remove absolute positioning (use static)
                  - full rounding
                  - center with a transform shift (since parent is flex items-center)
                */
                md:static
                md:rounded-lg
                md:h-auto
                md:transform md:-translate-y-2
                md:top-1/2
                md:p-8

                /*
                  Maintain your grid layout for large screens
                  1 column on mobile, 3 columns on desktop
                */
                grid grid-cols-1 md:grid-cols-[250px_auto_250px] gap-8
                min-h-[400px]
              `}
            >
              {/*
                CLOSE BUTTON
                - Absolutely positioned at top-right corner
                - Works for both mobile and desktop
              */}
              <button
                onClick={handleClosePanel}
                className="absolute top-4 right-4 text-charcoal"
              >
                <IoClose size={24} />
              </button>

              {/* LEFT COLUMN */}
              <div className="flex flex-col space-y-6">
                {/* Order # and Date */}
                <div>
                  <h2 className="text-xl font-bold">
                    Order {selectedOrder.name}
                  </h2>
                  <p className="text-sm">
                    Date:{" "}
                    {new Date(selectedOrder.processedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Shipping */}
                {/* TODO */}
                <div>
                  <h3 className="font-semibold">Shipping</h3>
                  <p className="text-sm">
                    {selectedOrder.shippingOption ||
                      "Expedited Domestic ($2.99)"}
                  </p>
                </div>

                {/* Address */}
                <div>
                  <h3 className="font-semibold">Address</h3>
                  {selectedOrder.shippingAddress ? (
                    <div className="text-sm leading-5">
                      <p>{selectedOrder.shippingAddress.name}</p>
                      <p>{selectedOrder.shippingAddress.address1}</p>
                      <p>
                        {selectedOrder.shippingAddress.city},{" "}
                        {selectedOrder.shippingAddress.province}{" "}
                        {selectedOrder.shippingAddress.zip}
                      </p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                    </div>
                  ) : (
                    <p className="text-sm">No address provided.</p>
                  )}
                </div>

                {/* Payment (placeholder) */}
                <div>
                  <h3 className="font-semibold">Payment</h3>
                  <p className="text-sm">Coming</p>
                  <p className="text-sm">Soon</p>
                </div>
              </div>

              {/* CENTER COLUMN */}
              <div className="flex flex-col items-center mt-8 md:mt-0">
                {/* Logo icon, 25x25, centered */}
                <div className="mb-2">
                  <img
                    src={LogoIcon}
                    alt="Grand Rose Icon"
                    className="w-[25px] h-[25px] mx-auto"
                  />
                </div>

                {/* Item count text */}
                <div className="mb-4 text-center text-sm font-semibold">
                  ({selectedOrder.lineItems.edges.length}{" "}
                  {selectedOrder.lineItems.edges.length === 1
                    ? "Item"
                    : "Items"}
                  )
                </div>

                {/* Items list */}
                <div className="w-full flex flex-col gap-4">
                  {selectedOrder.lineItems.edges.map(({ node }) => (
                    <OrderHistoryCard
                      key={node.id}
                      title={node.title}
                      subtitle="grand rose"
                      price={formatPrice(
                        node.variant.price.amount,
                        node.variant.price.currencyCode
                      )}
                      quantity={node.quantity}
                      variant={node.variant}
                      imageUrl={node.variant?.image?.src}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col justify-between mt-8 md:mt-0">
                {/* Status */}
                <div className="mt-2 text-right">
                  <p className="uppercase font-bold text-red-600">
                    Status: {selectedOrder.fulfillmentStatus || "IN PROGRESS"}
                  </p>
                </div>

                {/* Pricing (original vs discounted) */}
                <PricingSection selectedOrder={selectedOrder} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * ============================================
 * OrderHistoryCard
 * ============================================
 */
const OrderHistoryCard = ({
  title,
  subtitle,
  price,
  quantity,
  variant,
  imageUrl,
}) => {
  let packNumber = 1;
  if (variant?.title) {
    const match = variant.title.match(/\d+/);
    if (match) {
      packNumber = parseInt(match[0], 10);
    }
  }

  return (
    <div
      className="w-full rounded-[10px] bg-cream flex p-5 min-h-[160px]
                 flex-col md:flex-row gap-4 md:gap-6"
    >
      {/* Image */}
      <div
        className="w-[120px] h-[120px] rounded flex items-center justify-center
                   flex-shrink-0 mx-auto md:mx-0"
        style={{ backgroundColor: "rgba(217, 217, 217, 1)" }}
      >
        {imageUrl ? (
          <FallbackImage
            src={imageUrl}
            alt={title}
            fallback={
              <div className="text-rose text-sm font-medium">Loading...</div>
            }
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="text-rose text-sm font-medium">No Image</div>
        )}
      </div>

      {/* Text block */}
      <div className="flex-1 flex flex-col justify-between gap-2 md:gap-6">
        <div>
          <h2 className="text-charcoal text-base">
            {title} {subtitle && `| ${subtitle}`}
          </h2>
        </div>
        <div className="text-charcoal text-base">{price}</div>
      </div>

      {/* Right side: pack info + quantity */}
      <div className="flex flex-col justify-between items-end gap-2">
        <p className="text-charcoal text-base">{packNumber}/PK</p>
        <div
          className="w-[100px] h-[35px] border border-black
                     rounded-full flex items-center justify-center
                     text-sm font-semibold text-charcoal"
        >
          {quantity}
        </div>
      </div>
    </div>
  );
};

/**
 * ============================================
 * FallbackImage
 * ============================================
 */
const FallbackImage = ({ src, alt, fallback, className = "" }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);

  return (
    <>
      {!loaded && !errored && (fallback || null)}
      <img
        src={src}
        alt={alt}
        className={`${className} ${!loaded || errored ? "hidden" : "block"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
      />
    </>
  );
};

/**
 * ============================================
 * PricingSection
 * ============================================
 */
const PricingSection = ({ selectedOrder }) => {
  if (!selectedOrder) return null;

  const originalPrice = selectedOrder.lineItems.edges.reduce(
    (acc, itemEdge) => {
      const itemPrice = parseFloat(itemEdge.node.variant.price.amount) || 0;
      const itemQty = itemEdge.node.quantity || 1;
      return acc + itemPrice * itemQty;
    },
    0
  );

  const discountedPrice = parseFloat(selectedOrder.totalPriceV2.amount) || 0;
  const currencyCode = selectedOrder.totalPriceV2.currencyCode;

  const hasDiscount =
    selectedOrder.discountApplications?.edges?.length > 0 || false;
  const discountAppEdge =
    selectedOrder.discountApplications?.edges?.[0] || null;
  const discountCode = discountAppEdge?.node?.code || null;

  return (
    <div className="mt-auto text-right text-md">
      <div className="flex flex-col items-end space-y-2">
        <p className="font-bold text-lg">Total</p>
        {hasDiscount && originalPrice > discountedPrice ? (
          <div className="flex items-center space-x-2">
            <span className="line-through text-gray-600 text-base">
              {formatPrice(originalPrice, currencyCode)}
            </span>
            <span className="text-xl font-semibold">
              {formatPrice(discountedPrice, currencyCode)}
            </span>
          </div>
        ) : (
          <span className="text-xl font-semibold">
            {formatPrice(discountedPrice, currencyCode)}
          </span>
        )}

        {discountCode && (
          <p className="text-sm font-normal">
            Discount Applied:{" "}
            <span className="font-medium">{discountCode}</span>
          </p>
        )}
      </div>
    </div>
  );
};
