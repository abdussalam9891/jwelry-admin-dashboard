import { useState } from "react";

import {
  Pie,
  PieChart,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { PieChart as PieChartIcon } from "lucide-react";

import DateRangeFilter from "@/components/DateRangeFilter";

import { getMaterialAnalytics } from "@/services/analyticsService";

const COLORS = [
  "#6B1A2A",
  "#A13A4E",
  "#D47B8A",
  "#E8B7C1",
  "#F3D9DF",
];

export default function MaterialAnalyticsCard({
  dashboard,
}) {
  const [materialRange, setMaterialRange] =
    useState({
      from: "",
      to: "",
    });

  const [materialAnalytics, setMaterialAnalytics] =
    useState(
      dashboard?.materialAnalytics || []
    );

  const handleApply = async () => {
    try {
      const data =
        await getMaterialAnalytics({
          startDate:
            materialRange.from,
          endDate:
            materialRange.to,
        });

      setMaterialAnalytics(
        data.materialAnalytics || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setMaterialRange({
      from: "",
      to: "",
    });

    setMaterialAnalytics(
      dashboard?.materialAnalytics || []
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
          Revenue by Material
        </h2>

        <DateRangeFilter
          range={materialRange}
          setRange={
            setMaterialRange
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
  {materialAnalytics?.length === 0 ? (
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
        <PieChartIcon
          size={28}
          className="text-text-secondary"
        />
      </div>

      <h3 className="text-lg font-semibold text-text-primary">
        No material data found
      </h3>

      <p className="mt-2 max-w-sm text-sm text-text-secondary">
        No material-wise sales were recorded for the selected date range.
      </p>
    </div>
  ) : (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <PieChart>
        <Pie
          data={materialAnalytics}
          dataKey="revenue"
          nameKey="material"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={4}
        >
          {materialAnalytics.map(
            (_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index %
                      COLORS.length
                  ]
                }
              />
            )
          )}
        </Pie>

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
            {item.material}
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
      </PieChart>
    </ResponsiveContainer>
  )}
</div>
    </div>
  );
}
