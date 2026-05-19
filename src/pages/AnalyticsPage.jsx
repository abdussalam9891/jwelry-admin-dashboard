import { useState } from "react";
import {
  TrendingUp,
  IndianRupee,
  ShoppingCart,
  Users,
  RotateCcw,
  Percent,
  Download,
  Sparkles,
} from "lucide-react";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

/* ---------------- MOCK DATA ---------------- */

const kpis = [
  {
    title: "Revenue",
    value: "₹4.2L",
    growth: "+18%",
    icon: IndianRupee,
    iconBg: "#F8EEF1",
    iconColor: "#6B1A2A",
  },
  {
    title: "Orders",
    value: "1,248",
    growth: "+9%",
    icon: ShoppingCart,
    iconBg: "#EEF6FF",
    iconColor: "#2563EB",
  },
  {
    title: "Customers",
    value: "320",
    growth: "+11%",
    icon: Users,
    iconBg: "#EEF8F1",
    iconColor: "#0F9F61",
  },
  {
    title: "AOV",
    value: "₹1,540",
    growth: "+4%",
    icon: TrendingUp,
    iconBg: "#FFF5E8",
    iconColor: "#D97706",
  },
  {
    title: "Refund Rate",
    value: "1.8%",
    growth: "-2%",
    icon: RotateCcw,
    iconBg: "#FFF1F2",
    iconColor: "#E11D48",
  },
  {
    title: "Conversion",
    value: "3.4%",
    growth: "+0.8%",
    icon: Percent,
    iconBg: "#F3F0FF",
    iconColor: "#7C3AED",
  },
];

const revenueData = [
  { label: "Jan", revenue: 18000 },
  { label: "Feb", revenue: 24000 },
  { label: "Mar", revenue: 28000 },
  { label: "Apr", revenue: 21000 },
  { label: "May", revenue: 35000 },
  { label: "Jun", revenue: 42000 },
  { label: "Jul", revenue: 39000 },
  { label: "Aug", revenue: 47000 },
];

const funnelData = [
  { value: 12400, name: "Visitors", fill: "#6B1A2A" },
  { value: 4200, name: "Add To Cart", fill: "#7C2435" },
  { value: 1800, name: "Checkout", fill: "#9B3C53" },
  { value: 1140, name: "Paid", fill: "#C15B78" },
];

const orderStatus = [
  { name: "Delivered", value: 48, color: "#0F9F61" },
  { name: "Shipped", value: 24, color: "#2563EB" },
  { name: "Placed", value: 14, color: "#D97706" },
  { name: "Cancelled", value: 9, color: "#E11D48" },
  { name: "Returned", value: 5, color: "#7C3AED" },
];

const insights = [
  { label: "Best Sales Day", value: "Friday" },
  { label: "Peak Hour", value: "7 PM" },
  { label: "Highest Order", value: "₹12,400" },
  { label: "Avg Order", value: "₹1,540" },
  { label: "Repeat Buyers", value: "42%" },
];

/* ---------------- COMPONENT ---------------- */

export default function AnalyticsPage() {
  const [range, setRange] = useState("12m");

  return (
    <div className="space-y-6 p-6">
      {/* HERO */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-border
          bg-surface
          p-8
          shadow-[0_10px_40px_rgba(0,0,0,0.04)]
        "
      >
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

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-[#E7D7DC]
                bg-surface/80
                px-4
                py-2
                text-xs
                font-medium
                text-brand
              "
            >
              Store Intelligence
            </div>

            <h1
              className="
                mt-5
                text-4xl
                font-bold
                tracking-tight
                text-text-primary
                md:text-5xl
              "
            >
              Analytics Overview
            </h1>

            <p
              className="
                mt-4
                max-w-2xl
                text-sm
                leading-relaxed
                text-text-secondary
              "
            >
              Deep operational insights across revenue, customers, orders and
              inventory.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger
                className="
                  h-12
                  w-[170px]
                  rounded-2xl
                  border-border
                  bg-surface-secondary
                "
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="12m">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>

            <Button
              className="
                rounded-2xl
                bg-brand
                px-5
                py-6
                text-white
                shadow-lg
                shadow-[#6B1A2A]/20
              "
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* KPI */}
      <div
        className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-6
        "
      >
        {kpis.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                rounded-[28px]
                border
                border-border
                bg-surface
                p-6
                shadow-sm
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                    {item.title}
                  </p>

                  <h2 className="mt-4 text-3xl font-bold text-text-primary">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-sm font-medium text-brand">
                    {item.growth}
                  </p>
                </div>

                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{
                    background: item.iconBg,
                    color: item.iconColor,
                  }}
                >
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* REVENUE + INSIGHTS */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* REVENUE */}
        <div
          className="
            xl:col-span-2
            rounded-[32px]
            border
            border-border
            bg-surface
            p-6
          "
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-brand">
                Revenue Analytics
              </p>

              <h2 className="mt-3 text-2xl font-bold text-text-primary">
                Revenue Growth
              </h2>
            </div>
          </div>

          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F1ECEE"
                />

                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${v / 1000}k`}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6B1A2A"
                  fill="#F8EEF1"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* INSIGHTS */}
        <div
          className="
            rounded-[32px]
            border
            border-border
            bg-surface
            p-6
          "
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-brand" />
            <h3 className="text-lg font-semibold text-text-primary">
              Quick Insights
            </h3>
          </div>

          <div className="mt-6 space-y-4">
            {insights.map((item) => (
              <div
                key={item.label}
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-surface-secondary
                  px-4
                  py-4
                "
              >
                <p className="text-xs uppercase tracking-wide text-text-secondary">
                  {item.label}
                </p>
                <p className="mt-2 text-base font-semibold text-text-primary">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FUNNEL + DONUT */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* FUNNEL */}
        <div
          className="
            rounded-[32px]
            border
            border-border
            bg-surface
            p-6
          "
        >
          <h3 className="text-xl font-semibold text-text-primary">
            Sales Funnel
          </h3>

          <div className="mt-8 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel dataKey="value" data={funnelData}>
                  <LabelList position="right" fill="#111827" stroke="none" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ORDER STATUS */}
        <div
          className="
            rounded-[32px]
            border
            border-border
            bg-surface
            p-6
          "
        >
          <h3 className="text-xl font-semibold text-text-primary">
            Order Status
          </h3>

          <div className="mt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatus}
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {orderStatus.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {orderStatus.map((item) => (
              <div
                key={item.name}
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-surface-secondary
                  px-4
                  py-3
                "
              >
                <p className="text-xs uppercase tracking-wide text-text-secondary">
                  {item.name}
                </p>

                <p className="mt-2 text-lg font-semibold text-text-primary">
                  {item.value}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>







      {/* TOP PRODUCTS */}
      <div
        className="
          overflow-hidden
          rounded-[32px]
          border
          border-border
          bg-surface
          shadow-sm
        "
      >
        <div className="border-b border-border p-6">
          <h2 className="text-xl font-semibold text-text-primary">
            Top Products
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Best performing inventory by revenue and units sold.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-surface-secondary">
              <tr>
                {[
                  "Product",
                  "SKU",
                  "Revenue",
                  "Units Sold",
                  "Return %",
                  "Stock",
                  "Trend",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="
                      px-6
                      py-5
                      text-left
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-text-secondary
                    "
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {[
                {
                  name: "Diamond Ring",
                  sku: "RNG-001",
                  revenue: "₹92,000",
                  sold: 120,
                  returnRate: "2%",
                  stock: 18,
                  trend: "+14%",
                },
                {
                  name: "Gold Bracelet",
                  sku: "BRC-011",
                  revenue: "₹74,500",
                  sold: 84,
                  returnRate: "1.2%",
                  stock: 9,
                  trend: "+8%",
                },
                {
                  name: "Silver Necklace",
                  sku: "NCK-087",
                  revenue: "₹41,000",
                  sold: 51,
                  returnRate: "3%",
                  stock: 23,
                  trend: "-2%",
                },
              ].map((product) => (
                <tr
                  key={product.sku}
                  className="border-b border-border hover:bg-surface-secondary"
                >
                  <td className="px-6 py-5 font-medium text-text-primary">
                    {product.name}
                  </td>

                  <td className="px-6 py-5 text-text-secondary">
                    {product.sku}
                  </td>

                  <td className="px-6 py-5 font-semibold text-text-primary">
                    {product.revenue}
                  </td>

                  <td className="px-6 py-5 text-text-primary">
                    {product.sold}
                  </td>

                  <td className="px-6 py-5 text-text-primary">
                    {product.returnRate}
                  </td>

                  <td className="px-6 py-5 text-text-primary">
                    {product.stock}
                  </td>

                  <td
                    className={`px-6 py-5 font-semibold ${
                      product.trend.includes("-")
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {product.trend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOMER + PAYMENT */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* CUSTOMER */}
        <div
          className="
            rounded-[32px]
            border
            border-border
            bg-surface
            p-6
          "
        >
          <h2 className="text-xl font-semibold text-text-primary">
            Customer Analytics
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              ["New Customers", "142"],
              ["Returning", "78"],
              ["Repeat Purchase", "38%"],
              ["Lifetime Value", "₹5,420"],
              ["Churn", "4.2%"],
              ["Top Spender", "₹42k"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-surface-secondary
                  p-4
                "
              >
                <p className="text-xs uppercase tracking-wide text-text-secondary">
                  {label}
                </p>
                <p className="mt-2 text-xl font-semibold text-text-primary">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PAYMENT */}
        <div
          className="
            rounded-[32px]
            border
            border-border
            bg-surface
            p-6
          "
        >
          <h2 className="text-xl font-semibold text-text-primary">
            Payment Analytics
          </h2>

          <div className="mt-8 space-y-5">
            {[
              ["UPI", 72],
              ["Card", 18],
              ["COD", 8],
              ["Net Banking", 2],
            ].map(([name, value]) => (
              <div key={name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-text-primary">{name}</span>
                  <span className="font-medium text-text-primary">
                    {value}%
                  </span>
                </div>

                <div className="h-3 rounded-full bg-surface-secondary">
                  <div
                    className="h-3 rounded-full bg-brand"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["Success", "96%"],
              ["Failed", "2.1%"],
              ["Refunds", "1.8%"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-surface-secondary
                  p-4
                  text-center
                "
              >
                <p className="text-xs uppercase tracking-wide text-text-secondary">
                  {label}
                </p>
                <p className="mt-2 font-semibold text-text-primary">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INVENTORY + GEO */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* INVENTORY */}
        <div
          className="
            rounded-[32px]
            border
            border-border
            bg-surface
            p-6
          "
        >
          <h2 className="text-xl font-semibold text-text-primary">
            Inventory Health
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              ["Healthy Stock", "148"],
              ["Low Stock", "12"],
              ["Out Of Stock", "4"],
              ["Overstocked", "8"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-surface-secondary
                  p-5
                "
              >
                <p className="text-xs uppercase tracking-wide text-text-secondary">
                  {label}
                </p>
                <p className="mt-3 text-2xl font-bold text-text-primary">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* GEO */}
        <div
          className="
            rounded-[32px]
            border
            border-border
            bg-surface
            p-6
          "
        >
          <h2 className="text-xl font-semibold text-text-primary">
            Geographic Revenue
          </h2>

          <div className="mt-6 space-y-4">
            {[
              ["Mumbai", "₹1.2L"],
              ["Delhi", "₹94k"],
              ["Bangalore", "₹88k"],
              ["Kolkata", "₹42k"],
            ].map(([city, revenue]) => (
              <div
                key={city}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-border
                  bg-surface-secondary
                  px-5
                  py-4
                "
              >
                <span className="font-medium text-text-primary">{city}</span>
                <span className="font-semibold text-brand">{revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI INSIGHTS */}
      <div
        className="
          rounded-[32px]
          border
          border-border
          bg-surface
          p-6
        "
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-brand" />
          <h2 className="text-xl font-semibold text-text-primary">
            Smart Insights
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            "Revenue up 18% MoM",
            "Bracelets drive 42% of sales",
            "COD failures 3x UPI",
            "2 products near stockout",
            "Returning customers up 12%",
          ].map((item) => (
            <div
              key={item}
              className="
                rounded-2xl
                border
                border-border
                bg-surface-secondary
                p-5
                text-sm
                font-medium
                text-text-primary
              "
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* DRILLDOWNS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
        {[
          "Revenue Reports",
          "Orders",
          "Customers",
          "Inventory",
          "Refund Analytics",
        ].map((item) => (
          <button
            key={item}
            className="
              rounded-[28px]
              border
              border-border
              bg-surface
              p-6
              text-left
              font-semibold
              text-text-primary
              shadow-sm
              transition
              hover:bg-surface-secondary
            "
          >
            View {item}
          </button>
        ))}
      </div>

       </div>





  );
}
