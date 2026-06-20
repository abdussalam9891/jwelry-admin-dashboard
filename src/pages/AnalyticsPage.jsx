import {getDashboardAnalytics} from "@/services/analyticsService";
import { useEffect, useState } from "react";

import RevenueAnalyticsCard
from "@/components/analytics/RevenueAnalyticsCard";
import MaterialAnalyticsCard
from "@/components/analytics/MaterialAnalyticsCard";

import CategoryAnalyticsCard
from "@/components/analytics/CategoryAnalyticsCard";

import TopProductsCard
from "@/components/analytics/TopProductsCard";



import CustomerAnalyticsCard from "@/components/analytics/CustomerAnalyticsCard";
import PaymentAnalyticsCard from "@/components/analytics/PaymentAnalyticsCard";
import InventoryAnalyticsCard from "@/components/analytics/InventoryAnalyticsCard";
import GeoAnalyticsCard from "@/components/analytics/GeoAnalyticsCard";
import SmartInsightsCard
from "@/components/analytics/SmartInsightsCard";
import {
  IndianRupee,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";



export default function AnalyticsPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const data = await getDashboardAnalytics();

      console.log("analytics:", data);

      setDashboard(data);


    } catch (error) {
      console.error("Analytics fetch failed:", error);
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
          value: dashboard.customerAnalytics?.recentCustomers.length || 0,
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
    <RevenueAnalyticsCard
  dashboard={dashboard}
/>

      {/* MATERIAL + CATEGORY ANALYTICS */}

     <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <MaterialAnalyticsCard
    dashboard={dashboard}
  />

  <CategoryAnalyticsCard
    dashboard={dashboard}
  />
</div>


   <TopProductsCard
  dashboard={dashboard}
/>

 

   <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <CustomerAnalyticsCard dashboard={dashboard} />
  <PaymentAnalyticsCard dashboard={dashboard} />
</div>

<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <InventoryAnalyticsCard dashboard={dashboard} />
  <GeoAnalyticsCard dashboard={dashboard} />
</div>

     <SmartInsightsCard
  dashboard={dashboard}
/>
    </div>
  );
}
