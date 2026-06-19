export default function CustomerAnalyticsCard({
  dashboard,
}) {
  return (
    <div className="rounded-[32px] border border-border bg-surface p-6">
      <h2 className="text-xl font-semibold text-text-primary">
        Customer Analytics
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {[
          [
            "New Customers",
            dashboard?.customerAnalytics?.newCustomers || 0,
          ],
          [
            "Repeat Customers",
            dashboard?.customerAnalytics?.repeatCustomers || 0,
          ],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-surface-secondary p-4"
          >
            <p className="text-xs uppercase tracking-wide text-text-secondary">
              {label}
            </p>

            <p className="mt-2 text-xl font-semibold text-text-primary">
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
