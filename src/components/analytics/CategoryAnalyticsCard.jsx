import { useState } from "react";

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
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={
              categoryAnalytics
            }
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

            <Tooltip />

            <Bar
              dataKey="revenue"
              fill="#6B1A2A"
              radius={[
                0,
                12,
                12,
                0,
              ]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
