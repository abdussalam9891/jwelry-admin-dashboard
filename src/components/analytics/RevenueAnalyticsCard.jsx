

import { useState } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { TrendingUp } from "lucide-react";

import DateRangeFilter from "@/components/DateRangeFilter";

import { getRevenueAnalytics } from "@/services/analyticsService";

export default function RevenueAnalyticsCard({
  dashboard,
}) {
  const [revenueRange, setRevenueRange] = useState({
    from: "",
    to: "",
  });

  const [revenueData, setRevenueData] =
    useState(null);

    const [isFiltered, setIsFiltered] = useState(false);

  const fetchRevenueAnalytics =
    async () => {
      try {
        const data =
          await getRevenueAnalytics({
            from: revenueRange.from,
            to: revenueRange.to,
          });

        setRevenueData(data);
    setIsFiltered(true);
      } catch (error) {
        console.error(error);
      }
    };

  const applyQuickRange = (days) => {
    const end = new Date();

    const start = new Date();

    start.setDate(
      end.getDate() - days
    );

    setRevenueRange({
      from: format(
        start,
        "yyyy-MM-dd"
      ),
      to: format(
        end,
        "yyyy-MM-dd"
      ),
    });
  };

  const handleApply = () => {
    fetchRevenueAnalytics();
  };

  const handleReset = () => {
    setRevenueRange({
      from: "",
      to: "",
    });

    setRevenueData(null);
  setIsFiltered(false);
  };


  const chartData = isFiltered
  ? revenueData?.revenueChart || []
  : dashboard?.revenueChart || [];

  return (
    <div className="grid grid-cols-1 gap-6">
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
          <div>
            <p className="text-sm text-text-secondary">
              Revenue Analytics
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-bold
                text-text-primary
              "
            >
              Revenue Growth
            </h2>

            <div
              className="
                mt-3
                flex
                items-center
                gap-4
              "
            >
              <p
                className="
                  text-3xl
                  font-bold
                  text-text-primary
                "
              >
                ₹
                {revenueData?.totalRevenue ??
                  dashboard?.totalRevenue?.toLocaleString(
                    "en-IN"
                  )}
              </p>


            </div>
          </div>

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
              onClick={() =>
                applyQuickRange(7)
              }
            >
              7D
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                applyQuickRange(30)
              }
            >
              30D
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                applyQuickRange(90)
              }
            >
              90D
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                applyQuickRange(365)
              }
            >
              1Y
            </Button>

            <DateRangeFilter
              range={revenueRange}
              setRange={
                setRevenueRange
              }
              onApply={
                handleApply
              }
              onReset={
                handleReset
              }
            />
          </div>
        </div>

   <div className="h-[360px]">
  {!chartData.length ? (
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
        <TrendingUp
          size={28}
          className="text-text-secondary"
        />
      </div>

      <h3 className="text-lg font-semibold text-text-primary">
        No revenue data found
      </h3>

      <p className="mt-2 max-w-sm text-sm text-text-secondary">
        No revenue was generated during the selected date range.
      </p>
    </div>
  ) : (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <AreaChart
       data={chartData}
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
          tickFormatter={(v) =>
            `₹${v / 1000}k`
          }
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
            {item.label}
          </p>

          <p className="mt-2 text-sm text-text-secondary">
            Revenue: ₹
            {item.revenue?.toLocaleString(
              "en-IN"
            )}
          </p>

          <p className="text-sm text-text-secondary">
            Orders: {item.orders}
          </p>
        </div>
      );
    }

    return null;
  }}
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
  )}
</div>
      </div>
    </div>
  );
}
