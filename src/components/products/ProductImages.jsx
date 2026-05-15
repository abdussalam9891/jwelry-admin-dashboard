import {ImagePlus,
  
  Star,
  Trash2, ChevronLeft,
  ChevronRight, }
from "lucide-react";



export default function ProductImages({
  formData,
  handleImageUpload,
  removeImage,
  moveImage,
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
        Product Images
      </h2>



      <div className="mt-6 space-y-5">

        {/* UPLOAD BOX */}

        <label
          className="
            flex
            min-h-[220px]

            cursor-pointer

            items-center
            justify-center

            rounded-3xl

            border-2
            border-dashed
            border-border

            bg-surface-secondary

            transition

            hover:border-[#6B1A2A]
          "
        >

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />



         <div className="text-center">

  <div
    className="
      mx-auto

      flex
      h-14
      w-14

      items-center
      justify-center

      rounded-2xl

      bg-[#F8EEF1]

      text-[#6B1A2A]
    "
  >

    <ImagePlus size={26} />

  </div>



  <p
    className="
      mt-5

      text-sm
      font-semibold

      text-text-primary
    "
  >
    Upload Product Images
  </p>



  <p
    className="
      mt-2

      text-xs
      leading-relaxed

      text-text-secondary
    "
  >
    Drag and drop images here
    or click to browse
  </p>



  <div
    className="
      mt-5

      inline-flex
      items-center

      rounded-full

      border
      border-border

      bg-white

      px-3
      py-1.5

      text-[11px]
      font-medium

      text-text-secondary
    "
  >
    Up to 5 images • PNG • WEBP
  </div>

</div>

        </label>



        {/* IMAGE PREVIEW GRID */}

        {formData.images?.length > 0 && (

          <div
            className="
              grid
              grid-cols-2
              gap-4

              sm:grid-cols-3
              xl:grid-cols-5
            "
          >

            {formData.images.map(
              (image, index) => (

              <div
  key={image.public_id}

  className="
    group
    relative

    overflow-hidden

    rounded-3xl

    border
    border-border

    bg-surface-secondary

    transition-all
    duration-300

    hover:-translate-y-1
    hover:shadow-xl
  "
>

  {/* IMAGE */}

  <img
    src={image.url}
    alt={`Product ${index + 1}`}

    className="
      h-40
      w-full

      object-cover
    "
  />



  {/* PRIMARY BADGE */}

  {index === 0 && (

    <div
      className="
        absolute
        left-3
        top-3

        flex
        items-center
        gap-1.5

        rounded-full

        bg-white/90

        px-5
        py-1.5

        text-[11px]
        font-semibold

        text-[#6B1A2A]

        shadow-lg
        backdrop-blur-md
      "
    >

      <Star size={12} />

      Primary

    </div>

  )}






  {/* REORDER CONTROLS */}

<div
  className="
    absolute
    bottom-3
    left-1/2

    flex
    -translate-x-1/2

    items-center
    gap-2

    opacity-0

    transition-all
    duration-300

    translate-y-2

    group-hover:translate-y-0
    group-hover:opacity-100
  "
>

  {/* MOVE LEFT */}

  {index > 0 && (

    <button
      type="button"

      onClick={() =>
        moveImage(
          index,
          index - 1
        )
      }

      className="
        flex
        h-8
        w-8

        items-center
        justify-center

        rounded-full

        bg-white/90

        text-text-primary

        shadow-lg
        backdrop-blur-md

        transition

        hover:scale-105
      "
    >

      <ChevronLeft size={14} />

    </button>

  )}



  {/* MOVE RIGHT */}

  {index <
    formData.images.length - 1 && (

    <button
      type="button"

      onClick={() =>
        moveImage(
          index,
          index + 1
        )
      }

      className="
        flex
        h-8
        w-8

        items-center
        justify-center

        rounded-full

        bg-white/90

        text-text-primary

        shadow-lg
        backdrop-blur-md

        transition

        hover:scale-105
      "
    >

      <ChevronRight size={14} />

    </button>

  )}

</div>







  {/* REMOVE BUTTON */}

  <button
    type="button"

    onClick={() =>
      removeImage(image)
    }

    className="
      absolute
      top-3
      right-3

      flex
      h-9
      w-9

      items-center
      justify-center

      rounded-full

      bg-red-500/95

      text-white

      opacity-0

      shadow-xl
      backdrop-blur-md

      transition-all
      duration-300

      translate-y-2

      group-hover:translate-y-0
      group-hover:opacity-100

      hover:scale-105
      hover:bg-red-600
    "
  >

    <Trash2 size={16} />

  </button>

</div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}
