import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  getDashboardAnalytics,
} from "@/services/analyticsService";
import {
  TrendingUp,
  IndianRupee,
  ShoppingCart,
  Users,
  ArrowLeft,
  RotateCcw,
  Percent,
  Download,
  Sparkles,
  Package,
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






export default function AnalyticsPage() {


  const navigate = useNavigate();



 const [dashboard, setDashboard] = useState(null);
const [loading, setLoading] = useState(true);

const [filters, setFilters] = useState({
  revenue: { from: "", to: "" },
  orders: { from: "", to: "" },
  products: { from: "", to: "" },
  customers: { from: "", to: "" },
  payments: { from: "", to: "" },
  geo: { from: "", to: "" },
});


useEffect(() => {
  fetchDashboard();
}, []);




const fetchDashboard =
  async () => {
    try {
      setLoading(true);

      const data =
        await getDashboardAnalytics();

      console.log(
        "analytics:",
        data
      );

      setDashboard(data);
    } catch (error) {
      console.error(
        "Analytics fetch failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };





  const kpis = dashboard
  ? [
      {
        title: "Revenue",
        value: `₹${dashboard.totalRevenue?.toLocaleString("en-IN") || 0}`,
        growth: null,
        icon: IndianRupee,
        iconBg: "#FDECEC",
        iconColor: "#B91C1C",
      },

      {
        title: "Orders",
        value: dashboard.totalOrders || 0,
        growth: null,
        icon: ShoppingCart,
        iconBg: "#EEF4FF",
        iconColor: "#1D4ED8",
      },

      {
        title: "Customers",
        value:
          dashboard.customerAnalytics?.newCustomers || 0,
        growth: null,
        icon: Users,
        iconBg: "#ECFDF5",
        iconColor: "#047857",
      },

      {
        title: "Low Stock",
        value:
          dashboard.inventoryHealth?.lowStock || 0,
        growth: null,
        icon: Package,
        iconBg: "#FFF7ED",
        iconColor: "#C2410C",
      },
    ]
  : [];



  const statusColors = {
  DELIVERED: "#0F9F61",
  SHIPPED: "#2563EB",
  PLACED: "#D97706",
  CANCELLED: "#E11D48",
  CONFIRMED: "#7C3AED",
};



if (loading) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <p className="text-sm text-text-secondary">
        Loading analytics...
      </p>
    </div>
  );
}

  return (
    <div className="space-y-6 p-6">

        <div>
                <Link
                  to="/admin/dashboard"
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
                  Back
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
                  Analytics
                </h1>


              </div>
{/* HERO */}
<div
  className="
    relative
    overflow-hidden
    rounded-[32px]
    border
    border-border
    bg-surface
    px-8
    py-10
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
      absolute
      -left-16
      bottom-0
      h-44
      w-44
      rounded-full
      bg-brand/5
      blur-3xl
    "
  />

  <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
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
          bg-surface-secondary
          px-4
          py-2
          text-xs
          font-medium
          tracking-wide
          text-brand
        "
      >

        Live Analytics
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
        Business Intelligence
      </h1>

      <p
        className="
          mt-4
          max-w-2xl
          text-sm
          leading-relaxed
          text-text-secondary
          md:text-base
        "
      >
        Unified operational visibility across revenue, customer growth,
        order flow, inventory health, and payment performance.
      </p>
    </div>

    {/* RIGHT */}
    <div
      className="
        grid
        grid-cols-2
        gap-4
        sm:grid-cols-3
      "
    >
      <div
        className="
          rounded-2xl
          border
          border-border
          bg-surface-secondary
          px-5
          py-4
        "
      >
        <p className="text-[11px] uppercase tracking-wide text-text-secondary">
          Status
        </p>
        <p className="mt-2 text-sm font-semibold text-text-primary">
          Live Sync
        </p>
      </div>

      <div
        className="
          rounded-2xl
          border
          border-border
          bg-surface-secondary
          px-5
          py-4
        "
      >
        <p className="text-[11px] uppercase tracking-wide text-text-secondary">
          Scope
        </p>
        <p className="mt-2 text-sm font-semibold text-text-primary">
          Full Store
        </p>
      </div>

      <div
        className="
          rounded-2xl
          border
          border-border
          bg-surface-secondary
          px-5
          py-4
        "
      >
        <p className="text-[11px] uppercase tracking-wide text-text-secondary">
          Updated
        </p>
        <p className="mt-2 text-sm font-semibold text-text-primary">
          Real-time
        </p>
      </div>
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
    xl:grid-cols-4
    2xl:grid-cols-4
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

            {item.growth !== null && (
              <p
                className={`mt-2 text-sm font-medium ${
                  item.growth < 0
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {item.growth}%
              </p>
            )}
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
            <ResponsiveContainer
    width="100%"
    height="100%"
    minWidth={0}
    minHeight={300}
  >
    <AreaChart
      data={
        dashboard?.revenueChart || []
      }
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
  {dashboard?.smartInsights?.map(
    (item, index) => (
      <div
        key={index}
        className="
          rounded-2xl
          border
          border-border
          bg-surface-secondary
          px-4
          py-4
        "
      >
        <p className="text-base font-semibold text-text-primary">
          {item}
        </p>
      </div>
    )
  )}
</div>
        </div>
      </div>

      {/* FUNNEL + DONUT */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">


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
          data={dashboard?.orderStatus || []}
          innerRadius={70}
          outerRadius={110}
          paddingAngle={4}
          dataKey="value"
        >
          {dashboard?.orderStatus?.map(
            (entry) => (
              <Cell
                key={entry.name}
                fill={
                  statusColors[
                    entry.name
                  ] || "#CBD5E1"
                }
              />
            )
          )}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  <div className="mt-6 grid grid-cols-2 gap-4">
    {dashboard?.orderStatus?.map(
      (item) => (
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
            {item.value}
          </p>
        </div>
      )
    )}
  </div>
</div>

      </div>






{/* TOP PRODUCTS */}
<div className="overflow-hidden rounded-[32px] border border-border bg-surface shadow-sm">
  <div className="border-b border-border p-6">
    <h2 className="text-xl font-semibold text-text-primary">
      Top Products
    </h2>
    <p className="mt-1 text-sm text-text-secondary">
      Best performing products by revenue.
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
            "Stock",
          ].map((heading) => (
            <th
              key={heading}
              className="px-6 py-5 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary"
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {dashboard?.topProducts?.map((product) => (
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
              ₹{product.revenue?.toLocaleString("en-IN")}
            </td>

            <td className="px-6 py-5 text-text-primary">
              {product.sold}
            </td>

            <td className="px-6 py-5 text-text-primary">
              {product.stock}
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
<div className="rounded-[32px] border border-border bg-surface p-6">
  <h2 className="text-xl font-semibold text-text-primary">
    Customer Analytics
  </h2>

  <div className="mt-6 grid grid-cols-2 gap-4">
    {[
      [
        "New Customers",
        dashboard?.customerAnalytics?.newCustomers || 0,
      ],
      [
        "Repeat Customers",
        dashboard?.customerAnalytics?.repeatCustomers || 0,
      ],
    ].map(([label, value]) => (
      <div
        key={label}
        className="rounded-2xl border border-border bg-surface-secondary p-4"
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
<div className="rounded-[32px] border border-border bg-surface p-6">
  <h2 className="text-xl font-semibold text-text-primary">
    Payment Analytics
  </h2>

  <div className="mt-8 space-y-5">
    {dashboard?.paymentAnalytics?.map((item) => (
      <div key={item.name}>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-text-primary">
            {item.name}
          </span>

          <span className="font-medium text-text-primary">
            {item.value}%
          </span>
        </div>

        <div className="h-3 rounded-full bg-surface-secondary">
          <div
            className="h-3 rounded-full bg-brand"
            style={{
              width: `${item.value}%`,
            }}
          />
        </div>
      </div>
    ))}
  </div>
</div>


      </div>

      {/* INVENTORY + GEO */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
     {/* INVENTORY */}
<div className="rounded-[32px] border border-border bg-surface p-6">
  <h2 className="text-xl font-semibold text-text-primary">
    Inventory Health
  </h2>

  <div className="mt-6 grid grid-cols-2 gap-4">
    {[
      [
        "Healthy Stock",
        dashboard?.inventoryHealth?.healthyStock || 0,
      ],
      [
        "Low Stock",
        dashboard?.inventoryHealth?.lowStock || 0,
      ],
      [
        "Out Of Stock",
        dashboard?.inventoryHealth?.outOfStock || 0,
      ],
      [
        "Total Products",
        dashboard?.inventoryHealth?.totalProducts || 0,
      ],
    ].map(([label, value]) => (
      <div
        key={label}
        className="rounded-2xl border border-border bg-surface-secondary p-5"
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
<div className="rounded-[32px] border border-border bg-surface p-6">
  <h2 className="text-xl font-semibold text-text-primary">
    Geographic Revenue
  </h2>

  <div className="mt-6 space-y-4">
    {dashboard?.geoRevenue?.map((item) => (
      <div
        key={item.city}
        className="flex items-center justify-between rounded-2xl border border-border bg-surface-secondary px-5 py-4"
      >
        <span className="font-medium text-text-primary">
          {item.city}
        </span>

        <span className="font-semibold text-brand">
          ₹{item.revenue?.toLocaleString("en-IN")}
        </span>
      </div>
    ))}
  </div>
</div>
      </div>

   {/* SMART INSIGHTS */}
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

  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    {dashboard?.smartInsights?.map(
      (item, index) => (
        <div
          key={index}
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
      )
    )}
  </div>
</div>

    {/* DRILLDOWNS */}
<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
  {[
    {
      label: "Revenue Reports",
      path: "/admin/reports/revenue",
    },
    {
      label: "Orders",
      path: "/admin/orders",
    },
    {
      label: "Customers",
      path: "/admin/customers",
    },
    {
      label: "Inventory",
      path: "/admin/products",
    },
    {
      label: "Payments",
      path: "/admin/payments",
    },
  ].map((item) => (
    <button
      key={item.label}
      onClick={() =>
        navigate(item.path)
      }
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
      View {item.label}
    </button>
  ))}
</div>

       </div>





  );
}
