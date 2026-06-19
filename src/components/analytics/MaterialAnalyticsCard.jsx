import { useState } from "react";

import {
  Pie,
  PieChart,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={
                materialAnalytics
              }
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

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
