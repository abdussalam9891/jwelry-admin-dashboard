import { useState } from "react";

import DateRangeFilter from "@/components/DateRangeFilter";

import { getGeoAnalytics } from "@/services/analyticsService";

export default function GeoAnalyticsCard({
  dashboard,
}) {
  const [geoRange, setGeoRange] =
    useState({
      from: "",
      to: "",
    });

  const [geoRevenue, setGeoRevenue] =
    useState([]);

  const handleApply = async () => {
    try {
      const data =
        await getGeoAnalytics({
          from: geoRange.from,
          to: geoRange.to,
        });

      setGeoRevenue(
        data.geoRevenue || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setGeoRange({
      from: "",
      to: "",
    });

    setGeoRevenue([]);
  };

  const data =
    geoRevenue.length > 0
      ? geoRevenue
      : dashboard?.geoRevenue || [];

  const maxRevenue =
    data[0]?.revenue || 1;

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

        <DateRangeFilter
          range={geoRange}
          setRange={setGeoRange}
          onApply={handleApply}
          onReset={handleReset}
        />
      </div>

      {!data.length ? (
        <div className="py-12 text-center text-text-secondary">
          No revenue data available
        </div>
      ) : (
        <div className="mt-8 space-y-5">
          {data.map((item) => {
            const width =
              (item.revenue / maxRevenue) *
              100;

            return (
              <div
                key={`${item.city}-${item.state}`}
              >
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-text-primary">
                      {item.city}
                    </p>

                    <p className="text-xs uppercase tracking-wide text-text-secondary">
                      {item.state} • {item.orders} orders
                    </p>
                  </div>

                  <span className="font-bold text-[#6B1A2A]">
                    ₹
                    {item.revenue?.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-[#6B1A2A]"
                    style={{
                      width: `${width}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
