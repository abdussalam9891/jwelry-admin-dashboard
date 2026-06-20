import { useState } from "react";

import { BarChart3 } from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import DateRangeFilter from "@/components/DateRangeFilter";

import { getCategoryAnalytics } from "@/services/analyticsService";

export default function CategoryAnalyticsCard({
  dashboard,
}) {
  const [categoryRange, setCategoryRange] =
    useState({
      from: "",
      to: "",
    });

  const [categoryAnalytics, setCategoryAnalytics] =
    useState(
      dashboard?.categoryAnalytics ||
        []
    );

  const handleApply = async () => {
    try {
      const data =
        await getCategoryAnalytics({
          startDate:
            categoryRange.from,
          endDate:
            categoryRange.to,
        });

      setCategoryAnalytics(
        data.categoryAnalytics ||
          []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setCategoryRange({
      from: "",
      to: "",
    });

    setCategoryAnalytics(
      dashboard?.categoryAnalytics ||
        []
    );
  };

  return (
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
        <h2
          className="
            text-xl
            font-semibold
            text-text-primary
          "
        >
          Category Performance
        </h2>

        <DateRangeFilter
          range={categoryRange}
          setRange={
            setCategoryRange
          }
          onApply={
            handleApply
          }
          onReset={
            handleReset
          }
        />
      </div>

      <div className="mt-6 h-[320px]">
  {categoryAnalytics?.length === 0 ? (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div
        className="
          mb-4
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-surface-secondary
        "
      >
        <BarChart3
          size={28}
          className="text-text-secondary"
        />
      </div>

      <h3 className="text-lg font-semibold text-text-primary">
        No category data found
      </h3>

      <p className="mt-2 max-w-sm text-sm text-text-secondary">
        No category sales were recorded for the selected date range.
      </p>
    </div>
  ) : (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart
        data={categoryAnalytics}
        layout="vertical"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
        />

        <XAxis
          type="number"
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          type="category"
          dataKey="category"
          width={110}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
  content={({ active, payload }) => {
    if (
      active &&
      payload &&
      payload.length
    ) {
      const item =
        payload[0].payload;

      return (
        <div
          className="
            rounded-xl
            border
            border-border
            bg-surface
            p-3
            shadow-lg
          "
        >
          <p className="font-semibold text-text-primary">
            {item.category}
          </p>

          <div className="mt-2 space-y-1 text-sm">
            <p className="text-text-secondary">
              Revenue:{" "}
              <span className="font-medium text-text-primary">
                ₹
                {item.revenue?.toLocaleString(
                  "en-IN"
                )}
              </span>
            </p>

            <p className="text-text-secondary">
              Units Sold:{" "}
              <span className="font-medium text-text-primary">
                {item.sold}
              </span>
            </p>
          </div>
        </div>
      );
    }

    return null;
  }}
/>

        <Bar
          dataKey="revenue"
          fill="#6B1A2A"
          radius={[0, 12, 12, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )}
</div>
    </div>
  );
}
