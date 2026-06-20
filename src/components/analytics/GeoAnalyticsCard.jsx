import { useState } from "react";

import DateRangeFilter from "@/components/DateRangeFilter";

import { getGeoAnalytics } from "@/services/analyticsService";

import { MapPinned } from "lucide-react";

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
    const [isFiltered, setIsFiltered] = useState(false);

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
      setIsFiltered(true);
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
    setIsFiltered(false);
  };

 const data = isFiltered
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
        <div className="flex flex-col items-center py-16 text-center">
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
    <MapPinned
      size={28}
      className="text-text-secondary"
    />
  </div>

  <h3 className="text-lg font-semibold text-text-primary">
    No revenue data found
  </h3>

  <p className="mt-2 max-w-sm text-sm text-text-secondary">
    No orders were recorded for the selected date range, so geographic revenue insights are unavailable.
  </p>
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
