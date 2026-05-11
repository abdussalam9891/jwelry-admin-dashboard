import { AlertTriangle, IndianRupee, ShoppingCart, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";



import {

  ResponsiveContainer,

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid,

} from "recharts";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    metrics: {
      totalRevenue: 0,

      totalOrders: 0,

      pendingOrders: 0,

      totalCustomers: 0,

      totalProducts: 0,

      lowStockProducts: 0,
    },

    recentOrders: [],

    recentCustomers: [],

    lowStockProducts: [],
  });

  const [range, setRange] =
  useState("12m");

  const [loading, setLoading] = useState(false);
  const { metrics } = dashboardData;

useEffect(() => {

  const fetchDashboard =
    async () => {

      try {

        setLoading(true);

        const data =
          await getDashboardData(
            range
          );

        setDashboardData(
          data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  fetchDashboard();

}, [range]);

  return (
    <div className="space-y-6">
      {/* HERO */}
      <div
        className="
    relative
    overflow-hidden

    rounded-[32px]

    border
    border-[#E9E3E5]

    bg-gradient-to-br
    from-white
    via-[#FCFAFB]
    to-[#F8EEF1]

    p-8

    shadow-[0_10px_40px_rgba(0,0,0,0.04)]
  "
      >
        {/* glow */}
        <div
          className="
      absolute
      -right-24
      -top-24

      h-72
      w-72

      rounded-full

      bg-[#6B1A2A]/10

      blur-3xl
    "
        />

        <div
          className="
      relative
      z-10

      flex
      flex-col
      gap-8

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
          gap-2

          rounded-full

          border
          border-[#E7D7DC]

          bg-white/80

          px-4
          py-2

          text-xs
          font-medium

          text-[#6B1A2A]

          backdrop-blur-xl
        "
            >
              Gemora Admin Suite
            </div>

            <h1
              className="
          mt-5

          max-w-2xl

          text-4xl
          font-bold
          tracking-tight

          text-[#111111]

          md:text-5xl
        "
            >
              Monitor your store performance in real time.
            </h1>

            <p
              className="
          mt-4

          max-w-2xl

          text-[15px]
          leading-relaxed

          text-[#6D7175]
        "
            >
              Track revenue, inventory, fulfillment operations and customer
              activity across your ecommerce ecosystem.
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="
        flex
        items-center
        gap-4
      "
          >
            <button
              className="
          rounded-2xl

          bg-[#6B1A2A]

          px-5
          py-3

          text-sm
          font-semibold
          text-white

          shadow-lg
          shadow-[#6B1A2A]/20

          transition
          hover:opacity-90
        "
            >
              Export Report
            </button>

            <button
              className="
          rounded-2xl

          border
          border-black/10

          bg-white/70

          px-5
          py-3

          text-sm
          font-semibold

          text-[#111]

          backdrop-blur-xl

          transition
          hover:bg-white
        "
            >
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div
        className="
    grid
    grid-cols-1
    gap-5

    md:grid-cols-2
    xl:grid-cols-4
  "
      >
        {/* REVENUE */}
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
                  Total Revenue
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
                  {loading
                    ? "..."
                    : `₹${metrics.totalRevenue?.toLocaleString()}`}
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
                <IndianRupee size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* ORDERS */}
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
                  Orders
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
                  {loading ? "..." : metrics.totalOrders}
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
                <ShoppingCart size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOMERS */}
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
                  Customers
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
                  {loading ? "..." : metrics.totalCustomers}
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
                <Users size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* LOW STOCK */}
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
                  Low Stock
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
                  {loading ? "..." : metrics.lowStockProducts}
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
                <AlertTriangle size={20} />
              </div>
            </div>

            {/* only alert kept */}
            <div
              className="
          mt-6
          inline-flex
          items-center

          rounded-full

          bg-[#FFF5E8]

          px-3
          py-1

          text-xs
          font-semibold

          text-[#D97706]
        "
            >
              Needs attention
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

  {/* REVENUE CHART */}
  <div
    className="
      xl:col-span-2

      rounded-3xl
      border
      border-black/5

      bg-white
      p-6

      shadow-sm
    "
  >

    <div
      className="
        flex
        items-center
        justify-between
      "
    >

      <div>

        <h2
          className="
            text-lg
            font-semibold
            text-[#1A1A1A]
          "
        >
          Revenue Overview
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-[#6D7175]
          "
        >
          Monthly sales performance
        </p>

      </div>

    <select

  value={range}

  onChange={(e) =>
    setRange(e.target.value)
  }

  className="
    rounded-xl
    border
    border-black/10

    bg-[#F6F6F7]

    px-4
    py-2

    text-sm
    outline-none
  "
>

  <option value="7d">
    Last 7 Days
  </option>

  <option value="15d">
    Last 15 Days
  </option>

  <option value="1m">
    Last 1 Month
  </option>

  <option value="3m">
    Last 3 Months
  </option>

  <option value="6m">
    Last 6 Months
  </option>

  <option value="12m">
    Last 12 Months
  </option>

</select>

    </div>

    {/* CHART */}
  <div className="mt-8 h-[320px]">

  <ResponsiveContainer
    width="100%"
    height="100%"
  >

    <BarChart
      data={
        dashboardData.monthlyRevenue || []
      }

      margin={{
        top: 10,
        right: 10,
        left: -20,
        bottom: 0,
      }}
    >

      <CartesianGrid
        strokeDasharray="3 3"
        vertical={false}
        stroke="#F1ECEE"
      />

      <XAxis
        dataKey="_id.month"

        axisLine={false}
        tickLine={false}

        tick={{
          fill: "#6D7175",
          fontSize: 12,
        }}

        tickFormatter={(value) => {

          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];

          return months[value - 1];

        }}
      />

      <YAxis
        axisLine={false}
        tickLine={false}

        tick={{
          fill: "#6D7175",
          fontSize: 12,
        }}

        tickFormatter={(value) =>
          `₹${value / 1000}k`
        }
      />

      <Tooltip

        contentStyle={{

          borderRadius: "16px",

          border:
            "1px solid #ECE7E9",

          background:
            "#FFFFFF",

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.06)",

        }}

        formatter={(value) => [

          `₹${value.toLocaleString()}`,

          "Revenue",

        ]}

        labelFormatter={(label) => {

          const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          return months[label - 1];

        }}
      />

      <Bar
        dataKey="revenue"

        radius={[14,14,0,0]}

        fill="#6B1A2A"

        maxBarSize={56}
      />

    </BarChart>

  </ResponsiveContainer>

</div>

  </div>

  {/* QUICK INSIGHTS */}
  <div
    className="
      rounded-3xl
      border
      border-black/5

      bg-white
      p-6

      shadow-sm
    "
  >

    <h2
      className="
        text-lg
        font-semibold
        text-[#1A1A1A]
      "
    >
      Quick Insights
    </h2>

    <div className="mt-6 space-y-5">

      {/* TOTAL PRODUCTS */}
      <div
        className="
          rounded-2xl
          bg-[#F6F6F7]
          p-4
        "
      >

        <p
          className="
            text-sm
            text-[#6D7175]
          "
        >
          Total Products
        </p>

        <h3
          className="
            mt-2
            text-xl
            font-bold
          "
        >

          {loading

            ? "..."

            : metrics.totalProducts
          }

        </h3>

      </div>

      {/* PENDING ORDERS */}
      <div
        className="
          rounded-2xl
          bg-[#F6F6F7]
          p-4
        "
      >

        <p
          className="
            text-sm
            text-[#6D7175]
          "
        >
          Pending Orders
        </p>

        <h3
          className="
            mt-2
            text-xl
            font-bold
          "
        >

          {loading

            ? "..."

            : metrics.pendingOrders
          }

        </h3>

      </div>

      {/* LOW STOCK */}
      <div
        className="
          rounded-2xl
          bg-[#F6F6F7]
          p-4
        "
      >

        <p
          className="
            text-sm
            text-[#6D7175]
          "
        >
          Inventory Alerts
        </p>

        <h3
          className="
            mt-2
            text-xl
            font-bold
          "
        >

          {loading

            ? "..."

            : metrics.lowStockProducts
          }

        </h3>

      </div>

    </div>

  </div>

</div>

      {/* LOWER GRID */}
      <div
        className="
          grid
          grid-cols-1
          gap-6

          xl:grid-cols-2
        "
      >
        {/* RECENT ORDERS */}
        <div
          className="
            rounded-3xl
            border
            border-black/5

            bg-white
            p-6

            shadow-sm
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <h2
              className="
                text-lg
                font-semibold
                text-[#1A1A1A]
              "
            >
              Recent Orders
            </h2>

            <button
              className="
                text-sm
                font-medium
                text-black/60
              "
            >
              View All
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-sm text-[#6D7175]">Loading orders...</p>
            ) : dashboardData.recentOrders.length === 0 ? (
              <p className="text-sm text-[#6D7175]">No recent orders</p>
            ) : (
              dashboardData.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="
            flex
            items-center
            justify-between

            rounded-2xl
            border
            border-black/5

            p-4
          "
                >
                  <div>
                    <h3 className="font-semibold">
                      {order.orderNumber || order._id.slice(-6)}
                    </h3>

                    <p
                      className="
                mt-1
                text-sm
                text-[#6D7175]
              "
                    >
                      {order.customerName}
                    </p>
                  </div>

                  <div className="text-right">
                    <h3 className="font-semibold">
                      ₹{order.totalPrice?.toLocaleString()}
                    </h3>

                    <p
                      className={`
                mt-1
                text-sm
                font-medium

                ${
                  order.paymentStatus === "PAID"
                    ? "text-green-600"
                    : "text-orange-500"
                }
              `}
                    >
                      {order.paymentStatus}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* LOW STOCK */}
        <div
          className="
            rounded-3xl
            border
            border-black/5

            bg-white
            p-6

            shadow-sm
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <h2
              className="
                text-lg
                font-semibold
                text-[#1A1A1A]
              "
            >
              Inventory Alerts
            </h2>

            <button
              className="
                text-sm
                font-medium
                text-black/60
              "
            >
              Manage
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-sm text-[#6D7175]">Loading inventory...</p>
            ) : dashboardData.lowStockProducts.length === 0 ? (
              <p className="text-sm text-[#6D7175]">No low stock alerts</p>
            ) : (
              dashboardData.lowStockProducts.map((product) => {
                const totalStock =
                  product.variants?.length > 0
                    ? product.variants.reduce(
                        (acc, variant) => acc + variant.stock,

                        0,
                      )
                    : product.stock;

                return (
                  <div
                    key={product._id}
                    className="
              flex
              items-center
              justify-between

              rounded-2xl
              border
              border-black/5

              p-4
            "
                  >
                    <div
                      className="
                flex
                items-center
                gap-4
              "
                    >
                      <img
                        src={
                          product.images?.[1]
                            ? `${import.meta.env.VITE_ASSET_URL}${product.images[1]}`
                            : "/placeholder.webp"
                        }
                        alt={product.name}
                        className="
    h-14
    w-14

    rounded-2xl

    border
    border-[#F1ECEE]

    object-cover
  "
                      />

                      <div>
                        <h3 className="font-semibold">{product.name}</h3>

                        <p
                          className="
                    mt-1
                    text-sm
                    text-[#6D7175]
                  "
                        >
                          {product.category}
                        </p>
                      </div>
                    </div>

                    <div
                      className="
                rounded-full
                bg-red-100

                px-3
                py-1

                text-xs
                font-semibold
                text-red-700
              "
                    >
                      {totalStock} Left
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
