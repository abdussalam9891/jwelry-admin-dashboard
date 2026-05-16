import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { ArrowLeft, CreditCard, Package, Truck, User } from "lucide-react";

import { getOrderDetails, updateOrderStatus } from "../services/orderService";

export default function OrderDetailsPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState(null);

  console.log(order);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderDetails(id);

        setOrder(data.order);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div
        className="
          p-10
          text-sm
        "
      >
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div
        className="
          p-10
          text-sm
        "
      >
        Order not found
      </div>
    );
  }

  return (
    <div
      className="
        space-y-8
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          flex-wrap
        "
      >
        <div>
          <Link
            to="/admin/orders"
            className="
              group
              inline-flex
              items-center
              gap-2

              rounded-2xl

              border
              border-border

              bg-surface

              px-4
              py-2.5

              text-sm
              font-medium

              text-text-secondary

              shadow-sm

              transition-all

              hover:border-[#6B1A2A]/20
              hover:text-brand
            "
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>

          <h1
            className="
              mt-5

              text-4xl
              font-bold

              tracking-tight

              text-text-primary
            "
          >
            Order Details
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-text-secondary
            "
          >
            Order ID:{" "}
            {order.orderNumber || `#${order._id?.slice(-8)?.toUpperCase()}`}
          </p>
        </div>

        <div
          className="
    flex
    items-center
    gap-3
  "
        >
          {/* LABEL */}

          <div
            className="
      hidden
      sm:block
    "
          >
            <p
              className="
        text-[11px]
        font-medium
        uppercase
        tracking-[0.14em]

        text-text-secondary
      "
            >
              Order Status
            </p>

            <p
              className="
        mt-1

        text-sm

        text-text-primary
      "
            >
              Manage status workflow
            </p>
          </div>

          {/* SELECT WRAPPER */}

          <div
            className="
      relative
    "
          >
            <select
              value={order.orderStatus}
              onChange={async (e) => {
                const newStatus = e.target.value;

                await updateOrderStatus(order._id, newStatus);

                setOrder((prev) => ({
                  ...prev,
                  orderStatus: newStatus,
                }));
              }}
              className={`
        appearance-none

        rounded-2xl

        border

        px-5
        py-3
        pr-12

        text-sm
        font-semibold

        shadow-sm

        outline-none

        transition-all

        hover:shadow-md

        focus:ring-2
        focus:ring-brand/20

        ${
          order.orderStatus === "DELIVERED"
            ? "border-[#CFEAD9] bg-[#EEF8F1] text-[#0F9F61]"
            : order.orderStatus === "CANCELLED"
              ? "border-[#FFD5DC] bg-[#FFF1F2] text-[#E11D48]"
              : order.orderStatus === "SHIPPED"
                ? "border-[#D6E4FF] bg-[#EEF4FF] text-[#2563EB]"
                : order.orderStatus === "CONFIRMED"
                  ? "border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED]"
                  : "border-[#FDE7C3] bg-[#FFF5E8] text-[#D97706]"
        }
      `}
            >
              <option value="PLACED">PLACED</option>

              <option value="CONFIRMED">CONFIRMED</option>

              <option value="SHIPPED">SHIPPED</option>

              <option value="DELIVERED">DELIVERED</option>

              <option value="CANCELLED">CANCELLED</option>
            </select>

            {/* CHEVRON */}

            <div
              className="
        pointer-events-none

        absolute
        right-4
        top-1/2

        -translate-y-1/2

        text-current
        opacity-70
      "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="
          h-4
          w-4
        "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}

      <div
        className="
          grid
          grid-cols-1
          gap-6

          xl:grid-cols-3
        "
      >
        {/* LEFT */}

        <div
          className="
            space-y-6

            xl:col-span-2
          "
        >
          {/* ORDER ITEMS */}

          <div
            className="
    rounded-3xl

    border
    border-border

    bg-surface

    p-6
  "
          >
            {/* HEADER */}

            <div
              className="
      mb-6

      flex
      items-center
      justify-between
      gap-4
      flex-wrap
    "
            >
              <div
                className="
        flex
        items-center
        gap-3
      "
              >
                <div
                  className="
          flex
          h-10
          w-10

          items-center
          justify-center

          rounded-2xl

          bg-surface-secondary

          text-brand
        "
                >
                  <Package size={18} />
                </div>

                <div>
                  <h2
                    className="
            text-lg
            font-semibold

            text-text-primary
          "
                  >
                    Order Items
                  </h2>

                  <p
                    className="
            text-sm
            text-text-secondary
          "
                  >
                    Products included in this order
                  </p>
                </div>
              </div>

              <div
                className="
        rounded-2xl

        bg-brand/10

        px-3
        py-2

        text-xs
        font-semibold

        text-brand
      "
              >
                {order.items?.length} item
                {order.items?.length > 1 ? "s" : ""}
              </div>
            </div>

            {/* ITEMS */}

            <div
              className="
      space-y-4
    "
            >
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="
              flex
              gap-4

              rounded-3xl

              border
              border-border

              bg-surface-secondary

              p-4
            "
                >
                  {/* IMAGE */}

                  <div
                    className="
                shrink-0
              "
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                  h-24
                  w-24

                  rounded-2xl

                  object-cover
                "
                    />
                  </div>

                  {/* CONTENT */}

                  <div
                    className="
                flex-1
                min-w-0
              "
                  >
                    {/* TOP */}

                    <div
                      className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
                    >
                      {/* LEFT */}

                      <div
                        className="
                    min-w-0
                  "
                      >
                        {/* NAME */}

                        <h3
                          className="
                      truncate

                      text-sm
                      font-semibold

                      text-text-primary
                    "
                        >
                          {item.name}
                        </h3>

                        {/* SKU */}

                        {item.variant?.sku && (
                          <p
                            className="
                          mt-1

                          text-xs

                          text-text-secondary
                        "
                          >
                            SKU:{" "}
                            <span
                              className="
                            font-medium

                            text-text-primary
                          "
                            >
                              {item.variant.sku}
                            </span>
                          </p>
                        )}
                      </div>

                      {/* PRICE */}

                      <div
                        className="
                    shrink-0
                    text-right
                  "
                      >
                        <p
                          className="
                      text-base
                      font-bold

                      text-text-primary
                    "
                        >
                          ₹{item.price?.toLocaleString()}
                        </p>

                        <p
                          className="
                      mt-1

                      text-xs

                      text-text-secondary
                    "
                        >
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    {/* VARIANTS */}

                    {(item.variant?.size || item.variant?.material) && (
                      <div
                        className="
                      mt-4

                      flex
                      flex-wrap
                      gap-2
                    "
                      >
                        {/* SIZE */}

                        {item.variant?.size && (
                          <div
                            className="
                            rounded-full

                            border
                            border-border

                            bg-surface

                            px-3
                            py-1.5

                            text-xs
                            font-medium

                            text-text-primary
                          "
                          >
                            Size: {item.variant.size}
                          </div>
                        )}

                        {/* MATERIAL */}

                        {item.variant?.material && (
                          <div
                            className="
                            rounded-full

                            border
                            border-border

                            bg-surface

                            px-3
                            py-1.5

                            text-xs
                            font-medium

                            text-text-primary
                          "
                          >
                            {item.variant.material}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SHIPPING */}

          <div
            className="
    rounded-3xl

    border
    border-border

    bg-surface

    p-6
  "
          >
            {/* HEADER */}

            <div
              className="
      mb-6

      flex
      items-center
      gap-3
    "
            >
              <div
                className="
        flex
        h-10
        w-10

        items-center
        justify-center

        rounded-2xl

        bg-surface-secondary

        text-brand
      "
              >
                <Truck size={18} />
              </div>

              <div>
                <h2
                  className="
          text-lg
          font-semibold

          text-text-primary
        "
                >
                  Shipping Address
                </h2>

                <p
                  className="
          text-sm
          text-text-secondary
        "
                >
                  Delivery information
                </p>
              </div>
            </div>

            {/* CONTENT */}

            <div
              className="
      space-y-4
    "
            >
              {/* RECIPIENT */}

              <div
                className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        px-4
        py-3
      "
              >
                <p
                  className="
          mb-1

          text-[11px]
          font-medium
          uppercase
          tracking-wide

          text-text-secondary
        "
                >
                  Recipient
                </p>

                <p
                  className="
          font-medium
          text-text-primary
        "
                >
                  {order.shippingAddress?.fullName}
                </p>
              </div>

              {/* PHONE */}

              <div
                className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        px-4
        py-3
      "
              >
                <p
                  className="
          mb-1

          text-[11px]
          font-medium
          uppercase
          tracking-wide

          text-text-secondary
        "
                >
                  Contact Number
                </p>

                <p
                  className="
          font-medium
          text-text-primary
        "
                >
                  {order.shippingAddress?.phone}
                </p>
              </div>

              {/* ADDRESS */}

              <div
                className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        px-4
        py-3
      "
              >
                <p
                  className="
          mb-2

          text-[11px]
          font-medium
          uppercase
          tracking-wide

          text-text-secondary
        "
                >
                  Address
                </p>

                <div
                  className="
          space-y-1

          text-sm
          leading-relaxed

          text-text-primary
        "
                >
                  <p>{order.shippingAddress?.addressLine1}</p>

                  {order.shippingAddress?.addressLine2 && (
                    <p>{order.shippingAddress?.addressLine2}</p>
                  )}

                  <p>
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state}
                  </p>

                  <p>PIN: {order.shippingAddress?.pincode}</p>

                  {order.shippingAddress?.landmark && (
                    <p
                      className="
                text-text-secondary
              "
                    >
                      Landmark: {order.shippingAddress?.landmark}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ORDER TIMELINE */}

          <div
            className="
    rounded-3xl

    border
    border-border

    bg-surface

    p-6
  "
          >
            {/* HEADER */}

            <div
              className="
      mb-8

      flex
      items-center
      gap-3
    "
            >
              <div
                className="
        flex
        h-10
        w-10

        items-center
        justify-center

        rounded-2xl

        bg-surface-secondary

        text-brand
      "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="
          h-5
          w-5
        "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2"
                  />
                </svg>
              </div>

              <div>
                <h2
                  className="
          text-lg
          font-semibold

          text-text-primary
        "
                >
                  Order Timeline
                </h2>

                <p
                  className="
          text-sm
          text-text-secondary
        "
                >
                  Track order lifecycle & activity
                </p>
              </div>
            </div>

            {/* TIMELINE */}

            <div
              className="
      relative

      space-y-8
    "
            >
              {order.statusHistory?.map((event, index) => {
                const isLast = index === order.statusHistory.length - 1;

                return (
                  <div
                    key={index}
                    className="
                relative

                flex
                gap-4
              "
                  >
                    {/* LEFT SIDE */}

                    <div
                      className="
                  relative

                  flex
                  flex-col
                  items-center
                "
                    >
                      {/* DOT */}

                      <div
                        className={`
                    z-10

                    h-4
                    w-4

                    rounded-full

                    ring-4
                    ring-surface

                    ${
                      event.status === "DELIVERED"
                        ? "bg-[#0F9F61]"
                        : event.status === "CANCELLED"
                          ? "bg-[#E11D48]"
                          : event.status === "SHIPPED"
                            ? "bg-[#2563EB]"
                            : event.status === "CONFIRMED"
                              ? "bg-[#7C3AED]"
                              : "bg-[#D97706]"
                    }
                  `}
                      />

                      {/* LINE */}

                      {!isLast && (
                        <div
                          className="
                        mt-1

                        h-full
                        w-[2px]

                        bg-border
                      "
                        />
                      )}
                    </div>

                    {/* CONTENT */}

                    <div
                      className="
                  flex-1

                  rounded-2xl

                  border
                  border-border

                  bg-surface-secondary

                  px-4
                  py-4
                "
                    >
                      {/* TOP */}

                      <div
                        className="
                    flex
                    items-start
                    justify-between
                    gap-4
                    flex-wrap
                  "
                      >
                        <div>
                          <p
                            className="
                        text-sm
                        font-semibold

                        text-text-primary
                      "
                          >
                            {event.status}
                          </p>

                          <p
                            className="
                        mt-1

                        text-xs

                        text-text-secondary
                      "
                          >
                            Status updated
                          </p>
                        </div>

                        <div
                          className="
                      text-right
                    "
                        >
                          <p
                            className="
                        text-sm
                        font-medium

                        text-text-primary
                      "
                          >
                            {new Date(event.changedAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>

                          <p
                            className="
                        mt-1

                        text-xs

                        text-text-secondary
                      "
                          >
                            {new Date(event.changedAt).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="
            space-y-6
          "
        >
          {/* CUSTOMER */}

          <div
            className="
    rounded-3xl

    border
    border-border

    bg-surface

    p-6
  "
          >
            {/* HEADER */}

            <div
              className="
      mb-6

      flex
      items-center
      gap-3
    "
            >
              <div
                className="
        flex
        h-10
        w-10

        items-center
        justify-center

        rounded-2xl

        bg-surface-secondary

        text-brand
      "
              >
                <User size={18} />
              </div>

              <div>
                <h2
                  className="
          text-lg
          font-semibold

          text-text-primary
        "
                >
                  Customer
                </h2>

                <p
                  className="
          text-sm
          text-text-secondary
        "
                >
                  Customer information
                </p>
              </div>
            </div>

            {/* INFO */}

            <div
              className="
      space-y-4
    "
            >
              {/* NAME */}

              <div
                className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        px-4
        py-3
      "
              >
                <p
                  className="
          mb-1

          text-[11px]
          font-medium
          uppercase
          tracking-wide

          text-text-secondary
        "
                >
                  Full Name
                </p>

                <p
                  className="
          font-medium
          text-text-primary
        "
                >
                  {order.customerName}
                </p>
              </div>

              {/* EMAIL */}

              <div
                className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        px-4
        py-3
      "
              >
                <p
                  className="
          mb-1

          text-[11px]
          font-medium
          uppercase
          tracking-wide

          text-text-secondary
        "
                >
                  Email Address
                </p>

                <p
                  className="
          break-all

          font-medium

          text-brand
        "
                >
                  {order.customerEmail}
                </p>
              </div>

              {/* PHONE */}

              <div
                className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        px-4
        py-3
      "
              >
                <p
                  className="
          mb-1

          text-[11px]
          font-medium
          uppercase
          tracking-wide

          text-text-secondary
        "
                >
                  Phone Number
                </p>

                <p
                  className="
          font-medium
          text-text-primary
        "
                >
                  {order.customerPhone}
                </p>
              </div>
            </div>
          </div>

          {/* PAYMENT */}

          <div
            className="
    rounded-3xl

    border
    border-border

    bg-surface

    p-6
  "
          >
            {/* HEADER */}

            <div
              className="
      mb-6

      flex
      items-center
      gap-3
    "
            >
              <div
                className="
        flex
        h-10
        w-10

        items-center
        justify-center

        rounded-2xl

        bg-surface-secondary

        text-brand
      "
              >
                <CreditCard size={18} />
              </div>

              <div>
                <h2
                  className="
          text-lg
          font-semibold

          text-text-primary
        "
                >
                  Payment
                </h2>

                <p
                  className="
          text-sm
          text-text-secondary
        "
                >
                  Payment summary & pricing details
                </p>
              </div>
            </div>

            {/* CONTENT */}

            <div
              className="
      space-y-4
    "
            >
              {/* PAYMENT METHOD */}

              <div
                className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        px-4
        py-3
      "
              >
                <p
                  className="
          mb-1

          text-[11px]
          font-medium
          uppercase
          tracking-wide

          text-text-secondary
        "
                >
                  Payment Method
                </p>

                <p
                  className="
          font-medium
          text-text-primary
        "
                >
                  {order.paymentMethod}
                </p>
              </div>

              {/* PAYMENT STATUS */}

              <div
                className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        px-4
        py-3
      "
              >
                <p
                  className="
          mb-2

          text-[11px]
          font-medium
          uppercase
          tracking-wide

          text-text-secondary
        "
                >
                  Payment Status
                </p>

                <span
                  className={`
          inline-flex
          items-center

          rounded-full

          px-3
          py-1.5

          text-xs
          font-semibold

          ${
            order.paymentStatus === "PAID"
              ? "bg-[#EEF8F1] text-[#0F9F61]"
              : order.paymentStatus === "FAILED"
                ? "bg-[#FFF1F2] text-[#E11D48]"
                : order.paymentStatus === "REFUNDED"
                  ? "bg-[#F3F4F6] text-[#6B7280]"
                  : "bg-[#FFF5E8] text-[#D97706]"
          }
        `}
                >
                  {order.paymentStatus}
                </span>
              </div>

              {/* PRICE BREAKDOWN */}

              <div
                className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        px-4
        py-4
      "
              >
                <div
                  className="
          mb-4

          flex
          items-center
          justify-between
        "
                >
                  <div>
                    <p
                      className="
              text-[11px]
              font-medium
              uppercase
              tracking-wide

              text-text-secondary
            "
                    >
                      Price Breakdown
                    </p>

                    <p
                      className="
              mt-1

              text-sm

              text-text-secondary
            "
                    >
                      Detailed order pricing
                    </p>
                  </div>

                  <div
                    className="
            rounded-2xl

            bg-brand/10

            px-3
            py-2

            text-xs
            font-semibold

            text-brand
          "
                  >
                    {order.items?.length} item
                    {order.items?.length > 1 ? "s" : ""}
                  </div>
                </div>

                {/* BREAKDOWN ROWS */}

                <div
                  className="
          space-y-3
        "
                >
                  {/* SUBTOTAL */}

                  <div
                    className="
            flex
            items-center
            justify-between
          "
                  >
                    <span
                      className="
              text-sm
              text-text-secondary
            "
                    >
                      Subtotal
                    </span>

                    <span
                      className="
              text-sm
              font-medium

              text-text-primary
            "
                    >
                      ₹{order.itemsPrice?.toLocaleString()}
                    </span>
                  </div>

                  {/* SHIPPING */}

                  <div
                    className="
            flex
            items-center
            justify-between
          "
                  >
                    <span
                      className="
              text-sm
              text-text-secondary
            "
                    >
                      Shipping
                    </span>

                    <span
                      className="
              text-sm
              font-medium

              text-text-primary
            "
                    >
                      ₹{order.shippingPrice?.toLocaleString()}
                    </span>
                  </div>

                  {/* TAX */}

                  <div
                    className="
            flex
            items-center
            justify-between
          "
                  >
                    <span
                      className="
              text-sm
              text-text-secondary
            "
                    >
                      Tax
                    </span>

                    <span
                      className="
              text-sm
              font-medium

              text-text-primary
            "
                    >
                      ₹{order.taxPrice?.toLocaleString()}
                    </span>
                  </div>

                  {/* DISCOUNT */}

                  <div
                    className="
            flex
            items-center
            justify-between
          "
                  >
                    <span
                      className="
              text-sm
              text-text-secondary
            "
                    >
                      Discount
                    </span>

                    <span
                      className="
              text-sm
              font-medium

              text-[#0F9F61]
            "
                    >
                      - ₹0
                    </span>
                  </div>

                  {/* DIVIDER */}

                  <div
                    className="
            border-t
            border-border
            pt-4
          "
                  >
                    <div
                      className="
              flex
              items-end
              justify-between
            "
                    >
                      <div>
                        <p
                          className="
                  text-sm
                  font-semibold

                  text-text-primary
                "
                        >
                          Grand Total
                        </p>

                        <p
                          className="
                  mt-1

                  text-xs

                  text-text-secondary
                "
                        >
                          Including all charges
                        </p>
                      </div>

                      <p
                        className="
                text-2xl
                font-bold

                tracking-tight

                text-text-primary
              "
                      >
                        ₹{order.totalPrice?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SHIPPING & NOTES */}

          <div
            className="
    rounded-3xl

    border
    border-border

    bg-surface

    p-6
  "
          >
            <h2
              className="
      mb-6

      text-lg
      font-semibold
    "
            >
              Shipping & Notes
            </h2>

            <div
              className="
      space-y-5
    "
            >
              {/* TRACKING */}

              <div>
                <p
                  className="
          mb-1

          text-xs
          font-medium
          uppercase
          tracking-wide

          text-text-secondary
        "
                >
                  Tracking Number
                </p>

                <div
                  className="
          rounded-2xl

          border
          border-border

          bg-surface-secondary

          px-4
          py-3

          text-sm
        "
                >
                  {order.trackingNumber || "Not assigned"}
                </div>
              </div>

              {/* SHIPPING CARRIER */}

              <div>
                <p
                  className="
          mb-1

          text-xs
          font-medium
          uppercase
          tracking-wide

          text-text-secondary
        "
                >
                  Shipping Carrier
                </p>

                <div
                  className="
          rounded-2xl

          border
          border-border

          bg-surface-secondary

          px-4
          py-3

          text-sm
        "
                >
                  {order.shippingCarrier || "Pending"}
                </div>
              </div>

              {/* ADMIN NOTES */}

              <div>
                <p
                  className="
          mb-1

          text-xs
          font-medium
          uppercase
          tracking-wide

          text-text-secondary
        "
                >
                  Admin Notes
                </p>

                <div
                  className="
          min-h-[100px]

          rounded-2xl

          border
          border-border

          bg-surface-secondary

          px-4
          py-3

          text-sm
          leading-relaxed
        "
                >
                  {order.adminNotes || "No notes added"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
