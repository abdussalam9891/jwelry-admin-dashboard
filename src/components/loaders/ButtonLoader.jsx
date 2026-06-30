import { Loader2 } from "lucide-react";

export default function ButtonLoader({
  loading,
  children,
  loadingText = "Loading...",
}) {
  return (
    <span
      className="
        inline-flex
        items-center
        justify-center
        gap-2
      "
    >
      {loading && (
        <Loader2
          className="
            h-4
            w-4
            animate-spin
          "
        />
      )}

      {loading ? loadingText : children}
    </span>
  );
}
