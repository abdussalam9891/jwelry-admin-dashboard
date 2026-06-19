import {
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import {
  ArrowLeft,
} from "lucide-react";

import {
  createCoupon,
  updateCoupon,
} from "../services/couponService";

import CouponBasicInfo from "./coupons/CouponBasicInfo";

import CouponDiscountSettings from "./coupons/CouponDiscountSettings";

import CouponUsageRules from "./coupons/CouponUsageRules";

import CouponSchedule from "./coupons/CouponSchedule";

import CouponActions from "./coupons/CouponActions";

export default function CouponForm({
  initialData = null,
  mode = "create",
}) {

  const navigate =
    useNavigate();

  const isEditMode =
    mode === "edit";




const location =
  useLocation();
  const [loading, setLoading] =
    useState(false);
    const [errors, setErrors] =
  useState({});

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
        "",

      minOrderAmount:
        initialData?.minOrderAmount ||
        "",

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



    useEffect(() => {

  if (
    location.state
      ?.duplicatedCoupon
  ) {

    setFormData(
      (prev) => ({
        ...prev,

        ...location.state
          .duplicatedCoupon,
      })
    );

  }

}, [location.state]);




  const numericFields = [
  "discountValue",
  "minOrderAmount",
  "maxDiscountAmount",
  "usageLimit",
  "perUserLimit",
];

const handleChange = (e) => {

  const {
    name,
    value,
    type,
    checked,
  } = e.target;

  /* NUMERIC FIELDS */

  if (
    numericFields.includes(name)
  ) {

    if (
      value !== "" &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

  }

  /* COUPON CODE */

  let finalValue = value;

  if (name === "code") {

    finalValue = value
      .toUpperCase()
      .replace(/\s/g, "");

  }

  setFormData((prev) => ({
    ...prev,

    [name]:
      type === "checkbox"
        ? checked
        : finalValue,
  }));

};



    const validateForm = () => {

  const newErrors = {};

  /* CODE */

  if (!formData.code.trim()) {

    newErrors.code =
      "Coupon code is required";

  } else if (
    formData.code.length < 3
  ) {

    newErrors.code =
      "Minimum 3 characters";

  } else if (
    formData.code.length > 20
  ) {

    newErrors.code =
      "Maximum 20 characters";

  } else if (
    /\s/.test(formData.code)
  ) {

    newErrors.code =
      "Spaces are not allowed";

  }

  /* NAME */

  if (!formData.name.trim()) {

    newErrors.name =
      "Coupon name is required";

  } else if (
    formData.name.length < 3
  ) {

    newErrors.name =
      "Minimum 3 characters";

  } else if (
    formData.name.length > 50
  ) {

    newErrors.name =
      "Maximum 50 characters";

  }

  /* DESCRIPTION */

  if (
    formData.description &&
    formData.description.length > 300
  ) {

    newErrors.description =
      "Maximum 300 characters";

  }

  /* DISCOUNT VALUE */

  if (
    formData.discountType !==
      "FREE_SHIPPING"
  ) {

    if (
      formData.discountValue === ""
    ) {

      newErrors.discountValue =
        "Discount value required";

    }

    if (
      Number(
        formData.discountValue
      ) <= 0
    ) {

      newErrors.discountValue =
        "Must be greater than 0";

    }

    if (
      formData.discountType ===
        "PERCENTAGE" &&
      Number(
        formData.discountValue
      ) > 100
    ) {

      newErrors.discountValue =
        "Cannot exceed 100%";

    }

  }

  /* MIN ORDER */

  if (
    formData.minOrderAmount !==
      "" &&
    Number(
      formData.minOrderAmount
    ) < 0
  ) {

    newErrors.minOrderAmount =
      "Cannot be negative";

  }

  /* MAX DISCOUNT */

  if (
    formData.maxDiscountAmount !==
      "" &&
    Number(
      formData.maxDiscountAmount
    ) < 0
  ) {

    newErrors.maxDiscountAmount =
      "Cannot be negative";

  }

  /* USAGE LIMIT */

  if (
    formData.usageLimit !== "" &&
    Number(
      formData.usageLimit
    ) < 1
  ) {

    newErrors.usageLimit =
      "Must be at least 1";

  }

  /* PER USER LIMIT */

  if (
    Number(
      formData.perUserLimit
    ) < 1
  ) {

    newErrors.perUserLimit =
      "Must be at least 1";

  }

  /* DATE CHECK */

  if (
    formData.startsAt &&
    formData.expiresAt
  ) {

    if (
      new Date(
        formData.startsAt
      ) >=
      new Date(
        formData.expiresAt
      )
    ) {

      newErrors.expiresAt =
        "Expiry must be after start date";

    }

  }

  setErrors(
    newErrors
  );

  return (
    Object.keys(
      newErrors
    ).length === 0
  );
};



  const handleSubmit =
  async (e) => {

    e.preventDefault();

    if (
      !validateForm()
    ) {
      return;
    }

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
    <div
      className="
        min-h-screen
        bg-bg
        p-6
      "
    >
      {/* HEADER */}

      <div
        className="
          mb-8

          flex
          flex-col
          gap-4

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>

          <div
            className="
              mb-8
            "
          >
            <Link
              to="/admin/coupons"
              className="
                group
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

                text-text-secondary

                shadow-sm

                transition-all
                duration-200

                hover:border-[#6B1A2A]/20
                hover:text-brand
                hover:shadow-md
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8

                  items-center
                  justify-center

                  rounded-xl

                  bg-[#F8EEF1]

                  text-brand

                  transition-transform
                  duration-200

                  group-hover:-translate-x-0.5
                "
              >
                <ArrowLeft
                  size={16}
                />
              </div>

              <span>
                Back to
                Coupons
              </span>
            </Link>
          </div>



          <h1
            className="
              mt-4

              text-4xl
              font-bold
              tracking-tight

              text-text-primary
            "
          >
            {isEditMode
              ? "Edit Coupon"
              : "Create Coupon"}
          </h1>

          <p
            className="
              mt-2

              max-w-2xl

              text-sm
              leading-relaxed

              text-text-secondary
            "
          >
            Create and
            manage discount
            campaigns,
            promotional
            offers and
            checkout
            incentives.
          </p>

        </div>

      </div>

      {/* FORM */}

      <form
        onSubmit={
          handleSubmit
        }
        className="
          grid
          grid-cols-1
          items-start
          gap-6

          xl:grid-cols-3
        "
      >

        {/* LEFT */}

        <div
          className="
            xl:col-span-2

            space-y-6
          "
        >

         <CouponBasicInfo
  formData={formData}
  handleChange={handleChange}
  errors={errors}
/>

         <CouponDiscountSettings
  formData={formData}
  handleChange={handleChange}
  errors={errors}
/>

        </div>

        {/* RIGHT */}

        <div
          className="
            sticky
            top-28

            h-fit

            space-y-6
          "
        >

         <CouponUsageRules
  formData={formData}
  handleChange={handleChange}
  errors={errors}
/>

 <CouponSchedule
  formData={formData}
  setFormData={setFormData}
  errors={errors}
/>

          <CouponActions
            loading={
              loading
            }
            isEditMode={
              isEditMode
            }
          />

        </div>

      </form>

    </div>
  );
}
