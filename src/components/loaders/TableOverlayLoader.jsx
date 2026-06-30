import { Loader2 } from "lucide-react";

export default function TableOverlayLoader({ loading }) {
  if (!loading) return null;

  return (
    <div
      className="
        absolute
        inset-0
        z-20

        flex
        items-center
        justify-center

        rounded-[32px]

        bg-white/60
        backdrop-blur-[2px]

        dark:bg-black/40
      "
    >
      <div
        className="
          flex
          items-center
          gap-3

          rounded-2xl

          border
          border-border

          bg-surface

          px-5
          py-3

          shadow-xl
        "
      >
        <Loader2
          className="
            h-5
            w-5
            animate-spin
            text-brand
          "
        />

        <span
          className="
            text-sm
            font-medium
            text-text-primary
          "
        >
          Loading orders...
        </span>
      </div>
    </div>
  );
}
