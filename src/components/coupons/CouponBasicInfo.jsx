export default function CouponBasicInfo({
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
          text-lg
          font-semibold
          text-text-primary
        "
      >
        Basic Information
      </h2>

      <div className="space-y-5">

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-text-secondary
            "
          >
            Coupon Code
          </label>

         <input
  type="text"
  name="code"
  value={formData.code}
  onChange={handleChange}
  placeholder="WELCOME10"
  className={`
    w-full
    rounded-2xl
    bg-bg
    px-4
    py-3

    ${
      errors.code
        ? "border border-red-500"
        : "border border-border"
    }
  `}
/>

{errors.code && (
  <p
    className="
      mt-1
      text-xs
      text-red-500
    "
  >
    {errors.code}
  </p>
)}
        </div>

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-text-secondary
            "
          >
           {errors.name && (
  <p
    className="
      mt-1
      text-xs
      text-red-500
    "
  >
    {errors.name}
  </p>
)}
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Welcome Offer"
            className="
              w-full
              rounded-2xl
              border
              border-border
              bg-bg
              px-4
              py-3
            "
          />
        </div>

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-text-secondary
            "
          >
           {errors.description && (
  <p
    className="
      mt-1
      text-xs
      text-red-500
    "
  >
    {errors.description}
  </p>
)}
          </label>

          <textarea
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="10% off on first order"
            className="
              w-full
              rounded-2xl
              border
              border-border
              bg-bg
              px-4
              py-3
            "
          />
        </div>

      </div>
    </div>
  );
}
