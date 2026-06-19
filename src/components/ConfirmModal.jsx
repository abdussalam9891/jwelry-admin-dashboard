import { X } from "lucide-react";

const ConfirmModal = ({
  open,

  onClose,

  onConfirm,

  title,

  description,

  confirmText = "Confirm",

  cancelText = "Cancel",

  loading = false,
}) => {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/40

        p-4

        backdrop-blur-sm
      "
    >
      <div
        className="
          relative

          w-full
          max-w-md

          rounded-[32px]

          bg-surface

          p-8

          shadow-2xl
        "
      >


        {/* TITLE */}

        <h2
          className="
            text-2xl
            font-bold

            text-text-primary
          "
        >
          {title}
        </h2>

        {/* DESCRIPTION */}

        <p
          className="
            mt-4

            leading-relaxed

            text-text-secondary
          "
        >
          {description}
        </p>

        {/* ACTIONS */}

        <div
          className="
            mt-8

            flex
            items-center
            justify-end

            gap-3
          "
        >
          <button
            onClick={onClose}
            className="
  rounded-2xl

  border
  border-border

  bg-surface

  px-5
  py-3

  text-sm
  font-semibold

  text-text-primary

  transition-colors

  hover:border-brand/20
  hover:bg-surface-secondary
"
          >
            {cancelText}
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className="
              rounded-2xl

              bg-brand

              px-5
              py-3

              text-sm
              font-semibold

              text-white

              transition

              hover:opacity-90

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
