import {
  Pencil,
  BarChart3,
  Ban,
} from "lucide-react";

import { useState } from "react";

import {
  Link,
} from "react-router-dom";
import {
  toggleCouponStatus,
} from "../../services/couponService";
import ConfirmModal from "../../components/ConfirmModal";

export default function CouponCard({
   coupon,
  onRefresh,
}) {

  const isExpired =
    coupon.expiresAt &&
    new Date(
      coupon.expiresAt
    ) < new Date();

    const [
  showDisableModal,
  setShowDisableModal,
] = useState(false);

const [
  disabling,
  setDisabling,
] = useState(false);

  const statusClass =
    isExpired
      ? "bg-red-50 text-red-600"
      : coupon.isActive
      ? "bg-green-50 text-green-600"
      : "bg-gray-100 text-gray-600";

  const statusText =
    isExpired
      ? "Expired"
      : coupon.isActive
      ? "Active"
      : "Inactive";



const handleToggleStatus =
  async () => {

    try {

      setDisabling(true);

      await toggleCouponStatus(
        coupon._id
      );

      setShowDisableModal(
        false
      );

      onRefresh?.();

    } catch (error) {

      console.error(error);

    } finally {

      setDisabling(false);

    }

  };







  return (
    <div
      className="
        group

        rounded-3xl

        border
        border-border

        bg-surface

        p-6

        shadow-sm

        transition-all
        duration-200

        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>

          <div
            className="
              inline-flex
              items-center

              rounded-full

              bg-[#F8EEF1]

              px-3
              py-1

              text-xs
              font-semibold

              tracking-wider

              text-brand
            "
          >
            {coupon.code}
          </div>

          <h3
            className="
              mt-3

              text-lg
              font-semibold

              text-text-primary
            "
          >
            {coupon.name}
          </h3>

          {coupon.description && (
            <p
              className="
                mt-2

                line-clamp-2

                text-sm

                text-text-secondary
              "
            >
              {coupon.description}
            </p>
          )}

        </div>

        <span
          className={`
            rounded-full

            px-3
            py-1.5

            text-xs
            font-semibold

            ${statusClass}
          `}
        >
          {statusText}
        </span>
      </div>

      {/* METRICS */}

      <div
        className="
          mt-6

          grid
          grid-cols-2
          gap-5

          md:grid-cols-4
        "
      >
        <div>
          <p
            className="
              text-xs
              text-text-secondary
            "
          >
            Discount
          </p>

          <p
            className="
              mt-1

              text-2xl
              font-bold

              text-brand
            "
          >
            {coupon.discountType ===
            "PERCENTAGE"
              ? `${coupon.discountValue}%`
              : coupon.discountType ===
                "FREE_SHIPPING"
              ? "Free"
              : `₹${coupon.discountValue}`}
          </p>
        </div>

        <div>
          <p
            className="
              text-xs
              text-text-secondary
            "
          >
            Min Order
          </p>

          <p
            className="
              mt-1
              font-semibold
            "
          >
            ₹
            {coupon.minOrderAmount ||
              0}
          </p>
        </div>

        <div>
          <p
            className="
              text-xs
              text-text-secondary
            "
          >
            Usage
          </p>

          <p
            className="
              mt-1
              font-semibold
            "
          >
            {coupon.usageCount}
            /
            {coupon.usageLimit ||
              "∞"}
          </p>
        </div>

        <div>
          <p
            className="
              text-xs
              text-text-secondary
            "
          >
            Expires
          </p>

          <p
            className="
              mt-1
              font-semibold
            "
          >
            {coupon.expiresAt
              ? new Date(
                  coupon.expiresAt
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )
              : "Never"}
          </p>
        </div>
      </div>

      {/* ACTIONS */}

      <div
        className="
          mt-6

          flex
          flex-wrap

          gap-2
        "
      >
        <Link
          to={`/admin/coupons/${coupon._id}/edit`}
          className="
            inline-flex
            items-center
            gap-2

            rounded-2xl

            border
            border-border

            bg-surface-secondary

            px-4
            py-2.5

            text-sm
            font-medium

            transition

            hover:bg-surface
          "
        >
          <Pencil size={16} />

          Edit
        </Link>

     <Link
  to={`/admin/coupons/${coupon._id}/analytics`}
  className="
    inline-flex
    items-center
    gap-2

    rounded-2xl

    border
    border-border

    bg-surface-secondary

    px-4
    py-2.5

    text-sm
    font-medium
  "
>
  <BarChart3
    size={16}
  />

  Analytics
</Link>

        <button
  type="button"
  onClick={() =>
    setShowDisableModal(
      true
    )
  }
  className={`
    inline-flex
    items-center
    gap-2

    rounded-2xl

    px-4
    py-2.5

    text-sm
    font-medium

    transition

    ${
      coupon.isActive
        ? `
          border
          border-red-200
          bg-red-50
          text-red-600
          hover:bg-red-100
        `
        : `
          border
          border-green-200
          bg-green-50
          text-green-600
          hover:bg-green-100
        `
    }
  `}
>
  <Ban size={16} />

  {coupon.isActive
    ? "Disable"
    : "Enable"}
</button>

      </div>






<ConfirmModal
  open={showDisableModal}
  onClose={() =>
    setShowDisableModal(
      false
    )
  }
  onConfirm={
    handleToggleStatus
  }
  loading={disabling}
  title={
    coupon.isActive
      ? "Disable Coupon"
      : "Enable Coupon"
  }
  description={
    coupon.isActive
      ? `Disable ${coupon.code}? Customers won't be able to use it.`
      : `Enable ${coupon.code}? Customers will be able to use it again.`
  }
  confirmText={
    coupon.isActive
      ? "Disable"
      : "Enable"
  }
/>




    </div>
  );
}
