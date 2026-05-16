import { Link } from "react-router-dom";

import { Card } from "@/components/ui/card";

export default function MetricCard({
  to,
  title,
  value,
  icon: Icon,
  description,
  actionText,
  iconBg,
  iconColor,
  loading,
  prefix = "",
}) {
  return (
    <Link to={to} className="block">
      <Card
        className="
          rounded-3xl

          border
          border-border

          bg-surface

          p-6

          shadow-sm

          transition-colors

          hover:bg-surface-secondary
        "
      >
        {/* TOP */}
        <div
          className="
            flex
            items-start
            justify-between
          "
        >
          <div>
            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-wide

                text-text-secondary
              "
            >
              {title}
            </p>

            <h2
              className="
                mt-4

                text-3xl
                font-bold
                tracking-tight

                text-text-primary
              "
            >
              {loading
                ? "..."
                : `${prefix}${value?.toLocaleString()}`}
            </h2>
          </div>

          {/* ICON */}
          <div
            className="
              flex
              h-12
              w-12

              items-center
              justify-center

              rounded-2xl
            "
            style={{
              backgroundColor: iconBg,
              color: iconColor,
            }}
          >
            <Icon size={20} />
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="
            mt-8

            flex
            items-center
            justify-between
          "
        >
          <p
            className="
              text-sm

              text-text-secondary
            "
          >
            {description}
          </p>

          <span
            className="
              text-sm
              font-semibold

              text-brand
            "
          >
            {actionText} →
          </span>
        </div>
      </Card>
    </Link>
  );
}
