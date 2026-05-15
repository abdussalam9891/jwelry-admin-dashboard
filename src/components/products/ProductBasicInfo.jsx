export default function ProductBasicInfo({
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
        Basic Information
      </h2>



      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-5
        "
      >

        {/* NAME */}

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
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Diamond Ring"
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

        </div>



        {/* SLUG */}

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
            Slug
          </label>

          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="diamond-ring"
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

        </div>








      </div>

    </div>

  );

}
