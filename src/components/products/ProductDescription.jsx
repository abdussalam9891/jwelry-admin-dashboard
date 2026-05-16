export default function ProductDescription({
  formData,
  handleChange,
  setFormData,
}) {
  const handleDetailChange = (index, value) => {
    const updatedDetails = [...formData.details];

    updatedDetails[index] = value;

    setFormData((prev) => ({
      ...prev,

      details: updatedDetails,
    }));
  };

  const addDetailField = () => {
    setFormData((prev) => ({
      ...prev,

      details: [...prev.details, ""],
    }));
  };

  const removeDetailField = (index) => {
    const filteredDetails = formData.details.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,

      details: filteredDetails,
    }));
  };

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
      {/* HEADER */}

      <div>
        <h2
          className="
            text-lg
            font-semibold
            text-text-primary
          "
        >
          Product Description
        </h2>

        <p
          className="
            mt-1

            text-sm

            text-text-secondary
          "
        >
          Structured storefront content and product storytelling.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {/* SHORT DESCRIPTION */}

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
            Short Description
          </label>

          <textarea
            rows={4}
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="A timeless ring crafted for modern elegance."
            className="
              w-full

              rounded-2xl

              border
              border-border

              bg-surface-secondary

              p-4

              text-sm

              outline-none

              transition

              resize-none

              focus:border-border-[#D8C7CD]
              focus:bg-surface
            "
          />

          <p
            className="
              mt-2

              text-xs

              text-text-secondary
            "
          >
            Used for product cards, previews and storefront summaries.
          </p>
        </div>

        {/* DESIGN */}

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
            Design Story
          </label>

          <textarea
            rows={4}
            name="designDescription"
            value={formData.designDescription}
            onChange={handleChange}
            placeholder="Features precision-set stones with a refined finish."
            className="
              w-full

              rounded-2xl

              border
              border-border

              bg-surface-secondary

              p-4

              text-sm

              outline-none

              transition

              resize-none

              focus:border-border-[#D8C7CD]
              focus:bg-surface
            "
          />

          <p
            className="
              mt-2

              text-xs

              text-text-secondary
            "
          >
            Explain craftsmanship, finishing and design inspiration.
          </p>
        </div>

        {/* PRODUCT DETAILS */}

        <div>
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <div>
              <label
                className="
                  block

                  text-sm
                  font-medium

                  text-text-primary
                "
              >
                Product Highlights
              </label>

              <p
                className="
                  mt-1

                  text-xs

                  text-text-secondary
                "
              >
                Key selling points shown as bullet highlights on the storefront.
              </p>
            </div>

            <button
              type="button"
              onClick={addDetailField}
              className="
                rounded-xl

                bg-brand

                px-4
                py-2

                text-xs
                font-semibold

                text-white

                transition

                hover:opacity-90
              "
            >
              + Add Highlight
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {formData.details.map((detail, index) => (
              <div
                key={index}
                className="
                    flex
                    items-center
                    gap-3
                  "
              >
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                  placeholder="Premium jewelry craftsmanship"
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

                      focus:border-border-[#D8C7CD]
                      focus:bg-surface
                    "
                />

                {formData.details.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDetailField(index)}
                    className="
                        rounded-xl

                        border
                        border-red-100

                        bg-red-50

                        px-3
                        py-2

                        text-xs
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
            ))}
          </div>
        </div>

        {/* STYLING */}

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
            Styling Notes
          </label>

          <textarea
            rows={3}
            name="stylingDescription"
            value={formData.stylingDescription}
            onChange={handleChange}
            placeholder="Perfect for daily wear and special occasions."
            className="
              w-full

              rounded-2xl

              border
              border-border

              bg-surface-secondary

              p-4

              text-sm

              outline-none

              transition

              resize-none

              focus:border-border-[#D8C7CD]
              focus:bg-surface
            "
          />

          <p
            className="
              mt-2

              text-xs

              text-text-secondary
            "
          >
            Helps customers understand where and how this piece can be styled.
          </p>
        </div>
      </div>
    </div>
  );
}
