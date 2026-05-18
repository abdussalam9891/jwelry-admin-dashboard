const materialOptions = [
  "18K Gold",
  "22K Gold",
  "Silver",
  "Diamond",
  "Rose Gold",
  "White Gold",
  "Platinum",
  "Gemstone",
];

export default function ProductVariantsList({
  formData,
  removeVariant,
  handleVariantChange,
}) {
  return (
    <div className="mt-8 space-y-6">
      {formData.variants.map((variant, index) => (
        <div
          key={index}
          className="
              relative

              overflow-hidden

              rounded-[28px]

              border
              border-border

              bg-surface-secondary

              p-6

              transition

              hover:border-[#E4D7DB]
            "
        >
          {/* TOP */}

          <div
            className="
                flex
                items-center
                justify-between
              "
          >
            <div>
              <p
                className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide

                    text-text-secondary
                  "
              >
                Variant
              </p>

              <h3
                className="
                    mt-1
                    text-lg
                    font-semibold
                    text-text-primary
                  "
              >
                #{index + 1}
              </h3>
            </div>

            {formData.variants.length > 1 && (
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="
                    rounded-xl

                    border
                    border-red-100

                    bg-red-50

                    px-4
                    py-2

                    text-sm
                    font-semibold

                    text-red-500

                    transition

                    hover:bg-red-100
                  "
              >
                Remove
              </button>
            )}
          </div>

          {/* FIELDS */}

          <div
            className="
                mt-6

                grid
                grid-cols-1
                gap-4

                md:grid-cols-2
              "
          >
            {/* MATERIAL */}

            <div>
              <label
                className="
                    mb-2
                    block

                    text-sm
                    font-medium
                    text-text-primary
                  "
              >
                Material
              </label>

              <select
                value={variant.material}
                onChange={(e) =>
                  handleVariantChange(index, "material", e.target.value)
                }
                className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-border

                    bg-surface

                    px-4

                    text-sm

                    outline-none
                  "
              >
                {materialOptions.map((material) => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </div>

            {/* SIZE */}

            {["rings", "bracelets"].includes(formData.category) && (
              <div>
                <label
                  className="
                      mb-2
                      block

                      text-sm
                      font-medium
                      text-text-primary
                    "
                >
                  Size
                </label>

                <div
                  className="
    flex
    h-12
    items-center

    rounded-2xl

    border
    border-border

    bg-surface-secondary
text-text-secondary
opacity-80



    px-4

    text-sm
    font-medium


  "
                >
                  {variant.size || "—"}
                </div>
              </div>
            )}

            {/* SKU */}

            <div>
              <label
                className="
                    mb-2
                    block

                    text-sm
                    font-medium
                    text-text-primary
                  "
              >
                SKU
              </label>

              <input
                type="text"
                value={variant.sku}
                readOnly
                className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-border

                  bg-surface-secondary
text-text-secondary
opacity-80

                    px-4

                    text-sm

                    
                  "
              />
            </div>

            {/* PRICE */}

            <div>
              <label
                className="
                    mb-2
                    block

                    text-sm
                    font-medium
                    text-text-primary
                  "
              >
                Variant Price
              </label>

              <input
                type="text"
                inputMode="numeric"
                placeholder="Price"
                value={variant.price}
                onChange={(e) =>
                  handleVariantChange(index, "price", e.target.value)
                }
                className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-border

                    bg-surface

                    px-4

                    text-sm

                    outline-none
                  "
              />
            </div>

            {/* STOCK */}

            <div>
              <label
                className="
                    mb-2
                    block

                    text-sm
                    font-medium
                    text-text-primary
                  "
              >
                Inventory Stock
              </label>

              <input
                type="text"
                inputMode="numeric"
                placeholder="Stock Quantity"
                value={variant.stock}
                onChange={(e) =>
                  handleVariantChange(index, "stock", e.target.value)
                }
                className="
                    h-12
                    w-full

                    rounded-2xl

                    border
                    border-border

                    bg-surface

                    px-4

                    text-sm

                    outline-none
                  "
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
