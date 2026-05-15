export default function ProductOrganization({
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
        Organization
      </h2>



      <div className="mt-6 space-y-5">

        {/* CATEGORY */}

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
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
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
            "
          >

            <option value="rings">
              Rings
            </option>

            <option value="earrings">
              Earrings
            </option>

            <option value="necklaces">
              Necklaces
            </option>

            <option value="bracelets">
              Bracelets
            </option>

          </select>

        </div>



        {/* SUBCATEGORY */}

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
            Subcategory
          </label>

          <select
            name="subcategory"
            value={formData.subcategory[0]}
            onChange={handleChange}
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
            "
          >

            <option value="engagement">
              Engagement
            </option>

            <option value="wedding">
              Wedding
            </option>

            <option value="casual">
              Casual
            </option>

            <option value="luxury">
              Luxury
            </option>

            <option value="bridal">
              Bridal
            </option>

            <option value="minimal">
              Minimal
            </option>

          </select>

        </div>



        {/* STATUS */}

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
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
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
            "
          >

            <option value="ACTIVE">
              Active
            </option>

            <option value="DRAFT">
              Draft
            </option>

            <option value="ARCHIVED">
              Archived
            </option>

          </select>

        </div>

      </div>

    </div>

  );

}
