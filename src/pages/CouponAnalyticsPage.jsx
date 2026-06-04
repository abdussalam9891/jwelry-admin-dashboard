import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  ArrowLeft,
  Ticket,
  Users,
  IndianRupee,
  BarChart3,
} from "lucide-react";

import {
  getCouponStats,
} from "../services/couponService";

export default function CouponAnalyticsPage() {

  const { id } =
    useParams();

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    stats,
    setStats,
  ] = useState(null);

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const data =
            await getCouponStats(
              id
            );

          setStats(data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }

      };

    fetchStats();

  }, [id]);

  if (loading) {

    return (
      <div className="p-6">
        Loading analytics...
      </div>
    );

  }

  return (
    <div
      className="
        min-h-screen
        bg-bg
        p-6
      "
    >
      {/* HEADER */}

      <div className="mb-8">

        <Link
          to="/admin/coupons"
          className="
            inline-flex
            items-center
            gap-2

            rounded-2xl

            border
            border-border

            bg-surface

            px-4
            py-2.5

            text-sm
            font-medium
          "
        >
          <ArrowLeft
            size={16}
          />

          Back to Coupons
        </Link>

        <div className="mt-6">

          <div
            className="
              inline-flex
              items-center

              rounded-full

              bg-[#F8EEF1]

              px-4
              py-2

              text-xs
              font-medium

              text-brand
            "
          >
            Coupon Analytics
          </div>

          <h1
            className="
              mt-4

              text-4xl
              font-bold
            "
          >
            {stats.couponCode}
          </h1>

          <p
            className="
              mt-2

              text-text-secondary
            "
          >
            Performance and
            redemption analytics
            for this coupon.
          </p>

        </div>

      </div>

      {/* STATS */}

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
          title="Usage Count"
          value={
            stats.usageCount
          }
        />

        <StatCard
          icon={Users}
          title="Redemptions"
          value={
            stats.redemptionCount
          }
        />

        <StatCard
          icon={IndianRupee}
          title="Discount Given"
          value={`₹${stats.totalDiscountGiven}`}
        />

        <StatCard
          icon={BarChart3}
          title="Performance"
          value={
            stats.redemptionCount >
            0
              ? "Active"
              : "No Usage"
          }
        />
      </div>

      {/* SUMMARY */}

      <div
        className="
          mt-8

          rounded-3xl

          border
          border-border

          bg-surface

          p-6
        "
      >
        <h2
          className="
            text-lg
            font-semibold
          "
        >
          Summary
        </h2>

        <p
          className="
            mt-3

            text-sm
            leading-relaxed

            text-text-secondary
          "
        >
          Coupon{" "}
          <strong>
            {
              stats.couponCode
            }
          </strong>{" "}
          has been redeemed{" "}
          <strong>
            {
              stats.redemptionCount
            }
          </strong>{" "}
          times and generated a
          total discount value
          of{" "}
          <strong>
            ₹
            {
              stats.totalDiscountGiven
            }
          </strong>
          .
        </p>
      </div>

    </div>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div
      className="
        rounded-3xl

        border
        border-border

        bg-surface

        p-6
      "
    >
      <Icon
        size={20}
        className="
          mb-4
          text-brand
        "
      />

      <p
        className="
          text-sm
          text-text-secondary
        "
      >
        {title}
      </p>

      <h3
        className="
          mt-2

          text-3xl
          font-bold
        "
      >
        {value}
      </h3>
    </div>
  );
}
