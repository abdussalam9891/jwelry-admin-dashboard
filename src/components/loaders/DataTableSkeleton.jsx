export default function DataTableSkeleton({
  rows = 10,
  columns = 6,
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, row) => (
        <tr
          key={row}
          className="
            border-b
            border-border
            animate-pulse
          "
        >
          {Array.from({ length: columns }).map((_, col) => (
            <td
              key={col}
              className="px-6 py-5"
            >
              <div
                className="
                  h-4
                  w-full
                  rounded-full
                  bg-surface-secondary
                "
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
