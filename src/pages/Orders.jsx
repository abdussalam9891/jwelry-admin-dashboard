import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import ButtonLoader from "@/components/loaders/ButtonLoader";
import StatsCardsSkeleton from "@/components/loaders/StatsCardsSkeleton";
import DataTableSkeleton from "@/components/loaders/DataTableSkeleton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Clock3, PackageCheck, Search, Truck, XCircle, Loader2  } from "lucide-react";

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
  const [ordersLoading, setOrdersLoading] = useState(false);
const [statsLoading, setStatsLoading] = useState(false);
const [exportLoading, setExportLoading] = useState(false);




  useEffect(() => {
  const fetchStats = async () => {
    try {
      setStatsLoading(true);

      const data = await getOrderStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setStatsLoading(false);
    }
  };

  fetchStats();
}, []);

 useEffect(() => {
  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);

      const data = await getOrders({
        page,
        limit: 10,
        search,
        status,
        sort,
      });

      setOrders(data.orders);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setOrdersLoading(false);
    }
  };

  fetchOrders();
}, [page, search, status, sort]);

const handleExport = async () => {
  try {
    setExportLoading(true);

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
  } finally {
    setExportLoading(false);
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
  disabled={exportLoading}
  className="
    inline-flex
    items-center
    justify-center

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

    disabled:cursor-not-allowed
    disabled:opacity-70
  "
>
  <ButtonLoader
    loading={exportLoading}
    loadingText="Exporting..."
  >
    Export
  </ButtonLoader>
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



 {statsLoading ? (
  <StatsCardsSkeleton />
) : (
  <>
    <StatCard
      title="Total Orders"
      value={stats.totalOrders}
      icon={PackageCheck}
      iconBg="#F8EEF1"
      iconColor="#6B1A2A"
    />

    <StatCard
      title="Processing"
      value={stats.processingOrders}
      icon={Clock3}
      iconBg="#FFF5E8"
      iconColor="#D97706"
    />

    <StatCard
      title="Shipped"
      value={stats.shippedOrders}
      icon={Truck}
      iconBg="#EEF6FF"
      iconColor="#2563EB"
    />

    <StatCard
      title="Cancelled"
      value={stats.cancelledOrders}
      icon={XCircle}
      iconBg="#FFF1F2"
      iconColor="#E11D48"
    />
  </>
)}

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
              {ordersLoading && orders.length === 0 ? (
  <DataTableSkeleton
    rows={10}
    columns={6}
  />
) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
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
{pagination && (
  <div
    className="
      flex
      flex-col
      gap-4

      bg-surface-secondary

      px-6
      py-5

      md:flex-row
      md:items-center
      md:justify-between
    "
  >
    {/* LEFT */}
    <div>
      <p
        className="
          text-sm
          font-medium
          text-text-secondary
        "
      >
        Showing{" "}
        <span className="font-semibold text-text-primary">
          {(page - 1) * 10 + 1}
        </span>
        –
        <span className="font-semibold text-text-primary">
          {Math.min(page * 10, pagination.totalOrders)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-text-primary">
          {pagination.totalOrders}
        </span>{" "}
        orders
      </p>
    </div>

    {/* RIGHT */}
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      {/* PREVIOUS */}
      <Button
        variant="outline"
        disabled={page === 1 || ordersLoading}
        onClick={() => setPage((prev) => prev - 1)}
        className="
          rounded-2xl

          border-border

          bg-surface

          px-4
          py-2.5

          text-sm
          font-semibold

          text-text-primary

          shadow-sm

          hover:bg-[#FAFAFA]

          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        {ordersLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Previous"
        )}
      </Button>

      {/* CURRENT PAGE */}
      <div
        className="
          flex
          h-[42px]
          min-w-[42px]

          items-center
          justify-center

          rounded-2xl

          bg-brand

          px-4

          text-sm
          font-semibold
          text-white

          shadow-lg
          shadow-[#6B1A2A]/15
        "
      >
        {page}
      </div>

      {/* TOTAL PAGES */}
      <div
        className="
          rounded-2xl

          border
          border-border

          bg-surface

          px-4
          py-2.5

          text-sm
          font-medium

          text-text-secondary
        "
      >
        / {pagination.totalPages}
      </div>

      {/* NEXT */}
      <Button
        variant="outline"
        disabled={
          page === pagination.totalPages ||
          ordersLoading
        }
        onClick={() => setPage((prev) => prev + 1)}
        className="
          rounded-2xl

          border-border

          bg-surface

          px-4
          py-2.5

          text-sm
          font-semibold

          text-text-primary

          shadow-sm

          hover:bg-[#FAFAFA]

          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        {ordersLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Next"
        )}
      </Button>
    </div>
  </div>
)}
      </div>
    </div>
  );
}
