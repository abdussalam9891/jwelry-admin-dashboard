export default function PaymentAnalyticsCard({
  dashboard,
}) {
  return (
    <div className="rounded-[32px] border border-border bg-surface p-6">
      <h2 className="text-xl font-semibold text-text-primary">
        Payment Analytics
      </h2>

      <div className="mt-8 space-y-5">
        {dashboard?.paymentAnalytics?.map((item) => (
          <div key={item.name}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-text-primary">
                {item.name}
              </span>

              <span className="font-medium text-text-primary">
                {item.value}%
              </span>
            </div>

            <div className="h-3 rounded-full bg-surface-secondary">
              <div
                className="h-3 rounded-full bg-brand"
                style={{
                  width: `${item.value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
