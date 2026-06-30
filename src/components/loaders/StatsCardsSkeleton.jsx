export default function StatsCardsSkeleton({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="
            rounded-3xl
            border
            border-border
            bg-surface
            p-6
            shadow-sm
            animate-pulse
          "
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div
                className="
                  h-3
                  w-24
                  rounded-full
                  bg-surface-secondary
                "
              />

              <div
                className="
                  mt-4
                  h-8
                  w-20
                  rounded-lg
                  bg-surface-secondary
                "
              />
            </div>

            <div
              className="
                h-12
                w-12
                rounded-2xl
                bg-surface-secondary
              "
            />
          </div>
        </div>
      ))}
    </>
  );
}
