import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Clock3, PackageCheck, Search, Truck, XCircle } from "lucide-react";

import {
  exportOrdersReport,
  getOrderStats,
  getOrders,
} from "../services/orderService";

export default function Orders() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    cancelledOrders: 0,
  });

  const [orders, setOrders] = useState([]);

  const [pagination, setPagination] = useState(null);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [sort, setSort] = useState("-createdAt");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [statsData, ordersData] = await Promise.all([
          getOrderStats(),

          getOrders({
            page,
            limit: 10,
            search,
            status,
            sort,
          }),
        ]);

        /* KPI STATS */

        setStats(statsData);

        /* ORDERS */

        setOrders(ordersData.orders);

        setPagination(ordersData.pagination);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search, status, sort]);

  const handleExport = async () => {
    try {
      const data = await exportOrdersReport();

      const url = window.URL.createObjectURL(new Blob([data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "orders-report.xlsx");

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div
        className="
    flex
    flex-col
    gap-5

    lg:flex-row
    lg:items-center
    lg:justify-between
  "
      >
        {/* LEFT */}
        <div>
          

          <h1
            className="
        mt-4

        text-4xl
        font-bold
        tracking-tight

        text-text-primary
      "
          >
            Order Management
          </h1>

          <p
            className="
        mt-2

        max-w-2xl

        text-sm
        leading-relaxed

        text-text-secondary
      "
          >
            Monitor customer purchases, fulfillment workflows and payment
            operations across your store.
          </p>
        </div>

        {/* RIGHT */}
        <div
          className="
      flex
      items-center
      gap-3
    "
        >
          {/* primary */}
          <button
            onClick={handleExport}
            className="
        rounded-2xl

        bg-brand

        px-5
        py-3

        text-sm
        font-semibold
        text-white

        shadow-lg
        shadow-[#6B1A2A]/15

        transition
        hover:opacity-90
      "
          >
            Export
          </button>
        </div>
      </div>

      {/* KPI */}
      <div
        className="
    grid
    grid-cols-1
    gap-5

    md:grid-cols-2
    xl:grid-cols-4
  "
      >
        {/* TOTAL ORDERS */}
        <div
          className="
      rounded-3xl

      border
      border-border

      bg-surface

      p-6

      shadow-sm
    "
        >
          <div
            className="
        flex
        items-start
        justify-between
      "
          >
            <div>
              <p
                className="
            text-xs
            font-medium
            uppercase
            tracking-wide

            text-[#6B7280]
          "
              >
                Total Orders
              </p>

              <h2
                className="
            mt-4

            text-3xl
            font-bold
            tracking-tight

            text-text-primary
          "
              >
                {stats.totalOrders}
              </h2>
            </div>

            <div
              className="
          flex
          h-12
          w-12

          items-center
          justify-center

          rounded-2xl

          bg-[#F8EEF1]

          text-brand
        "
            >
              <PackageCheck size={20} />
            </div>
          </div>
        </div>

        {/* PROCESSING */}
        <div
          className="
      rounded-3xl

      border
      border-border

      bg-surface

      p-6

      shadow-sm
    "
        >
          <div
            className="
        flex
        items-start
        justify-between
      "
          >
            <div>
              <p
                className="
            text-xs
            font-medium
            uppercase
            tracking-wide

            text-[#6B7280]
          "
              >
                Processing
              </p>

              <h2
                className="
            mt-4

            text-3xl
            font-bold
            tracking-tight

            text-text-primary
          "
              >
                {stats.processingOrders}
              </h2>
            </div>

            <div
              className="
          flex
          h-12
          w-12

          items-center
          justify-center

          rounded-2xl

          bg-[#FFF5E8]

          text-[#D97706]
        "
            >
              <Clock3 size={20} />
            </div>
          </div>
        </div>

        {/* SHIPPED */}
        <div
          className="
      rounded-3xl

      border
      border-border

      bg-surface

      p-6

      shadow-sm
    "
        >
          <div
            className="
        flex
        items-start
        justify-between
      "
          >
            <div>
              <p
                className="
            text-xs
            font-medium
            uppercase
            tracking-wide

            text-[#6B7280]
          "
              >
                Shipped
              </p>

              <h2
                className="
            mt-4

            text-3xl
            font-bold
            tracking-tight

            text-text-primary
          "
              >
                {stats.shippedOrders}
              </h2>
            </div>

            <div
              className="
          flex
          h-12
          w-12

          items-center
          justify-center

          rounded-2xl

          bg-[#EEF6FF]

          text-[#2563EB]
        "
            >
              <Truck size={20} />
            </div>
          </div>
        </div>

        {/* CANCELLED */}
        <div
          className="
      rounded-3xl

      border
      border-border

      bg-surface

      p-6

      shadow-sm
    "
        >
          <div
            className="
        flex
        items-start
        justify-between
      "
          >
            <div>
              <p
                className="
            text-xs
            font-medium
            uppercase
            tracking-wide

            text-[#6B7280]
          "
              >
                Cancelled
              </p>

              <h2
                className="
            mt-4

            text-3xl
            font-bold
            tracking-tight

            text-text-primary
          "
              >
                {stats.cancelledOrders}
              </h2>
            </div>

            <div
              className="
          flex
          h-12
          w-12

          items-center
          justify-center

          rounded-2xl

          bg-[#FFF1F2]

          text-[#E11D48]
        "
            >
              <XCircle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div
        className="
    rounded-[28px]

    border
    border-border

    bg-surface

    p-5

    shadow-[0_10px_30px_rgba(0,0,0,0.03)]
  "
      >
        <div
          className="
      flex
      flex-col
      gap-4

      xl:flex-row
      xl:items-center
      xl:justify-between
    "
        >
          {/* LEFT */}
          <div
            className="
        flex
        flex-1
        flex-col
        gap-3

        lg:flex-row
      "
          >
            {/* SEARCH */}
            <div className="relative flex-[2]">
              <Search
                size={18}
                className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2

            text-text-secondary
          "
              />

              <Input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);

                  setPage(1);
                }}
                placeholder="
            Search orders, customers or order IDs...
          "
                className="
            h-12
            w-full

            rounded-2xl

            border-border

            bg-surface-secondary

            pl-11
            pr-4

            text-sm
            text-text-primary

            placeholder:text-text-secondary

            focus-visible:ring-0
            focus-visible:border-[#D8C7CD]
            focus-visible:bg-surface
          "
              />
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
        flex
        flex-col
        gap-3

        sm:flex-row
      "
          >
            {/* STATUS */}
            <Select
              value={status || "all"}
              onValueChange={(value) => {
                setStatus(value === "all" ? "" : value);

                setPage(1);
              }}
            >
              <SelectTrigger
                className="
            h-12
            shrink-0

            rounded-2xl

            border-border

            bg-surface-secondary

            px-4

            text-sm
            font-medium

            text-text-primary

            focus:ring-0
            focus:border-border-[#D8C7CD]
            focus:bg-surface
          "
              >
                <SelectValue placeholder="All Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>

                <SelectItem value="PLACED">Placed</SelectItem>

                <SelectItem value="CONFIRMED">Confirmed</SelectItem>

                <SelectItem value="SHIPPED">Shipped</SelectItem>

                <SelectItem value="DELIVERED">Delivered</SelectItem>

                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            {/* SORT */}
            <Select
              value={sort}
              onValueChange={(value) => {
                setSort(value);

                setPage(1);
              }}
            >
              <SelectTrigger
                className="
            h-12
            shrink-0

            rounded-2xl

            border-border

            bg-surface-secondary

            px-4

            text-sm
            font-medium

            text-text-primary

            focus:ring-0
            focus:border-border-[#D8C7CD]
            focus:bg-surface
          "
              >
                <SelectValue placeholder="Sort Orders" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="-createdAt">Newest First</SelectItem>

                <SelectItem value="createdAt">Oldest First</SelectItem>

                <SelectItem value="-totalPrice">Highest Value</SelectItem>

                <SelectItem value="totalPrice">Lowest Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div
        className="
    overflow-hidden

    rounded-[32px]

    border
    border-border

    bg-surface

    shadow-[0_10px_40px_rgba(0,0,0,0.04)]
  "
      >
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr
                className="
            border-b


            bg-surface-secondary

            text-left
          "
              >
                {[
                  "Order",
                  "Customer",
                  "Date",
                  "Amount",
                  "Payment",
                  "STATUS",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="
                px-6
                py-5

                text-[11px]
                font-semibold
                uppercase
                tracking-[0.14em]

                text-[#6B7280]
              "
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="
          px-6
          py-16

          text-center
          text-text-secondary
        "
                  >
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="
          px-6
          py-16

          text-center
          text-text-secondary
        "
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                    className="
  cursor-pointer

  border-b

  dark:border-white/[0.06]

  transition-all
  duration-200

  hover:bg-surface-secondary
  hover:shadow-[inset_4px_0_0_#6B1A2A]

   group
"
                  >
                    {/* ORDER */}
                    <td className="px-6 py-5">
                      <div>
                        <h3
                          className="
                font-semibold
                text-text-primary
              "
                        >
                          #
                          {order.orderNumber ||
                            order._id?.slice(-6)?.toUpperCase()}
                        </h3>

                        <p
                          className="
                mt-1
                text-sm
                text-text-secondary
              "
                        >
                          {order.items.length} items
                        </p>
                      </div>
                    </td>

                    {/* CUSTOMER */}
                    <td className="px-6 py-5">
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
                h-11
                w-11

                items-center
                justify-center

                rounded-full

                bg-[#F8EEF1]

                text-sm
                font-semibold

                text-brand
              "
                        >
                          {order.user?.name?.charAt(0)}
                        </div>

                        <div>
                          <h3
                            className="
                  font-medium
                 text-text-primary
                "
                          >
                            {order.user?.name}
                          </h3>

                          <p
                            className="
                  mt-1
                  text-sm
                  text-text-secondary
                "
                          >
                            {order.user?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* DATE */}
                    <td
                      className="
            px-6
            py-5

            text-[15px]
            text-[#4B5563]
          "
                    >
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* AMOUNT */}
                    <td
                      className="
            px-6
            py-5

            font-semibold
            text-text-primary
          "
                    >
                      ₹{order.totalPrice?.toLocaleString()}
                    </td>

                    {/* PAYMENT */}
                    <td className="px-6 py-5">
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
                  : "bg-[#FFF5E8] text-[#D97706]"
              }
            `}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
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
        order.orderStatus === "DELIVERED"
          ? "bg-[#EEF8F1] text-[#0F9F61]"
          : order.orderStatus === "CANCELLED"
            ? "bg-[#FFF1F2] text-[#E11D48]"
            : order.orderStatus === "SHIPPED"
              ? "bg-[#EEF4FF] text-[#2563EB]"
              : order.orderStatus === "CONFIRMED"
                ? "bg-[#F5F3FF] text-[#7C3AED]"
                : "bg-[#FFF5E8] text-[#D97706]"
      }
    `}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div
          className="
    flex
    flex-col
    gap-4

    dark:border-white/[0.06]


    bg-surface-secondary

    px-6
    py-5

    md:flex-row
    md:items-center
    md:justify-between
  "
        >
          <p
            className="
      text-sm
      text-text-secondary
    "
          >
            Showing {(page - 1) * 10 + 1}-
            {Math.min(page * 10, pagination?.totalOrders || 0)} of{" "}
            {pagination?.totalOrders || 0} orders
          </p>

          <div
            className="
      flex
      items-center
      gap-2
    "
          >
            {/* PREVIOUS */}

            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className={`
        rounded-2xl

        border
        border-border

        px-4
        py-2.5

        text-sm
        font-medium

        transition

        ${
          page === 1
            ? "cursor-not-allowed bg-[#F5F5F5] text-[#A1A1AA]"
            : "bg-surface text-text-primary hover:bg-[#FAFAFA]"
        }
      `}
            >
              Previous
            </button>

            {/* PAGE BUTTONS */}

            {Array.from({
              length: pagination?.totalPages || 1,
            }).map((_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`
            rounded-2xl

            px-4
            py-2.5

            text-sm
            font-semibold

            transition

            ${
              page === pageNumber
                ? `
                  bg-brand
                  text-white

                  shadow-lg
                  shadow-[#6B1A2A]/15
                `
                : `
                  border
                  border-border

                  bg-surface
                 text-text-primary

                  hover:bg-[#FAFAFA]
                `
            }
          `}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* NEXT */}

            <button
              disabled={page === pagination?.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className={`
        rounded-2xl

        border
        border-border

        px-4
        py-2.5

        text-sm
        font-medium

        transition

        ${
          page === pagination?.totalPages
            ? "cursor-not-allowed bg-[#F5F5F5] text-[#A1A1AA]"
            : "bg-surface text-text-primary hover:bg-[#FAFAFA]"
        }
      `}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
