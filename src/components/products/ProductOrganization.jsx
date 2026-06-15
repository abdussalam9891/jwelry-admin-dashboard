
import {
  CATEGORIES,
  PRODUCT_TYPES,
  STYLES,
  TARGET_AUDIENCES,
} from "@/constants/productMeta";

import { useState } from "react";

export default function ProductOrganization({
  formData,
  handleChange,
  setFormData,
}) {

  const [tagInput, setTagInput] =
  useState("");

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

          {CATEGORIES.map((category) => (
  <option
    key={category.value}
    value={category.value}
  >
    {category.label}
  </option>
))}

          </select>

        </div>



 {/* product type */}

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
    Product Type
  </label>

  <select
    name="productType"
    value={formData.productType}
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
    {(PRODUCT_TYPES[
      formData.category
    ] || []).map((type) => (
      <option
        key={type.value}
        value={type.value}
      >
        {type.label}
      </option>
    ))}
  </select>
</div>



{/*style */}
 <div>
  <label
    className="
      mb-3
      block
      text-sm
      font-medium
      text-text-primary
    "
  >
    Styles
  </label>

  <div className="flex flex-wrap gap-2">
    {STYLES.map((style) => (
      <button
        key={style.value}
        type="button"
        onClick={() => {
          const exists =
            formData.styles.includes(
              style.value
            );

          setFormData((prev) => ({
            ...prev,

            styles: exists
              ? prev.styles.filter(
                  (s) =>
                    s !== style.value
                )
              : [
                  ...prev.styles,
                  style.value,
                ],
          }));
        }}
        className={`
          rounded-xl
          border
          px-3
          py-2
          text-xs
          font-medium
          transition

          ${
            formData.styles.includes(
              style.value
            )
              ? "border-brand bg-brand text-white"
              : "border-border bg-surface-secondary"
          }
        `}
      >
        {style.label}
      </button>
    ))}
  </div>
</div>


{/*target audience */}

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
    Target Audience
  </label>

  <select
    name="targetAudience"
    value={formData.targetAudience}
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
    {TARGET_AUDIENCES.map(
      (audience) => (
        <option
          key={audience.value}
          value={audience.value}
        >
          {audience.label}
        </option>
      )
    )}
  </select>
</div>




{/*search tag*/}
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
    Search Tags
  </label>

  <div className="flex flex-wrap gap-2">
  {formData.searchTags.map(
    (tag) => (
      <button
  type="button"
  onClick={() =>
    setFormData((prev) => ({
      ...prev,

      searchTags:
        prev.searchTags.filter(
          (t) => t !== tag
        ),
    }))
  }
  className="
    flex
    items-center
    gap-2

    rounded-xl

    border
    border-brand

    bg-brand

    px-3
    py-2

    text-xs
    font-medium

    text-white

    transition

    hover:opacity-90
  "
>
  <span>{tag}</span>

  <span className="text-sm">
    ×
  </span>
</button>
    )
  )}
</div>

<input
  type="text"
  value={tagInput}
  onChange={(e) =>
    setTagInput(e.target.value)
  }
  onKeyDown={(e) => {
    if (
      e.key === "Enter" &&
      tagInput.trim()
    ) {
      e.preventDefault();

     const tag =
  tagInput
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

      if (
        !formData.searchTags.includes(
          tag
        )
      ) {
        setFormData((prev) => ({
          ...prev,

          searchTags: [
            ...prev.searchTags,
            tag,
          ],
        }));
      }

      setTagInput("");
    }
  }}
  placeholder="Type tag and press Enter"
  className="
    mt-3
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
/>
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
