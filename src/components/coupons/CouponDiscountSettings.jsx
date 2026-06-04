import { IndianRupee, Percent, Truck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CouponDiscountSettings({
  formData,
  handleChange,
  errors,
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
        <Percent size={18} />
        Discount Settings
      </h2>

      <div
        className={`
          grid
          grid-cols-1
          gap-5

          ${
            formData.discountType === "FREE_SHIPPING"
              ? "md:grid-cols-1"
              : "md:grid-cols-2"
          }
        `}
      >
        {/* DISCOUNT TYPE */}

       <div>
  <label
    className="
      mb-2
      block
      text-sm
      font-medium
    "
  >
    Discount Type
  </label>

  <Select
    value={
      formData.discountType
    }
    onValueChange={(
      value
    ) =>
      handleChange({
        target: {
          name:
            "discountType",
          value,
        },
      })
    }
  >
    <SelectTrigger
      className="
        h-12
        rounded-2xl
        border-border
        bg-bg
         px-4
      "
    >
      <SelectValue placeholder="Select discount type" />
    </SelectTrigger>

    <SelectContent>

      <SelectItem value="PERCENTAGE">
  <div
    className="
      flex
      items-center
      gap-2
    "
  >
    <Percent size={14} />
    Percentage Discount
  </div>
</SelectItem>

<SelectItem value="FIXED">
  <div
    className="
      flex
      items-center
      gap-2
    "
  >
    <IndianRupee size={14} />
    Fixed Amount
  </div>
</SelectItem>

<SelectItem value="FREE_SHIPPING">
  <div
    className="
      flex
      items-center
      gap-2
    "
  >
    <Truck size={14} />
    Free Shipping
  </div>
</SelectItem>

    </SelectContent>
  </Select>

  <p
    className="
      mt-2
      text-xs
      text-text-secondary
    "
  >
    Percentage discounts are capped at 100%.
  </p>
</div>
        {/* MIN ORDER */}

        <div>
          <label className="block mb-2 text-sm font-medium">
            Minimum Order
          </label>

          <input
            type="text"
            inputMode="numeric"
            name="minOrderAmount"
            value={formData.minOrderAmount}
            onChange={handleChange}
            placeholder="1000"
            className={`
              w-full
              rounded-2xl
              bg-bg
              px-4
              h-12

              ${
                errors.minOrderAmount
                  ? "border border-red-500"
                  : "border border-border"
              }
            `}
          />

          {errors.minOrderAmount && (
            <p
              className="
                mt-1
                text-xs
                text-red-500
              "
            >
              {errors.minOrderAmount}
            </p>
          )}
        </div>

        {/* HIDE FOR FREE SHIPPING */}

        {formData.discountType !== "FREE_SHIPPING" && (
          <>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Discount Value
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleChange}
                  placeholder={
                    formData.discountType === "PERCENTAGE" ? "10" : "500"
                  }
                  className={`
        w-full
        rounded-2xl
        bg-bg
        px-4
        h-12
        pr-12

        ${
          errors.discountValue
            ? "border border-red-500"
            : "border border-border"
        }
      `}
                />

                <div
                  className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2

        text-text-secondary
      "
                >
                  {formData.discountType === "PERCENTAGE" ? (
                    <Percent size={16} />
                  ) : (
                    <IndianRupee size={16} />
                  )}
                </div>
              </div>

              {errors.discountValue && (
                <p
                  className="
        mt-1
        text-xs
        text-red-500
      "
                >
                  {errors.discountValue}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Max Discount
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  name="maxDiscountAmount"
                  value={formData.maxDiscountAmount}
                  onChange={handleChange}
                  placeholder="500"
                  className={`
        w-full
        rounded-2xl
        bg-bg
        px-4
        h-12
        pr-12

        ${
          errors.maxDiscountAmount
            ? "border border-red-500"
            : "border border-border"
        }
      `}
                />

                <div
                  className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2

        text-text-secondary
      "
                >
                  <IndianRupee size={16} />
                </div>
              </div>

              {errors.maxDiscountAmount && (
                <p
                  className="
        mt-1
        text-xs
        text-red-500
      "
                >
                  {errors.maxDiscountAmount}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
