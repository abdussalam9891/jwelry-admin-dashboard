import {
  Ticket,
  BadgeCheck,
  Users,
  IndianRupee,
} from "lucide-react";

export default function CouponStats({
  coupons,
}) {

  const activeCoupons =
    coupons.filter(
      (coupon) =>
        coupon.isActive
    ).length;

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5

        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      <StatCard
        icon={Ticket}
        label="Total Coupons"
        value={coupons.length}
      />

      <StatCard
        icon={BadgeCheck}
        label="Active Coupons"
        value={activeCoupons}
      />

      <StatCard
        icon={Users}
        label="Redemptions"
        value={coupons.reduce(
          (sum, coupon) =>
            sum +
            coupon.usageCount,
          0
        )}
      />

      <StatCard
        icon={IndianRupee}
        label="Discount Campaigns"
        value={coupons.length}
      />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-surface
        p-5
      "
    >
      <Icon
        size={18}
        className="mb-3"
      />

      <p
        className="
          text-sm
          text-text-secondary
        "
      >
        {label}
      </p>

      <h3
        className="
          mt-1
          text-3xl
          font-bold
        "
      >
        {value}
      </h3>
    </div>
  );
}
