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
        {/* CLOSE */}

        <button
          onClick={onClose}
          className="
            absolute
            right-5
            top-5

            text-[#9CA3AF]

            transition

            hover:text-text-primary
          "
        >
          <X size={20} />
        </button>

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
              border-black/10

              bg-surface

              px-5
              py-3

              text-sm
              font-semibold

              text-text-primary

              transition

              hover:bg-[#FAFAFA]
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
