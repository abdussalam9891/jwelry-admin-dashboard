import { useEffect, useState } from "react";

import {
  Search,
  Filter,
  Eye,
  PackageCheck,
  Clock3,
  Truck,
  XCircle,
} from "lucide-react";

import {
  getOrderStats,
  getOrders,
  exportOrdersReport,
} from "../services/orderService";





export default function Orders() {


 const [stats, setStats] = useState({
  totalOrders: 0,
  processingOrders: 0,
  shippedOrders: 0,
  cancelledOrders: 0,
});

const [orders, setOrders] =
  useState([]);

const [pagination, setPagination] =
  useState(null);

const [page, setPage] =
  useState(1);

const [search, setSearch] =
  useState("");

const [status, setStatus] =
  useState("");

const [sort, setSort] =
  useState("-createdAt");

const [loading, setLoading] =
  useState(false);

useEffect(() => {

  const fetchData =
    async () => {

      try {

        setLoading(true);

        const [
          statsData,
          ordersData,
        ] = await Promise.all([

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

        setOrders(
          ordersData.orders
        );

        setPagination(
          ordersData.pagination
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  fetchData();

}, [
  page,
  search,
  status,
  sort,
]);




const handleExport =
  async () => {

    try {

      const data =
        await exportOrdersReport();

      const url =
        window.URL.createObjectURL(
          new Blob([data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "orders-report.xlsx"
      );

      document.body.appendChild(
        link
      );

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

    <div
      className="
        inline-flex
        items-center

        rounded-full

        border
        border-[#E8DADF]

        bg-[#F8EEF1]

        px-4
        py-2

        text-xs
        font-medium

        text-[#6B1A2A]
      "
    >
      Order Management
    </div>

    <h1
      className="
        mt-4

        text-4xl
        font-bold
        tracking-tight

        text-[#111111]
      "
    >
      Orders
    </h1>

    <p
      className="
        mt-2

        max-w-2xl

        text-sm
        leading-relaxed

        text-[#6D7175]
      "
    >
      Monitor customer purchases,
      fulfillment workflows and
      payment operations across
      your store.
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

        bg-[#6B1A2A]

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
      relative
      overflow-hidden

      rounded-[28px]

      border
      border-[#ECE7E9]

      bg-white

      p-6

      shadow-sm

      transition
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-black/[0.03]
    "
  >

    <div
      className="
        absolute
        right-0
        top-0

        h-28
        w-28

        rounded-full

        bg-[#F8EEF1]

        blur-2xl
      "
    />

    <div className="relative z-10">

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

              text-[#9CA3AF]
            "
          >
            Total Orders
          </p>

          <h2
            className="
              mt-4

              text-4xl
              font-bold
              tracking-tight

              text-[#111111]
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

            text-[#6B1A2A]
          "
        >
          <PackageCheck size={20} />
        </div>

      </div>

    </div>

  </div>

  {/* PROCESSING */}
  <div
    className="
      relative
      overflow-hidden

      rounded-[28px]

      border
      border-[#ECE7E9]

      bg-white

      p-6

      shadow-sm

      transition
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-black/[0.03]
    "
  >

    <div
      className="
        absolute
        right-0
        top-0

        h-28
        w-28

        rounded-full

        bg-[#FFF7EB]

        blur-2xl
      "
    />

    <div className="relative z-10">

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

              text-[#9CA3AF]
            "
          >
            Processing
          </p>

          <h2
            className="
              mt-4

              text-4xl
              font-bold
              tracking-tight

              text-[#111111]
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

  </div>

  {/* SHIPPED */}
  <div
    className="
      relative
      overflow-hidden

      rounded-[28px]

      border
      border-[#ECE7E9]

      bg-white

      p-6

      shadow-sm

      transition
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-black/[0.03]
    "
  >

    <div
      className="
        absolute
        right-0
        top-0

        h-28
        w-28

        rounded-full

        bg-[#EEF6FF]

        blur-2xl
      "
    />

    <div className="relative z-10">

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

              text-[#9CA3AF]
            "
          >
            Shipped
          </p>

          <h2
            className="
              mt-4

              text-4xl
              font-bold
              tracking-tight

              text-[#111111]
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

  </div>

  {/* CANCELLED */}
  <div
    className="
      relative
      overflow-hidden

      rounded-[28px]

      border
      border-[#ECE7E9]

      bg-white

      p-6

      shadow-sm

      transition
      hover:-translate-y-1
      hover:shadow-xl
      hover:shadow-black/[0.03]
    "
  >

    <div
      className="
        absolute
        right-0
        top-0

        h-28
        w-28

        rounded-full

        bg-[#FFF1F2]

        blur-2xl
      "
    />

    <div className="relative z-10">

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

              text-[#9CA3AF]
            "
          >
            Cancelled
          </p>

          <h2
            className="
              mt-4

              text-4xl
              font-bold
              tracking-tight

              text-[#111111]
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

</div>

{/* FILTER BAR */}
<div
  className="
    rounded-[28px]

    border
    border-[#ECE7E9]

    bg-white

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
      <div className="relative flex-1">

        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2

            text-[#9CA3AF]
          "
        />

        <input
          type="text"

          value={search}

          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}

          placeholder="
            Search orders,
            customers or order IDs...
          "

          className="
            h-12
            w-full

            rounded-2xl

            border
            border-[#ECE7E9]

            bg-[#FCFAFB]

            pl-11
            pr-4

            text-sm
            text-[#111111]

            outline-none

            transition

            placeholder:text-[#9CA3AF]

            focus:border-[#D8C7CD]
            focus:bg-white
          "
        />

      </div>

      {/* FILTER BUTTON */}
      <button
        className="
          inline-flex
          items-center
          justify-center
          gap-2

          rounded-2xl

          border
          border-[#ECE7E9]

          bg-[#FCFAFB]

          px-5
          py-3

          text-sm
          font-semibold

          text-[#111111]

          transition
          hover:bg-[#F8EEF1]
        "
      >

        <Filter
          size={16}
          className="text-[#6B1A2A]"
        />

        Filters

      </button>

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
      <select

        value={status}

        onChange={(e) => {
          setStatus(e.target.value);
          setPage(1);
        }}

        className="
          h-12

          rounded-2xl

          border
          border-[#ECE7E9]

          bg-[#FCFAFB]

          px-4

          text-sm
          font-medium

          text-[#111111]

          outline-none

          transition

          focus:border-[#D8C7CD]
          focus:bg-white
        "
      >

        <option value="">
          All Status
        </option>

        <option value="PLACED">
          Placed
        </option>

        <option value="CONFIRMED">
          Confirmed
        </option>

        <option value="SHIPPED">
          Shipped
        </option>

        <option value="DELIVERED">
          Delivered
        </option>

        <option value="CANCELLED">
          Cancelled
        </option>

      </select>

      {/* SORT */}
      <select

        value={sort}

        onChange={(e) => {
          setSort(e.target.value);
          setPage(1);
        }}

        className="
          h-12

          rounded-2xl

          border
          border-[#ECE7E9]

          bg-[#FCFAFB]

          px-4

          text-sm
          font-medium

          text-[#111111]

          outline-none

          transition

          focus:border-[#D8C7CD]
          focus:bg-white
        "
      >

        <option value="-createdAt">
          Newest First
        </option>

        <option value="createdAt">
          Oldest First
        </option>

        <option value="-totalPrice">
          Highest Value
        </option>

        <option value="totalPrice">
          Lowest Value
        </option>

      </select>

    </div>

  </div>

</div>

     {/* TABLE */}
<div
  className="
    overflow-hidden

    rounded-[32px]

    border
    border-[#ECE7E9]

    bg-white

    shadow-[0_10px_40px_rgba(0,0,0,0.04)]
  "
>

  <div className="overflow-x-auto">

    <table className="min-w-full border-collapse">

      <thead>

        <tr
          className="
            border-b
            border-[#F1ECEE]

            bg-[#FCFAFB]

            text-left
          "
        >

          {[
            "Order",
            "Customer",
            "Date",
            "Amount",
            "Payment",
            "Fulfillment",
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

                text-[#9CA3AF]
              "
            >
              {heading}
            </th>

          ))}

          <th
            className="
              px-6
              py-5

              text-right

              text-[11px]
              font-semibold
              uppercase
              tracking-[0.14em]

              text-[#9CA3AF]
            "
          >
            Actions
          </th>

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
          text-[#6D7175]
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
          text-[#6D7175]
        "
      >
        No orders found
      </td>

    </tr>

  ) : (

    orders.map((order) => (

      <tr
        key={order._id}

        className="
          border-b
          border-[#F5F1F2]

          transition
          hover:bg-[#FCFAFB]
        "
      >

        {/* ORDER */}
        <td className="px-6 py-5">

          <div>

            <h3
              className="
                font-semibold
                text-[#111111]
              "
            >
              #{order.orderNumber}
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-[#8A8F98]
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

                text-[#6B1A2A]
              "
            >
              {order.user?.name?.charAt(0)}
            </div>

            <div>

              <h3
                className="
                  font-medium
                  text-[#111]
                "
              >
                {order.user?.name}
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#8A8F98]
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
          {new Date(
            order.createdAt
          ).toLocaleDateString()}
        </td>

        {/* AMOUNT */}
        <td
          className="
            px-6
            py-5

            font-semibold
            text-[#111111]
          "
        >
          ₹{order.totalPrice}
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
                order.paymentStatus ===
                "PAID"
                  ? "bg-[#EEF8F1] text-[#0F9F61]"
                  : "bg-[#FFF5E8] text-[#D97706]"
              }
            `}
          >
            {order.paymentStatus}
          </span>

        </td>

        {/* FULFILLMENT */}
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
                order.orderStatus ===
                "DELIVERED"
                  ? "bg-[#EEF8F1] text-[#0F9F61]"
                  : order.orderStatus ===
                    "CANCELLED"
                  ? "bg-[#FFF1F2] text-[#E11D48]"
                  : "bg-[#FFF5E8] text-[#D97706]"
              }
            `}
          >
            {order.orderStatus}
          </span>

        </td>

        {/* ACTION */}
        <td
          className="
            px-6
            py-5
            text-right
          "
        >

          <button
            className="
              inline-flex
              items-center
              gap-2

              rounded-2xl

              border
              border-[#ECE7E9]

              bg-white

              px-4
              py-2.5

              text-sm
              font-semibold

              text-[#111111]

              shadow-sm

              transition
              hover:bg-[#FAFAFA]
            "
          >

            <Eye size={16} />

            View

          </button>

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

    border-t
    border-[#F1ECEE]

    bg-[#FCFAFB]

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
      text-[#6D7175]
    "
  >

    Showing{" "}

    {(page - 1) * 10 + 1}

    -

    {Math.min(
      page * 10,
      pagination?.totalOrders || 0
    )}

    {" "}of{" "}

    {pagination?.totalOrders || 0}

    {" "}orders

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

      onClick={() =>
        setPage((prev) => prev - 1)
      }

      className={`
        rounded-2xl

        border
        border-[#ECE7E9]

        px-4
        py-2.5

        text-sm
        font-medium

        transition

        ${
          page === 1

            ? "cursor-not-allowed bg-[#F5F5F5] text-[#A1A1AA]"

            : "bg-white text-[#111] hover:bg-[#FAFAFA]"
        }
      `}
    >
      Previous
    </button>

    {/* PAGE BUTTONS */}

    {Array.from({
      length:
        pagination?.totalPages || 1,
    }).map((_, index) => {

      const pageNumber =
        index + 1;

      return (

        <button
          key={pageNumber}

          onClick={() =>
            setPage(pageNumber)
          }

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
                  bg-[#6B1A2A]
                  text-white

                  shadow-lg
                  shadow-[#6B1A2A]/15
                `

                : `
                  border
                  border-[#ECE7E9]

                  bg-white
                  text-[#111]

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

      disabled={
        page ===
        pagination?.totalPages
      }

      onClick={() =>
        setPage((prev) => prev + 1)
      }

      className={`
        rounded-2xl

        border
        border-[#ECE7E9]

        px-4
        py-2.5

        text-sm
        font-medium

        transition

        ${
          page ===
          pagination?.totalPages

            ? "cursor-not-allowed bg-[#F5F5F5] text-[#A1A1AA]"

            : "bg-white text-[#111] hover:bg-[#FAFAFA]"
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
