import { Sparkles } from "lucide-react";

export default function SmartInsightsCard({
  dashboard,
}) {
  return (
    <div
      className="
        rounded-[32px]
        border
        border-border
        bg-surface
        p-6
      "
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-brand" />

        <h2
          className="
            text-xl
            font-semibold
            text-text-primary
          "
        >
          Smart Insights
        </h2>
      </div>

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {dashboard?.smartInsights?.map(
          (item, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                border
                border-border
                bg-surface-secondary
                p-5
                text-sm
                font-medium
                text-text-primary
              "
            >
              {item}
            </div>
          )
        )}
      </div>
    </div>
  );
}
