import { BadgeCheck, ShieldCheck, UserPlus, Users } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function CouponUsageRules({ formData, handleChange, errors }) {
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
      <h2
        className="
          mb-5

          flex
          items-center
          gap-2

          text-lg
          font-semibold
        "
      >
        <ShieldCheck size={18} />
        Usage Rules
      </h2>

      <div className="space-y-5">
        {/* USAGE LIMIT */}

        <div>
          <label
            className="
              mb-2
              flex
              items-center
              gap-2

              text-sm
              font-medium
            "
          >
            <Users size={14} />
            Usage Limit
          </label>

          <input
           type="text"
inputMode="numeric"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleChange}
            placeholder="100"
            className={`
              w-full
              rounded-2xl
              bg-bg
              px-4
              py-3

              ${
                errors?.usageLimit
                  ? "border border-red-500"
                  : "border border-border"
              }
            `}
          />

          {errors?.usageLimit && (
            <p
              className="
                mt-1
                text-xs
                text-red-500
              "
            >
              {errors.usageLimit}
            </p>
          )}
        </div>

        {/* PER USER LIMIT */}

        <div>
          <label
            className="
              mb-2
              flex
              items-center
              gap-2

              text-sm
              font-medium
            "
          >
            <UserPlus size={14} />
            Per User Limit
          </label>

          <input
            type="text"
            inputMode="numeric"
            name="perUserLimit"
            value={formData.perUserLimit}
            onChange={handleChange}
            placeholder="1"
            className={`
              w-full
              rounded-2xl
              bg-bg
              px-4
              py-3

              ${
                errors?.perUserLimit
                  ? "border border-red-500"
                  : "border border-border"
              }
            `}
          />

          {errors?.perUserLimit && (
            <p
              className="
                mt-1
                text-xs
                text-red-500
              "
            >
              {errors.perUserLimit}
            </p>
          )}
        </div>

        {/* FIRST ORDER */}

        <label
          className="
            flex
            cursor-pointer
            items-center
            justify-between

            rounded-2xl
            border
            border-border

            p-4
          "
        >
          <div>
            <p
              className="
                font-medium
                text-text-primary
              "
            >
              First Order Only
            </p>

            <p
              className="
                mt-1
                text-xs
                text-text-secondary
              "
            >
              Restrict coupon to a customer's first purchase.
            </p>
          </div>

         <Checkbox
  checked={
    formData.firstOrderOnly
  }
  onCheckedChange={(
    checked
  ) =>
    handleChange({
      target: {
        name:
          "firstOrderOnly",
        type: "checkbox",
        checked,
      },
    })
  }
/>
        </label>

        {/* ACTIVE */}

        <label
          className="
            flex
            cursor-pointer
            items-center
            justify-between

            rounded-2xl
            border
            border-border

            p-4
          "
        >
          <div>
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <BadgeCheck size={16} />

              <p
                className="
                  font-medium
                  text-text-primary
                "
              >
                Active Coupon
              </p>
            </div>

            <p
              className="
                mt-1
                text-xs
                text-text-secondary
              "
            >
              Enable or disable this coupon.
            </p>
          </div>

         <Checkbox
  checked={
    formData.isActive
  }
  onCheckedChange={(
    checked
  ) =>
    handleChange({
      target: {
        name: "isActive",
        type: "checkbox",
        checked,
      },
    })
  }
/>
        </label>
      </div>
    </div>
  );
}
