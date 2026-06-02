import {
  Link,
} from "react-router-dom";

export default function Coupons() {

  return (

    <div className="p-6">

      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >
        <div>

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Coupons
          </h1>

          <p
            className="
              text-sm
              text-text-secondary
            "
          >
            Manage discounts and promotions.
          </p>

        </div>

        <Link
          to="/admin/coupons/new"
          className="
            rounded-xl
            bg-brand
            px-4
            py-2
            text-white
          "
        >
          Create Coupon
        </Link>

      </div>

      {/* table here */}

    </div>

  );

}
