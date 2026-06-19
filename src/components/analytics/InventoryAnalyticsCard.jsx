export default function InventoryAnalyticsCard({
  dashboard,
}) {
  return (
    <div className="rounded-[32px] border border-border bg-surface p-6">
      <h2 className="text-xl font-semibold text-text-primary">
        Inventory Health
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {[
          [
            "Healthy Stock",
            dashboard?.inventoryHealth?.healthyStock || 0,
          ],
          [
            "Low Stock",
            dashboard?.inventoryHealth?.lowStock || 0,
          ],
          [
            "Out Of Stock",
            dashboard?.inventoryHealth?.outOfStock || 0,
          ],
          [
            "Total Products",
            dashboard?.inventoryHealth?.totalProducts || 0,
          ],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-surface-secondary p-5"
          >
            <p className="text-xs uppercase tracking-wide text-text-secondary">
              {label}
            </p>

            <p className="mt-3 text-2xl font-bold text-text-primary">
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
