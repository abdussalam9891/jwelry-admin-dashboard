export default function ProductPricing({
  formData,
  handleChange,
}) {

  return (

    <div
      className="
        rounded-3xl

        border
        border-border

        bg-surface

        p-6

        shadow-sm
      "
    >

      <h2
        className="
          text-lg
          font-semibold
          text-text-primary
        "
      >
        Pricing & Inventory
      </h2>



      <div
        className="
          mt-6

          grid
          grid-cols-1
          gap-5

          md:grid-cols-2
        "
      >

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
            Lowest Variant Price
          </label>

          <input
           type="text"
inputMode="numeric"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="25000"
            min="0"
            className="
              h-12
              w-full

              rounded-2xl

              border
              border-border

              bg-surface-secondary

              px-4

              text-sm

              outline-none

              transition

              focus:border-[#D8C7CD]
              focus:bg-surface
            "
          />

          <p className="mt-1 text-xs text-text-secondary">
  Used as the starting product price in listings.
</p>

        </div>



        {/* ORIGINAL PRICE */}

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
            Lowest Variant Compare Price
          </label>

          <input
           type="text"
inputMode="numeric"
            name="originalPrice"
            value={formData.originalPrice}
            onChange={handleChange}
            placeholder="30000"
            min="0"
            className="
              h-12
              w-full

              rounded-2xl

              border
              border-border

              bg-surface-secondary

              px-4

              text-sm

              outline-none

              transition

              focus:border-[#D8C7CD]
              focus:bg-surface
            "
          />
          <p className="mt-1 text-xs text-text-secondary">
  Original price before discount for this specific variant.
</p>

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
           Total Inventory
          </label>

          <input
           type="text"
inputMode="numeric"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="10"
            min="0"
            className="
              h-12
              w-full

              rounded-2xl

              border
              border-border

              bg-surface-secondary

              px-4

              text-sm

              outline-none

              transition

              focus:border-[#D8C7CD]
              focus:bg-surface
            "
          />
          <p className="mt-1 text-xs text-text-secondary">
  Combined inventory across all variants.
</p>

        </div>



        {/* LOW STOCK */}

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
            Overall Low Stock Warning
          </label>

          <input
           type="text"
inputMode="numeric"
            name="lowStockThreshold"
            value={formData.lowStockThreshold}
            onChange={handleChange}
            min="0"
            className="
              h-12
              w-full

              rounded-2xl

              border
              border-border

              bg-surface-secondary

              px-4

              text-sm

              outline-none

              transition

              focus:border-[#D8C7CD]
              focus:bg-surface
            "
          />
          <p className="mt-1 text-xs text-text-secondary">
  Shows low inventory warning when total stock falls below this number.
</p>

        </div>

      </div>

    </div>

  );

}
