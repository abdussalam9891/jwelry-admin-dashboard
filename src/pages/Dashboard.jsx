import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";

import MetricCard from "@/components/dashboard/MetricCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { AlertTriangle, IndianRupee, ShoppingCart, Users } from "lucide-react";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  exportDashboardReport,
  getDashboardData,
} from "../services/dashboardService";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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
  const [customMode, setCustomMode] = useState(false);

  const [fromDate, setFromDate] = useState(null);

  const [toDate, setToDate] = useState(null);

  const [range, setRange] = useState("12m");

  const [loading, setLoading] = useState(false);
  const { metrics } = dashboardData;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        let params = {};

        if (customMode && fromDate && toDate) {
          params = {
            from: fromDate.toISOString(),

            to: toDate.toISOString(),
          };
        } else {
          params = {
            range,
          };
        }

        const data = await getDashboardData(params);
        console.log(data);
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [range, customMode, fromDate, toDate]);

  const handlePresetChange = (value) => {
    setCustomMode(false);

    setRange(value);
  };

  const handleExport = async () => {
    try {
      const data = await exportDashboardReport();

      const url = window.URL.createObjectURL(new Blob([data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "dashboard-report.xlsx");

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* HERO */}
      <div
        className="
    relative
    overflow-hidden

    border
    border-border

    rounded-[32px]

   dark:border-white/[0.1]



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

      bg-brand/10

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


            <h1
              className="
          mt-5

          max-w-2xl

          text-4xl
          font-bold
          tracking-tight

          text-text-primary

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

          text-text-secondary
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
          shadow-[#6B1A2A]/20

          transition
          hover:opacity-90
        "
            >
              Export Report
            </button>

           <Link
  to="/admin/analytics"
  className="
    rounded-2xl
    border
    border-black/10
    bg-surface/70
    px-5
    py-3
    text-sm
    font-semibold
    text-text-primary
    backdrop-blur-xl
    transition
    hover:bg-surface
  "
>
  View Analytics
</Link>
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
        <MetricCard
          to="/admin/analytics"
          title="Total Revenue"
          value={metrics.totalRevenue}
          icon={IndianRupee}
          description="Explore revenue analytics"
          actionText="View analytics"
          iconBg="#F8EEF1"
          iconColor="#6B1A2A"
          loading={loading}
          prefix="₹"
        />

        <MetricCard
          to="/admin/orders"
          title="Orders"
          value={metrics.totalOrders}
          icon={ShoppingCart}
          description="Track and manage orders"
          actionText="View orders"
          iconBg="#EEF6FF"
          iconColor="#2563EB"
          loading={loading}
        />

        <MetricCard
          to="/admin/customers"
          title="Customers"
          value={metrics.totalCustomers}
          icon={Users}
          description="Manage customer accounts"
          actionText="View customers"
          iconBg="#EEF8F1"
          iconColor="#0F9F61"
          loading={loading}
        />

        <MetricCard
          to="/admin/products?stock=low"
          title="Low Stock"
          value={metrics.lowStockProducts}
          icon={AlertTriangle}
          description="Products running low"
          actionText="View inventory"
          iconBg="#FFF5E8"
          iconColor="#D97706"
          loading={loading}
        />
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

    rounded-[2rem]
    border
    border-border

    bg-surface

    p-6

    shadow-sm
  "
        >
          {/* TOP HEADER */}

          <div
            className="
      flex
      flex-col
      gap-5

      xl:flex-row
      xl:items-start
      xl:justify-between
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

          bg-[#F8EEF1]

          px-3
          py-1

          text-xs
          font-semibold

          text-brand

          mb-4
        "
              >
                Revenue Analytics
              </div>

              <h2
                className="
          text-[1.8rem]
          font-bold
          tracking-tight
          text-text-primary
        "
              >
                Revenue Overview
              </h2>

              <p
                className="
          mt-2
          text-sm
          leading-6
          text-text-secondary

          max-w-lg
        "
              >
                Analyze store revenue trends, sales performance and order growth
                across selected date ranges.
              </p>
            </div>

            {/* RIGHT CONTROLS */}

            <div
              className="
        flex
        flex-wrap
        items-center
        gap-3
      "
            >
              {/* RANGE */}

              <Select
                value={range}
                onValueChange={(value) => handlePresetChange(value)}
              >
                <SelectTrigger
                  className="
      h-11
      w-[180px]

      rounded-xl

      border-black/10

      bg-surface-secondary

      text-sm
      font-medium

      shadow-none

      focus:ring-4
      focus:ring-[#6B1A2A]/10
      focus:border-border-[#6B1A2A]/30
    "
                >
                  <SelectValue placeholder="Select Range" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="7d">Last 7 Days</SelectItem>

                  <SelectItem value="15d">Last 15 Days</SelectItem>

                  <SelectItem value="1m">Last 1 Month</SelectItem>

                  <SelectItem value="3m">Last 3 Months</SelectItem>

                  <SelectItem value="6m">Last 6 Months</SelectItem>

                  <SelectItem value="12m">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>

              {/* FROM */}

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="
        h-11
        w-[160px]

        justify-start
        rounded-xl

        border-black/10

        bg-surface

        px-4

        text-left
        text-sm
        font-medium

        shadow-sm
      "
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {fromDate ? format(fromDate, "dd MMM yyyy") : "From Date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={(date) => {
                      setCustomMode(true);

                      setFromDate(date);
                    }}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* TO */}

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={!fromDate}
                    className="
        h-11
        w-[160px]

        justify-start
        rounded-xl

        border-black/10

        bg-surface

        px-4

        text-left
        text-sm
        font-medium

        shadow-sm
      "
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {toDate ? format(toDate, "dd MMM yyyy") : "To Date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={(date) => {
                      if (fromDate && date < fromDate) {
                        return;
                      }

                      setCustomMode(true);

                      setToDate(date);
                    }}
                    disabled={(date) =>
                      date > new Date() || (fromDate && date < fromDate)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* CHART */}

          <div className="mt-10 h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dashboardData.revenueChart || []}
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
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#6D7175",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#6D7175",
                    fontSize: 12,
                  }}
                  tickFormatter={(value) => {
                    if (value >= 1000000) {
                      return `₹${(value / 1000000).toFixed(1)}M`;
                    }

                    if (value >= 1000) {
                      return `₹${(value / 1000).toFixed(0)}k`;
                    }

                    return `₹${value}`;
                  }}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(107,26,42,0.04)",
                  }}
                  contentStyle={{
                    borderRadius: "20px",

                    border: "1px solid #ECE7E9",

                    background: "#FFFFFF",

                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                  }}
                  formatter={(value) => [
                    `₹${value.toLocaleString()}`,

                    "Revenue",
                  ]}
                  labelFormatter={(label) => label}
                />

                <Bar
                  dataKey="revenue"
                  radius={[14, 14, 0, 0]}
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
      border-border

      bg-surface
      p-6

      shadow-sm
    "
        >
          <h2
            className="
        text-lg
        font-semibold
        text-text-primary
      "
          >
            Quick Insights
          </h2>

          <div className="mt-6 space-y-5">
            {/* TOTAL PRODUCTS */}
            <div
              className="
          rounded-2xl
          bg-surface-secondary
          p-4
        "
            >
              <p
                className="
            text-sm
            text-text-secondary
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
                {loading ? "..." : metrics.totalProducts}
              </h3>
            </div>

            {/* PENDING ORDERS */}
            <div
              className="
          rounded-2xl
          bg-surface-secondary
          p-4
        "
            >
              <p
                className="
            text-sm
            text-text-secondary
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
                {loading ? "..." : metrics.pendingOrders}
              </h3>
            </div>

            {/* LOW STOCK */}
            <div
              className="
          rounded-2xl
          bg-surface-secondary
          p-4
        "
            >
              <p
                className="
            text-sm
            text-text-secondary
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
                {loading ? "..." : metrics.lowStockProducts}
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
           border-border

            bg-surface
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
                text-text-primary
              "
            >
              Recent Orders
            </h2>

            <Link
              to="/admin/orders"
              className="
    text-sm
    font-medium



    transition
    hover:text-brand
  "
            >
              View All
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-sm text-text-secondary">Loading orders...</p>
            ) : dashboardData.recentOrders.length === 0 ? (
              <p className="text-sm text-text-secondary">No recent orders</p>
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
            border-border

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
                text-text-secondary
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
           border-border

            bg-surface
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
                text-text-primary
              "
            >
              Inventory Alerts
            </h2>

            <Link
              to="/admin/products"
              className="
    text-sm
    font-medium



    transition
    hover:text-brand
  "
            >
              Manage
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="text-sm text-text-secondary">
                Loading inventory...
              </p>
            ) : dashboardData.lowStockProducts.length === 0 ? (
              <p className="text-sm text-text-secondary">No low stock alerts</p>
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
             border-border

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
                        src={product.images?.[1]?.url || "/placeholder.webp"}
                        alt={product.name}
                        className="
    h-14
    w-14

    rounded-2xl

    border
   border-border

    object-cover
  "
                      />

                      <div>
                        <h3 className="font-semibold">{product.name}</h3>

                        <p
                          className="
                    mt-1
                    text-sm
                    text-text-secondary
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
