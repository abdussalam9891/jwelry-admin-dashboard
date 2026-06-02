import {
  useState,
} from "react";

import {
  createCoupon,
  updateCoupon,
} from "../services/couponService";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

export default function CouponForm({
  initialData = null,
  mode = "create",
}) {

  const navigate =
    useNavigate();

  const isEditMode =
    mode === "edit";

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      code:
        initialData?.code || "",

      name:
        initialData?.name || "",

      description:
        initialData?.description || "",

      discountType:
        initialData?.discountType ||
        "PERCENTAGE",

      discountValue:
        initialData?.discountValue ||
        0,

      minOrderAmount:
        initialData?.minOrderAmount ||
        0,

      maxDiscountAmount:
        initialData?.maxDiscountAmount ||
        "",

      usageLimit:
        initialData?.usageLimit ||
        "",

      perUserLimit:
        initialData?.perUserLimit ||
        1,

      firstOrderOnly:
        initialData?.firstOrderOnly ||
        false,

      isActive:
        initialData?.isActive ??
        true,

      startsAt:
        initialData?.startsAt
          ?.slice(0, 16) || "",

      expiresAt:
        initialData?.expiresAt
          ?.slice(0, 16) || "",
    });

  const handleChange = (
    e
  ) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData(
      (prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        if (isEditMode) {

          await updateCoupon(
            initialData._id,
            formData
          );

        } else {

          await createCoupon(
            formData
          );

        }

        navigate(
          "/admin/coupons"
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  return (
    <div className="min-h-screen bg-bg p-6">

      <div className="mb-8">

        <Link
          to="/admin/coupons"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-border
            bg-surface
            px-4
            py-2
          "
        >
          <ArrowLeft
            size={16}
          />
          Back to Coupons
        </Link>

        <h1
          className="
            mt-6
            text-4xl
            font-bold
          "
        >
          {isEditMode
            ? "Edit Coupon"
            : "Create Coupon"}
        </h1>

      </div>

     <form
  onSubmit={handleSubmit}
  className="max-w-5xl space-y-6"
>
  <div
    className="
      rounded-3xl
      border
      border-gray-200
      bg-white
      p-8
      shadow-sm
      space-y-6
    "
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label className="block mb-2 font-medium">
          Coupon Code
        </label>

        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
          "
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Coupon Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
          "
        />
      </div>

    </div>

    <div>
      <label className="block mb-2 font-medium">
        Description
      </label>

      <textarea
        rows={4}
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
        "
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label className="block mb-2 font-medium">
          Discount Type
        </label>

        <select
          name="discountType"
          value={formData.discountType}
          onChange={handleChange}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
          "
        >
          <option value="PERCENTAGE">
            Percentage
          </option>

          <option value="FIXED">
            Fixed
          </option>

          <option value="FREE_SHIPPING">
            Free Shipping
          </option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Discount Value
        </label>

        <input
          type="number"
          name="discountValue"
          value={formData.discountValue}
          onChange={handleChange}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
          "
        />
      </div>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label className="block mb-2 font-medium">
          Minimum Order Amount
        </label>

        <input
          type="number"
          name="minOrderAmount"
          value={formData.minOrderAmount}
          onChange={handleChange}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
          "
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Maximum Discount Amount
        </label>

        <input
          type="number"
          name="maxDiscountAmount"
          value={formData.maxDiscountAmount}
          onChange={handleChange}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
          "
        />
      </div>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label className="block mb-2 font-medium">
          Usage Limit
        </label>

        <input
          type="number"
          name="usageLimit"
          value={formData.usageLimit}
          onChange={handleChange}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
          "
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Per User Limit
        </label>

        <input
          type="number"
          name="perUserLimit"
          value={formData.perUserLimit}
          onChange={handleChange}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
          "
        />
      </div>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div>
        <label className="block mb-2 font-medium">
          Starts At
        </label>

        <input
          type="datetime-local"
          name="startsAt"
          value={formData.startsAt}
          onChange={handleChange}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
          "
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Expires At
        </label>

        <input
          type="datetime-local"
          name="expiresAt"
          value={formData.expiresAt}
          onChange={handleChange}
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
          "
        />
      </div>

    </div>

    <div className="flex flex-wrap gap-8">

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="firstOrderOnly"
          checked={formData.firstOrderOnly}
          onChange={handleChange}
        />

        <span>
          First Order Only
        </span>
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />

        <span>
          Active
        </span>
      </label>

    </div>

  </div>

  <button
    type="submit"
    disabled={loading}
    className="
      rounded-2xl
      bg-black
      px-6
      py-3
      text-white
      font-medium
    "
  >
    {loading
      ? "Saving..."
      : isEditMode
      ? "Update Coupon"
      : "Create Coupon"}
  </button>
</form>

    </div>
  );
}
