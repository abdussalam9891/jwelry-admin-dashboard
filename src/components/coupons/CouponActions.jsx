export default function CouponActions({
  loading,
  isEditMode,
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
      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          rounded-2xl
          bg-brand
          px-5
          py-4
          text-sm
          font-semibold
          text-white
          shadow-lg
          shadow-[#6B1A2A]/15
          transition
          hover:opacity-90
        "
      >
        {loading
          ? "Saving..."
          : isEditMode
          ? "Save Changes"
          : "Create Coupon"}
      </button>
    </div>
  );
}
