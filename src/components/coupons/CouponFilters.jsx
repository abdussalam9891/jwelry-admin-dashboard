import {
  Search,

} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CouponFilters({
  search,
  setSearch,
  sort,
  setSort,
  status,
  setStatus,
  discountType,
  setDiscountType,
  totalResults,
  setPage,
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-surface
        p-5
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* SEARCH */}

        <div
          className="
            relative
            w-full
            lg:max-w-md
          "
        >
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-text-secondary
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );
              setPage(1);
            }}
            placeholder="Search coupon code or name..."
            className="
  h-12
  w-full

  rounded-2xl

  border
  border-border

  bg-bg

  pl-11
  pr-4

  text-sm

  transition

  focus:border-brand
  focus:ring-2
  focus:ring-brand/10

  outline-none
"
          />
        </div>

        {/* FILTERS */}

        <div
  className="
    flex
    flex-wrap
    items-center
    gap-3
  "
>


  {/* STATUS */}

  <Select
    value={status}
    onValueChange={(value) => {
  setStatus(value);
  setPage(1);
}}
  >
    <SelectTrigger
      className="
        h-12
        w-[180px]

        rounded-2xl

        border-border

        bg-surface-secondary
      "
    >
      <SelectValue />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="ALL">
        All Status
      </SelectItem>

      <SelectItem value="ACTIVE">
        Active
      </SelectItem>

      <SelectItem value="INACTIVE">
        Inactive
      </SelectItem>

      <SelectItem value="EXPIRED">
        Expired
      </SelectItem>
    </SelectContent>
  </Select>

  {/* TYPE */}

  <Select
    value={discountType}
    onValueChange={(value) => {
  setDiscountType(value);
  setPage(1);
}}
  >
    <SelectTrigger
      className="
        h-12
        w-[180px]

        rounded-2xl

        border-border

        bg-surface-secondary
      "
    >
      <SelectValue />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="ALL">
        All Types
      </SelectItem>

      <SelectItem value="PERCENTAGE">
        Percentage
      </SelectItem>

      <SelectItem value="FIXED">
        Fixed
      </SelectItem>

      <SelectItem value="FREE_SHIPPING">
        Free Shipping
      </SelectItem>
    </SelectContent>
  </Select>



  <Select
  value={sort}
 onValueChange={(value) => {
  setSort(value);
  setPage(1);
}}
>
  <SelectTrigger
    className="
      h-12
      w-[180px]

      rounded-2xl

      border-border

      bg-surface-secondary
    "
  >
    <SelectValue />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="Newest">
      Newest First
    </SelectItem>

    <SelectItem value="Oldest">
      Oldest First
    </SelectItem>

    <SelectItem value="Highest Discount">
      Highest Discount
    </SelectItem>

    <SelectItem value="Most Used">
      Most Used
    </SelectItem>
  </SelectContent>
</Select>


</div>

      </div>

      <div
        className="
          mt-4

          text-sm
          text-text-secondary
        "
      >
        {totalResults} coupon
        {totalResults !== 1
          ? "s"
          : ""}
        found
      </div>
    </div>
  );
}
