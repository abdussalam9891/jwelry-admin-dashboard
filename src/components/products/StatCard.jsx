import { Card } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
   
}) {
  return (
    <Card
      className="
        rounded-3xl

        border
        border-border

        bg-surface

        p-6

        shadow-sm
      "
    >
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
            {value}
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


    </Card>
  );
}
