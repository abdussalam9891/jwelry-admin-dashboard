import {
  getCategoryAnalytics,
  getDashboardAnalytics,
  getGeoAnalytics,
  getMaterialAnalytics,
  getProductsAnalytics,
  getRevenueAnalytics,
} from "@/services/analyticsService";
import { useEffect, useState } from "react";

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import { format } from "date-fns";

import {
  IndianRupee,
  Package,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AnalyticsPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const [revenueRange, setRevenueRange] = useState({
    from: "",
    to: "",
  });
  const [revenueData, setRevenueData] = useState(null);

  const [materialRange, setMaterialRange] = useState({
    from: "",
    to: "",
  });

  const [categoryRange, setCategoryRange] = useState({
    from: "",
    to: "",
  });

  const [productsRange, setProductsRange] = useState({
    from: "",
    to: "",
  });

  const [materialAnalytics, setMaterialAnalytics] = useState([]);

  const [categoryAnalytics, setCategoryAnalytics] = useState([]);

  const [topProducts, setTopProducts] = useState([]);

  const [geoRange, setGeoRange] = useState({
    from: "",
    to: "",
  });

  const [geoRevenue, setGeoRevenue] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const data = await getDashboardAnalytics();

      console.log("analytics:", data);

      setDashboard(data);

      setMaterialAnalytics(data.materialAnalytics || []);

      setCategoryAnalytics(data.categoryAnalytics || []);

      setTopProducts(data.topProducts || []);
    } catch (error) {
      console.error("Analytics fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenueAnalytics = async () => {
    try {
      const data = await getRevenueAnalytics({
        from: revenueRange.from,
        to: revenueRange.to,
      });

      setRevenueData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopProducts = async () => {
    try {
      const data = await getProductsAnalytics({
        startDate: productsRange.from,
        endDate: productsRange.to,
      });
      setTopProducts(data.topProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategoryAnalytics = async () => {
    try {
      const data = await getCategoryAnalytics({
        startDate: categoryRange.from,
        endDate: categoryRange.to,
      });

      setCategoryAnalytics(data.categoryAnalytics);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMaterialAnalytics = async () => {
    try {
      const data = await getMaterialAnalytics({
        startDate: materialRange.from,
        endDate: materialRange.to,
      });

      setMaterialAnalytics(data.materialAnalytics);
    } catch (error) {
      console.error(error);
    }
  };

  const applyQuickRange = (days) => {
    const end = new Date();

    const start = new Date();

    start.setDate(end.getDate() - days);

    setRevenueRange({
      from: format(start, "yyyy-MM-dd"),
      to: format(end, "yyyy-MM-dd"),
    });
  };

  const fetchGeoRevenue = async () => {
    try {
      const data = await getGeoAnalytics({
        from: geoRange.from,

        to: geoRange.to,
      });

      setGeoRevenue(data.geoRevenue || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (revenueRange.from && revenueRange.to) {
      fetchRevenueAnalytics();
    }
  }, [revenueRange]);

  useEffect(() => {
    if (materialRange.from && materialRange.to) {
      fetchMaterialAnalytics();
    }
  }, [materialRange]);

  useEffect(() => {
    if (categoryRange.from && categoryRange.to) {
      fetchCategoryAnalytics();
    }
  }, [categoryRange]);

  useEffect(() => {
    if (productsRange.from && productsRange.to) {
      fetchTopProducts();
    }
  }, [productsRange]);

  useEffect(() => {
    if (geoRange.from && geoRange.to) {
      fetchGeoRevenue();
    }
  }, [geoRange]);

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
          value: dashboard.customerAnalytics?.newCustomers || 0,
          growth: null,
          icon: Users,
          iconBg: "#ECFDF5",
          iconColor: "#047857",
        },

        {
          title: "Low Stock",
          value: dashboard.inventoryHealth?.lowStock || 0,
          growth: null,
          icon: Package,
          iconBg: "#FFF7ED",
          iconColor: "#C2410C",
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-text-secondary">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
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

      {/* BUSINESS HEALTH */}

      <div
        className="
    rounded-[32px]
    border
    border-border
    bg-surface
    p-8
    shadow-sm
  "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Business Health Score</p>

            <h2 className="mt-3 text-5xl font-bold text-text-primary">
              {dashboard?.healthScore?.score || 0}
              <span className="text-2xl text-text-secondary">/100</span>
            </h2>

            <p className="mt-2 text-lg font-medium text-brand">
              {dashboard?.healthScore?.status}
            </p>
          </div>

          <div
            className="
        flex
        h-24
        w-24
        items-center
        justify-center
        rounded-full
        bg-brand/10
      "
          >
            <TrendingUp size={36} className="text-brand" />
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
                        item.growth < 0 ? "text-red-500" : "text-green-600"
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

      {/* REVENUE   */}
      <div className="grid grid-cols-1 gap-6">
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
          <div
            className="
    mb-8
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
              <p className="text-sm text-text-secondary">Revenue Analytics</p>

              <h2 className="mt-2 text-2xl font-bold text-text-primary">
                Revenue Growth
              </h2>

              <div className="mt-3 flex items-center gap-4">
                <p className="text-3xl font-bold text-text-primary">
                  ₹
                  {revenueData?.totalRevenue ??
                    dashboard?.totalRevenue.toLocaleString("en-IN")}
                </p>

                <span
                  className="
          rounded-full
          bg-[#EEF8F1]
          px-3
          py-1
          text-xs
          font-semibold
          text-[#0F9F61]
        "
                >
                  +18.4%
                </span>
              </div>
            </div>

            {/* RIGHT */}

            <div
              className="
      flex
      flex-wrap
      items-center
      gap-2
    "
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => applyQuickRange(7)}
              >
                7D
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => applyQuickRange(30)}
              >
                30D
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => applyQuickRange(90)}
              >
                90D
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => applyQuickRange(365)}
              >
                1Y
              </Button>

              {/* FROM */}

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="
            h-10
            w-[150px]
            justify-start
            rounded-xl
          "
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {revenueRange.from
                      ? format(new Date(revenueRange.from), "dd MMM yyyy")
                      : "From Date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      revenueRange.from
                        ? new Date(revenueRange.from)
                        : undefined
                    }
                    onSelect={(date) =>
                      setRevenueRange((prev) => ({
                        ...prev,
                        from: date ? format(date, "yyyy-MM-dd") : "",
                      }))
                    }
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
                    disabled={!revenueRange.from}
                    className="
            h-10
            w-[150px]
            justify-start
            rounded-xl
          "
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {revenueRange.to
                      ? format(new Date(revenueRange.to), "dd MMM yyyy")
                      : "To Date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      revenueRange.to ? new Date(revenueRange.to) : undefined
                    }
                    onSelect={(date) =>
                      setRevenueRange((prev) => ({
                        ...prev,
                        to: date ? format(date, "yyyy-MM-dd") : "",
                      }))
                    }
                    disabled={(date) =>
                      date > new Date() ||
                      (revenueRange.from && date < new Date(revenueRange.from))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
                  revenueData?.revenueChart || dashboard?.revenueChart || []
                }
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F1ECEE"
                />

                <XAxis dataKey="label" axisLine={false} tickLine={false} />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${v / 1000}k`}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                    background: "#fff",
                  }}
                  formatter={(value) => [
                    `₹${value.toLocaleString("en-IN")}`,
                    "Revenue",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6B1A2A"
                  fill="#F8EEF1"
                  fillOpacity={1}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* MATERIAL + CATEGORY ANALYTICS */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* MATERIAL */}

        <div
          className="
      rounded-[32px]
      border
      border-border
      bg-surface
      p-6
    "
        >
          <div
            className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
          >
            <h2 className="text-xl font-semibold text-text-primary">
              Revenue by Material
            </h2>

            <div className="flex flex-wrap gap-2">
              {/* FROM */}

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="
                h-10
                w-[150px]
                justify-start
                rounded-xl
                border-border
                bg-surface
                text-left
                text-sm
              "
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {materialRange.from
                      ? format(new Date(materialRange.from), "dd MMM yyyy")
                      : "From Date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      materialRange.from
                        ? new Date(materialRange.from)
                        : undefined
                    }
                    onSelect={(date) =>
                      setMaterialRange((prev) => ({
                        ...prev,
                        from: format(date, "yyyy-MM-dd"),
                      }))
                    }
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
                    disabled={!materialRange.from}
                    className="
                h-10
                w-[150px]
                justify-start
                rounded-xl
                border-border
                bg-surface
                text-left
                text-sm
              "
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {materialRange.to
                      ? format(new Date(materialRange.to), "dd MMM yyyy")
                      : "To Date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      materialRange.to ? new Date(materialRange.to) : undefined
                    }
                    onSelect={(date) =>
                      setMaterialRange((prev) => ({
                        ...prev,
                        to: format(date, "yyyy-MM-dd"),
                      }))
                    }
                    disabled={(date) =>
                      date > new Date() ||
                      (materialRange.from &&
                        date < new Date(materialRange.from))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={materialAnalytics}
                  dataKey="revenue"
                  nameKey="material"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {materialAnalytics?.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        ["#6B1A2A", "#A13A4E", "#D47B8A", "#E8B7C1", "#F3D9DF"][
                          index % 5
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CATEGORY */}

        <div
          className="
      rounded-[32px]
      border
      border-border
      bg-surface
      p-6
    "
        >
          <div
            className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
          >
            <h2 className="text-xl font-semibold text-text-primary">
              Category Performance
            </h2>

            <div className="flex flex-wrap gap-2">
              {/* FROM */}

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="
                h-10
                w-[150px]
                justify-start
                rounded-xl
                border-border
                bg-surface
                text-left
                text-sm
              "
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {categoryRange.from
                      ? format(new Date(categoryRange.from), "dd MMM yyyy")
                      : "From Date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      categoryRange.from
                        ? new Date(categoryRange.from)
                        : undefined
                    }
                    onSelect={(date) =>
                      setCategoryRange((prev) => ({
                        ...prev,
                        from: format(date, "yyyy-MM-dd"),
                      }))
                    }
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
                    disabled={!categoryRange.from}
                    className="
                h-10
                w-[150px]
                justify-start
                rounded-xl
                border-border
                bg-surface
                text-left
                text-sm
              "
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {categoryRange.to
                      ? format(new Date(categoryRange.to), "dd MMM yyyy")
                      : "To Date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      categoryRange.to ? new Date(categoryRange.to) : undefined
                    }
                    onSelect={(date) =>
                      setCategoryRange((prev) => ({
                        ...prev,
                        to: format(date, "yyyy-MM-dd"),
                      }))
                    }
                    disabled={(date) =>
                      date > new Date() ||
                      (categoryRange.from &&
                        date < new Date(categoryRange.from))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryAnalytics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />

                <XAxis type="number" axisLine={false} tickLine={false} />

                <YAxis
                  type="category"
                  dataKey="category"
                  width={110}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar dataKey="revenue" fill="#6B1A2A" radius={[0, 12, 12, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TOP PRODUCTS */}
      <div className="overflow-hidden rounded-[32px] border border-border bg-surface shadow-sm">
        <div
          className="
    flex
    flex-col
    gap-4
    px-6
    py-5
    border-b
    border-border

    lg:flex-row
    lg:items-center
    lg:justify-between
  "
        >
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Top Products
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              Best performing products by revenue.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* FROM */}

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="
          h-10
          w-[150px]
          justify-start
          rounded-xl
          border-border
          bg-surface
          text-left
          text-sm
        "
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {productsRange.from
                    ? format(new Date(productsRange.from), "dd MMM yyyy")
                    : "From Date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    productsRange.from
                      ? new Date(productsRange.from)
                      : undefined
                  }
                  onSelect={(date) =>
                    setProductsRange((prev) => ({
                      ...prev,
                      from: format(date, "yyyy-MM-dd"),
                    }))
                  }
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
                  disabled={!productsRange.from}
                  className="
          h-10
          w-[150px]
          justify-start
          rounded-xl
          border-border
          bg-surface
          text-left
          text-sm
        "
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {productsRange.to
                    ? format(new Date(productsRange.to), "dd MMM yyyy")
                    : "To Date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={
                    productsRange.to ? new Date(productsRange.to) : undefined
                  }
                  onSelect={(date) =>
                    setProductsRange((prev) => ({
                      ...prev,
                      to: format(date, "yyyy-MM-dd"),
                    }))
                  }
                  disabled={(date) =>
                    date > new Date() ||
                    (productsRange.from && date < new Date(productsRange.from))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-surface-secondary">
              <tr>
                {["Product", "SKU", "Revenue", "Units Sold", "Stock"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-6 py-5 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {topProducts?.map((product) => (
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

      <div
        className="
    rounded-[32px]
    border
    border-border
    bg-surface
    p-6
  "
      >
        <h2
          className="
      text-xl
      font-semibold
      text-text-primary
    "
        >
          Material Performance
        </h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 text-left">Material</th>

                <th className="py-3 text-left">Revenue</th>

                <th className="py-3 text-left">Units Sold</th>
              </tr>
            </thead>

            <tbody>
              {materialAnalytics?.map((item) => (
                <tr key={item.material} className="border-b border-border">
                  <td className="py-4">{item.material}</td>

                  <td className="py-4 font-semibold">
                    ₹{Math.round(item.revenue).toLocaleString()}
                  </td>

                  <td className="py-4">{item.sold}</td>
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
                  <span className="text-text-primary">{item.name}</span>

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
              ["Healthy Stock", dashboard?.inventoryHealth?.healthyStock || 0],
              ["Low Stock", dashboard?.inventoryHealth?.lowStock || 0],
              ["Out Of Stock", dashboard?.inventoryHealth?.outOfStock || 0],
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

        <div
          className="
    rounded-[32px]
    border
    border-border
    bg-surface
    p-6
  "
        >
          <div
            className="
      flex
      flex-col
      gap-4

      lg:flex-row
      lg:items-center
      lg:justify-between
    "
          >
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                Geographic Revenue
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Revenue distribution across locations
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* FROM */}

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="
              h-10
              w-full
              sm:w-[150px]
              justify-start
              rounded-xl
            "
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {geoRange.from
                      ? format(new Date(geoRange.from), "dd MMM yyyy")
                      : "From Date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      geoRange.from ? new Date(geoRange.from) : undefined
                    }
                    onSelect={(date) =>
                      setGeoRange((prev) => ({
                        ...prev,
                        from: date ? format(date, "yyyy-MM-dd") : "",
                      }))
                    }
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
                    disabled={!geoRange.from}
                    className="
              h-10
              w-full
              sm:w-[150px]
              justify-start
              rounded-xl
            "
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {geoRange.to
                      ? format(new Date(geoRange.to), "dd MMM yyyy")
                      : "To Date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={geoRange.to ? new Date(geoRange.to) : undefined}
                    onSelect={(date) =>
                      setGeoRange((prev) => ({
                        ...prev,
                        to: date ? format(date, "yyyy-MM-dd") : "",
                      }))
                    }
                    disabled={(date) =>
                      date > new Date() ||
                      (geoRange.from && date < new Date(geoRange.from))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {(() => {
            const data =
              geoRevenue.length > 0 ? geoRevenue : dashboard?.geoRevenue || [];

            const maxRevenue = data[0]?.revenue || 1;

            if (!data.length) {
              return (
                <div className="py-12 text-center text-text-secondary">
                  No revenue data available
                </div>
              );
            }

            return (
              <div className="mt-8 space-y-5">
                {data.map((item) => {
                  const width = (item.revenue / maxRevenue) * 100;

                  return (
                    <div key={`${item.city}-${item.state}`}>
                      <div
                        className="
                  mb-2
                  flex
                  items-start
                  justify-between
                  gap-4
                "
                      >
                        <div>
                          <p
                            className="
                      font-semibold
                      text-text-primary
                    "
                          >
                            {item.city}
                          </p>

                          <p
                            className="
                      text-xs
                      uppercase
                      tracking-wide
                      text-text-secondary
                    "
                          >
                            {item.state}
                            {" • "}
                            {item.orders}
                            {" orders"}
                          </p>
                        </div>

                        <span
                          className="
                    whitespace-nowrap
                    font-bold
                    text-[#6B1A2A]
                  "
                        >
                          ₹{item.revenue?.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div
                        className="
                  h-2.5
                  overflow-hidden
                  rounded-full
                  bg-border
                "
                      >
                        <div
                          className="
                    h-full
                    rounded-full
                    bg-[#6B1A2A]
                    transition-all
                    duration-500
                  "
                          style={{
                            width: `${width}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
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
          {dashboard?.smartInsights?.map((item, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
