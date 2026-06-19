import {
  CalendarDays,
  Clock3,
} from "lucide-react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function CouponSchedule({
  formData,
  setFormData,
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
        <CalendarDays size={18} />

        Schedule
      </h2>

      <div className="space-y-5">

        {/* START DATE */}

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
            <Clock3 size={14} />

            Starts At
          </label>

          <DatePicker
            selected={
              formData.startsAt
                ? new Date(
                    formData.startsAt
                  )
                : null
            }
            onChange={(date) =>
              setFormData(
                (prev) => ({
                  ...prev,
                  startsAt: date,
                })
              )
            }
            showTimeSelect
            dateFormat="dd MMM yyyy h:mm aa"
            placeholderText="Select start date"
            minDate={new Date()}
            className={`
              w-full
              rounded-2xl
              bg-bg
              px-4
              py-3

              ${
                errors?.startsAt
                  ? "border border-red-500"
                  : "border border-border"
              }
            `}
          />

          {errors?.startsAt && (
            <p
              className="
                mt-1
                text-xs
                text-red-500
              "
            >
              {errors.startsAt}
            </p>
          )}

          <p
            className="
              mt-2
              text-xs
              text-text-secondary
            "
          >
            Leave empty to make
            the coupon available
            immediately.
          </p>
        </div>

        {/* EXPIRES */}

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
            <CalendarDays
              size={14}
            />

            Expires At
          </label>

          <DatePicker
            selected={
              formData.expiresAt
                ? new Date(
                    formData.expiresAt
                  )
                : null
            }
            onChange={(date) =>
              setFormData(
                (prev) => ({
                  ...prev,
                  expiresAt: date,
                })
              )
            }
            showTimeSelect
            dateFormat="dd MMM yyyy h:mm aa"
            placeholderText="Select expiry date"
           minDate={
    formData.startsAt
      ? new Date(formData.startsAt)
      : new Date()
  }
            className={`
              w-full
              rounded-2xl
              bg-bg
              px-4
              py-3

              ${
                errors?.expiresAt
                  ? "border border-red-500"
                  : "border border-border"
              }
            `}
          />

          {errors?.expiresAt && (
            <p
              className="
                mt-1
                text-xs
                text-red-500
              "
            >
              {errors.expiresAt}
            </p>
          )}

          <p
            className="
              mt-2
              text-xs
              text-text-secondary
            "
          >
            Must be later than
            the start date.
          </p>
        </div>

      </div>
    </div>
  );
}
