export default function MaterialPerformanceCard({
  materialAnalytics,
}) {
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
              <th className="py-3 text-left">
                Material
              </th>

              <th className="py-3 text-left">
                Revenue
              </th>

              <th className="py-3 text-left">
                Units Sold
              </th>
            </tr>
          </thead>

          <tbody>
            {materialAnalytics?.map(
              (item) => (
                <tr
                  key={
                    item.material
                  }
                  className="border-b border-border"
                >
                  <td className="py-4">
                    {
                      item.material
                    }
                  </td>

                  <td
                    className="
                      py-4
                      font-semibold
                    "
                  >
                    ₹
                    {Math.round(
                      item.revenue
                    ).toLocaleString()}
                  </td>

                  <td className="py-4">
                    {item.sold}
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
