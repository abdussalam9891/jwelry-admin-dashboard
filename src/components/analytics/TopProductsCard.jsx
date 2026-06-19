import { useState } from "react";

import DateRangeFilter from "@/components/DateRangeFilter";

import { getProductsAnalytics } from "@/services/analyticsService";

export default function TopProductsCard({
  dashboard,
}) {
  const [productsRange, setProductsRange] =
    useState({
      from: "",
      to: "",
    });

  const [topProducts, setTopProducts] =
    useState(
      dashboard?.topProducts || []
    );

  const handleApply = async () => {
    try {
      const data =
        await getProductsAnalytics({
          startDate:
            productsRange.from,
          endDate:
            productsRange.to,
        });

      setTopProducts(
        data.topProducts || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setProductsRange({
      from: "",
      to: "",
    });

    setTopProducts(
      dashboard?.topProducts || []
    );
  };

  return (
    <div
      className="
        overflow-hidden
        rounded-[32px]
        border
        border-border
        bg-surface
        shadow-sm
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          border-b
          border-border
          px-6
          py-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <h2
            className="
              text-xl
              font-semibold
              text-text-primary
            "
          >
            Top Products
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-text-secondary
            "
          >
            Best performing products by
            revenue.
          </p>
        </div>

        <DateRangeFilter
          range={productsRange}
          setRange={
            setProductsRange
          }
          onApply={
            handleApply
          }
          onReset={
            handleReset
          }
        />
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
              ].map(
                (heading) => (
                  <th
                    key={heading}
                    className="
                      px-6
                      py-5
                      text-left
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-text-secondary
                    "
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {topProducts?.map(
              (product) => (
                <tr
                  key={
                    product.sku
                  }
                  className="
                    border-b
                    border-border
                    hover:bg-surface-secondary
                  "
                >
                  <td
                    className="
                      px-6
                      py-5
                      font-medium
                      text-text-primary
                    "
                  >
                    {
                      product.name
                    }
                  </td>

                  <td
                    className="
                      px-6
                      py-5
                      text-text-secondary
                    "
                  >
                    {
                      product.sku
                    }
                  </td>

                  <td
                    className="
                      px-6
                      py-5
                      font-semibold
                      text-text-primary
                    "
                  >
                    ₹
                    {product.revenue?.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td
                    className="
                      px-6
                      py-5
                      text-text-primary
                    "
                  >
                    {
                      product.sold
                    }
                  </td>

                  <td
                    className="
                      px-6
                      py-5
                      text-text-primary
                    "
                  >
                    {
                      product.stock
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
