import { Trash2 } from "lucide-react";

export default function VariantTable({
  variants,
  removeVariant,
  handleVariantChange,
  requiresSize,
}) {
  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-surface-secondary">
            <tr>
              <th className="px-4 py-4 text-left">
                Material
              </th>

              {requiresSize && (
                <th className="px-4 py-4 text-left">
                  Size
                </th>
              )}

              <th className="px-4 py-4 text-left">
                SKU
              </th>

              <th className="px-4 py-4 text-left">
                Price
              </th>

              <th className="px-4 py-4 text-left">
                Stock
              </th>

              <th className="px-4 py-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {variants.map(
              (variant, index) => (
                <tr
                  key={index}
                  className="border-t border-border"
                >
                  <td className="p-4">
                    {variant.material}
                  </td>

                  {requiresSize && (
                    <td className="p-4">
                      {variant.size}
                    </td>
                  )}

                  <td className="p-4">
                    {variant.sku}
                  </td>

                  <td className="p-4">
                  <input
  type="text"
  inputMode="numeric"
  value={variant.price}
  onChange={(e) => {
    const value =
      e.target.value.replace(
        /[^0-9]/g,
        ""
      );

    handleVariantChange(
      index,
      "price",
      value
    );
  }}
  className="
    h-10
    w-28
    rounded-xl
    border
    border-border
    px-3
    bg-surface
  "
/>
                  </td>

                 <td className="p-4">
  <input
    type="text"
    inputMode="numeric"
    value={variant.stock}
    onChange={(e) =>
      handleVariantChange(
        index,
        "stock",
        e.target.value
      )
    }
    className="
      h-10
      w-24
      rounded-xl
      border
      border-border
      px-3
    "
  />
</td>

                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() =>
                        removeVariant(index)
                      }
                      className="
                        rounded-xl
                        bg-red-50
                        p-2
                        text-red-600
                      "
                    >
                      <Trash2
                        size={16}
                      />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
