import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  ShoppingBag,
  IndianRupee,
  Clock3,
  Crown,
  MapPin,
} from "lucide-react";


import { getCustomerDetails } from "../services/customerService";



export default function CustomerDetailsPage() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();



  const [
    loading,
    setLoading,
  ] = useState(true);



  const [
    customer,
    setCustomer,
  ] = useState(null);



  useEffect(() => {

    const fetchCustomer =
      async () => {

        try {

          const data =
                   await getCustomerDetails(id);

          setCustomer(
            data.customer
          );

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }

      };



    fetchCustomer();

  }, [id]);



  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }



  if (!customer) {

    return (
      <div className="p-10">
        Customer not found
      </div>
    );

  }




  const timeline = [

  {
    title:
      "First Purchase",

    description:
      "Customer completed first successful order",

    date:
      customer.joinedAt,
  },



  {
    title:
      `${customer.customerTier} Tier Reached`,

    description:
      "Customer spending reached current loyalty tier",

    date:
      customer.lastOrderDate,
  },



  {
    title:
      "Latest Activity",

    description:
      `Last purchase made ${Math.floor(

        (
          new Date() -

          new Date(
            customer.lastOrderDate
          )

        ) /

        (1000 * 60 * 60 * 24)

      )} days ago`,

    date:
      customer.lastOrderDate,
  },



  {
    title:
      `${customer.totalOrders} Orders Completed`,

    description:
      "Customer has successfully placed multiple orders",

    date:
      customer.lastOrderDate,
  },

];


const totalItemsBought =
  customer.orders?.reduce(
    (acc, order) =>

      acc +

      order.items?.reduce(
        (itemAcc, item) =>

          itemAcc +
          item.quantity,

        0
      ),

    0
  );



const highestOrder =
  customer.orders?.length

    ? Math.max(
        ...customer.orders.map(
          (order) =>
            order.totalPrice
        )
      )

    : 0;



const preferredPayment =
  customer.orders?.[0]
    ?.paymentMethod || "N/A";



const firstPurchase =
  customer.orders?.[
    customer.orders.length - 1
  ]?.createdAt;



const lastPurchase =
  customer.orders?.[0]
    ?.createdAt;



const categoryMap = {};



customer.orders?.forEach(
  (order) => {

    order.items?.forEach(
      (item) => {

        const slug =
          item.slug || "";



        let category =
          "Other";



       if (
  slug.includes("earring")
) {

  category = "Earrings";

}

else if (

  slug.includes("necklace")

) {

  category = "Necklaces";

}

else if (

  slug.includes("-ring") ||

  slug.endsWith("ring")

) {

  category = "Rings";

}



        categoryMap[category] =
          (categoryMap[category] || 0) + 1;

      }
    );

  }
);



const favoriteCategory =
  Object.entries(
    categoryMap
  ).sort(
    (a, b) =>
      b[1] - a[1]
  )[0]?.[0] || "N/A";



const materialMap = {};



customer.orders?.forEach(
  (order) => {

    order.items?.forEach(
      (item) => {

        const material =
          item.variant
            ?.material ||
          "Unknown";



        materialMap[
          material
        ] =

          (
            materialMap[
              material
            ] || 0
          ) + 1;

      }
    );

  }
);



const mostPurchasedMaterial =
  Object.entries(
    materialMap
  ).sort(
    (a, b) =>
      b[1] - a[1]
  )[0]?.[0] || "N/A";






  const region =
  customer.orders?.[0]
    ?.shippingAddress
    ?.state || "N/A";



  return (

    <div className="min-h-screen p-4 md:p-8">

      <div className="mx-auto max-w-7xl space-y-6">

        {/* HEADER */}

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

          <div>

            <button
              onClick={() =>
                navigate(-1)
              }

              className="
                mb-5

                inline-flex
                items-center
                gap-2

                text-sm
                font-medium

                text-text-secondary

                transition

                hover:text-text-primary
              "
            >

              <ArrowLeft size={16} />

              Back to customers

            </button>



            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              {/* AVATAR */}

              <div
                className="
                  flex
                  h-16
                  w-16

                  items-center
                  justify-center

                  rounded-3xl

                  bg-brand/10

                  text-2xl
                  font-bold

                  text-brand
                "
              >

                {
                  customer.customerName
                    ?.charAt(0)
                }

              </div>



              {/* INFO */}

              <div>

                <h1
                  className="
                    text-3xl
                    font-bold

                    tracking-tight

                    text-text-primary
                  "
                >
                  {
                    customer.customerName
                  }
                </h1>



                <p
                  className="
                    mt-1

                    text-text-secondary
                  "
                >
                  Customer intelligence profile
                </p>

              </div>

            </div>

          </div>



          {/* TIER */}

          <div>

            <span
              className={`
                inline-flex
                items-center
                gap-2

                rounded-full

                px-4
                py-2

                text-sm
                font-semibold

                ${
                  customer.customerTier ===
                  "Platinum"

                    ? "bg-[#EEF2FF] text-[#4338CA] border border-[#C7D2FE]"

                    : customer.customerTier ===
                      "Gold"

                    ? "bg-[#FFF7E8] text-[#B7791F] border border-[#FDE3B0]"

                    : customer.customerTier ===
                      "Silver"

                    ? "bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]"

                    : "bg-[#FFF4E8] text-[#C77700] border border-[#FFE1B4]"
                }
              `}
            >

              <Crown size={14} />

              {
                customer.customerTier
              }

            </span>

          </div>

        </div>



        {/* STATS */}

        <div
          className="
            grid
            grid-cols-1

            gap-4

            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          {/* TOTAL SPENT */}

          <div
            className="
              rounded-3xl

              border
              border-border

              bg-surface

              p-6
            "
          >

            <div
              className="
                mb-4

                flex
                items-center
                justify-between
              "
            >

              <p
                className="
                  text-sm
                  font-medium

                  text-text-secondary
                "
              >
                Lifetime Value
              </p>

              <IndianRupee size={18} />

            </div>



            <h2
              className="
                text-3xl
                font-bold

                text-text-primary
              "
            >
              ₹
              {
                Math.round(customer.totalSpent)
                  ?.toLocaleString()
              }
            </h2>

          </div>



          {/* ORDERS */}

          <div
            className="
              rounded-3xl

              border
              border-border

              bg-surface

              p-6
            "
          >

            <div
              className="
                mb-4

                flex
                items-center
                justify-between
              "
            >

              <p
                className="
                  text-sm
                  font-medium

                  text-text-secondary
                "
              >
                Total Orders
              </p>

              <ShoppingBag size={18} />

            </div>



            <h2
              className="
                text-3xl
                font-bold

                text-text-primary
              "
            >
              {
                customer.totalOrders
              }
            </h2>

          </div>



          {/* AOV */}

          <div
            className="
              rounded-3xl

              border
              border-border

              bg-surface

              p-6
            "
          >

            <div
              className="
                mb-4

                flex
                items-center
                justify-between
              "
            >

              <p
                className="
                  text-sm
                  font-medium

                  text-text-secondary
                "
              >
                Avg Order Value
              </p>

              <IndianRupee size={18} />

            </div>



            <h2
              className="
                text-3xl
                font-bold

                text-text-primary
              "
            >
              ₹
              {
                Math.floor(
                  customer.totalSpent /

                  customer.totalOrders
                ).toLocaleString()
              }
            </h2>

          </div>



          {/* LAST ACTIVE */}

          <div
            className="
              rounded-3xl

              border
              border-border

              bg-surface

              p-6
            "
          >

            <div
              className="
                mb-4

                flex
                items-center
                justify-between
              "
            >

              <p
                className="
                  text-sm
                  font-medium

                  text-text-secondary
                "
              >
                Last Activity
              </p>

              <Clock3 size={18} />

            </div>



            <h2
              className="
                text-2xl
                font-bold

                text-text-primary
              "
            >
              {

                Math.floor(

                  (
                    new Date() -

                    new Date(
                      customer.lastOrderDate
                    )

                  ) /

                  (1000 * 60 * 60 * 24)

                )

              }
              d ago
            </h2>

          </div>

        </div>



        {/* MAIN GRID */}

        <div
          className="
            grid
            grid-cols-1

            gap-6

            xl:grid-cols-3
          "
        >

          {/* LEFT */}

          <div
            className="
              space-y-6

              xl:col-span-2
            "
          >

            {/* ORDER HISTORY */}

            <div
              className="
                rounded-3xl

                border
                border-border

                bg-surface

                p-6
              "
            >

              <div
                className="
                  mb-6

                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <h2
                    className="
                      text-lg
                      font-semibold

                      text-text-primary
                    "
                  >
                    Order History
                  </h2>

                  <p
                    className="
                      mt-1

                      text-sm

                      text-text-secondary
                    "
                  >
                    Complete customer purchase history
                  </p>

                </div>

              </div>



            <div
  className="
    space-y-4
  "
>

  {
    customer.orders?.map(
      (order) => {

        const totalItems =
          order.items?.reduce(
            (
              acc,
              item
            ) =>

              acc +
              item.quantity,

            0
          );



        const daysAgo =
          Math.floor(

            (
              new Date() -

              new Date(
                order.createdAt
              )

            ) /

            (1000 * 60 * 60 * 24)

          );



        return (

          <div
            key={order._id}

            onClick={() =>
              navigate(
                `/admin/orders/${order._id}`
              )
            }

            className="
              group

              cursor-pointer

              rounded-3xl

              border
              border-border

              bg-surface-secondary

              p-5

              transition-all

              hover:border-brand/20
              hover:bg-brand/5
              hover:shadow-sm
            "
          >

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
                flex-wrap
              "
            >

              {/* LEFT */}

              <div
                className="
                  flex
                  gap-4
                "
              >

                {/* THUMBNAIL */}

                <img
                  src={
                    order.items?.[0]
                      ?.image
                  }

                  alt="Order"

                  className="
                    h-20
                    w-20

                    rounded-2xl

                    object-cover

                    border
                    border-border
                  "
                />



                {/* INFO */}

                <div>

                  {/* ORDER NUMBER */}

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      flex-wrap
                    "
                  >

                    <p
                      className="
                        text-base
                        font-semibold

                        text-text-primary
                      "
                    >
                      #
                      {
                        order.orderNumber
                      }
                    </p>



                    {/* ORDER STATUS */}

                    <span
                      className={`
                        inline-flex
                        items-center

                        rounded-full

                        px-3
                        py-1

                        text-xs
                        font-semibold

                        ${
                          order.orderStatus ===
                          "DELIVERED"

                            ? "bg-[#EEF8F1] text-[#0F9F61]"

                            : order.orderStatus ===
                              "CANCELLED"

                            ? "bg-[#FFF1F2] text-[#E11D48]"

                            : "bg-[#FFF5E8] text-[#D97706]"
                        }
                      `}
                    >

                      {
                        order.orderStatus
                      }

                    </span>



                    {/* PAYMENT STATUS */}

                    <span
                      className={`
                        inline-flex
                        items-center

                        rounded-full

                        px-3
                        py-1

                        text-xs
                        font-semibold

                        ${
                          order.paymentStatus ===
                          "PAID"

                            ? "bg-[#EEF8F1] text-[#0F9F61]"

                            : order.paymentStatus ===
                              "FAILED"

                            ? "bg-[#FFF1F2] text-[#E11D48]"

                            : "bg-[#F4F4F5] text-[#52525B]"
                        }
                      `}
                    >

                      {
                        order.paymentStatus
                      }

                    </span>

                  </div>



                  {/* DATE */}

                  <p
                    className="
                      mt-3

                      text-sm

                      text-text-secondary
                    "
                  >

                    {

                      new Date(
                        order.createdAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )

                    }

                    {" "}
                    •
                    {" "}

                    {daysAgo}
                    d ago

                  </p>


                  <div
  className="
    mt-3

    flex
    flex-wrap
    items-center
    gap-2
  "
>

  {/* PAYMENT */}

  <div
    className="
      inline-flex
      items-center
      gap-2

      rounded-full

      bg-surface

      border
      border-border

      px-3
      py-1.5
    "
  >

    <div
      className={`
        h-2
        w-2

        rounded-full

        ${
          order.paymentStatus ===
          "PAID"

            ? "bg-[#0F9F61]"

            : order.paymentStatus ===
              "FAILED"

            ? "bg-[#E11D48]"

            : "bg-[#D97706]"
        }
      `}
    />

    <span
      className="
        text-xs
        font-medium

        text-text-secondary
      "
    >
      Payment:
      {" "}
      {order.paymentStatus}
    </span>

  </div>



  {/* FULFILLMENT */}

  <div
    className="
      inline-flex
      items-center
      gap-2

      rounded-full

      bg-surface

      border
      border-border

      px-3
      py-1.5
    "
  >

    <div
      className={`
        h-2
        w-2

        rounded-full

        ${
          order.orderStatus ===
          "DELIVERED"

            ? "bg-[#0F9F61]"

            : order.orderStatus ===
              "CANCELLED"

            ? "bg-[#E11D48]"

            : "bg-[#2563EB]"
        }
      `}
    />

    <span
      className="
        text-xs
        font-medium

        text-text-secondary
      "
    >
      Fulfillment:
      {" "}
      {order.orderStatus}
    </span>

  </div>



  {/* TRACKING */}

  {
    order.trackingNumber && (

      <div
        className="
          inline-flex
          items-center
          gap-2

          rounded-full

          bg-surface

          border
          border-border

          px-3
          py-1.5
        "
      >

        <span
          className="
            text-xs
            font-medium

            text-text-secondary
          "
        >
          Tracking:
          {" "}
          {
            order.shippingCarrier ||
            "Carrier"
          }
        </span>

      </div>

    )
  }

</div>



                  {/* ITEMS */}

                  <div
                    className="
                      mt-4

                      flex
                      items-center
                      gap-2
                      flex-wrap
                    "
                  >

                    {
                      order.items
                        ?.slice(0, 3)
                        ?.map(
                          (
                            item,
                            index
                          ) => (

                            <span
                              key={index}

                              className="
                                rounded-full

                                bg-surface

                                px-3
                                py-1.5

                                text-xs
                                font-medium

                                text-text-secondary

                                border
                                border-border
                              "
                            >

                              {
                                item.name
                              }

                            </span>

                          )
                        )
                    }



                    {
                      order.items
                        ?.length > 3 && (

                        <span
                          className="
                            rounded-full

                            bg-surface

                            px-3
                            py-1.5

                            text-xs
                            font-medium

                            text-text-secondary

                            border
                            border-border
                          "
                        >

                          +
                          {
                            order.items.length - 3
                          }
                          {" "}
                          more

                        </span>

                      )
                    }

                  </div>

                </div>

              </div>



              {/* RIGHT */}

              <div
                className="
                  text-right
                "
              >

                {/* TOTAL */}

                <p
                  className="
                    text-2xl
                    font-bold

                    tracking-tight

                    text-text-primary
                  "
                >
                  ₹
                  {
                    order.totalPrice
                      ?.toLocaleString()
                  }
                </p>



                {/* META */}

                <p
                  className="
                    mt-2

                    text-sm

                    text-text-secondary
                  "
                >

                  {
                    totalItems
                  }
                  {" "}
                  item
                  {
                    totalItems > 1
                      ? "s"
                      : ""
                  }

                </p>

              </div>

            </div>

          </div>

        );

      }
    )
  }

</div>

            </div>


            {/* CUSTOMER TIMELINE */}

<div
  className="
    rounded-3xl

    border
    border-border

    bg-surface

    p-6
  "
>

  {/* HEADER */}

  <div
    className="
      mb-8

      flex
      items-center
      gap-3
    "
  >

    <div
      className="
        flex
        h-10
        w-10

        items-center
        justify-center

        rounded-2xl

        bg-surface-secondary
      "
    >

      <Clock3 size={18} />

    </div>



    <div>

      <h2
        className="
          text-lg
          font-semibold

          text-text-primary
        "
      >
        Customer Timeline
      </h2>

      <p
        className="
          text-sm

          text-text-secondary
        "
      >
        Lifecycle activity & milestones
      </p>

    </div>

  </div>



  {/* TIMELINE */}

  <div
    className="
      relative

      space-y-8
    "
  >

    {
      timeline.map(
        (
          event,
          index
        ) => {

          const isLast =
            index ===
            timeline.length - 1;



          return (

            <div
              key={index}

              className="
                relative

                flex
                gap-4
              "
            >

              {/* LEFT */}

              <div
                className="
                  relative

                  flex
                  flex-col
                  items-center
                "
              >

                {/* DOT */}

                <div
                  className="
                    z-10

                    h-4
                    w-4

                    rounded-full

                    bg-brand

                    ring-4
                    ring-surface
                  "
                />



                {/* LINE */}

                {
                  !isLast && (

                    <div
                      className="
                        mt-1

                        h-full
                        w-[2px]

                        bg-border
                      "
                    />

                  )
                }

              </div>



              {/* CONTENT */}

              <div
                className="
                  flex-1

                  rounded-2xl

                  border
                  border-border

                  bg-surface-secondary

                  px-4
                  py-4
                "
              >

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                    flex-wrap
                  "
                >

                  <div>

                    <p
                      className="
                        text-sm
                        font-semibold

                        text-text-primary
                      "
                    >
                      {event.title}
                    </p>



                    <p
                      className="
                        mt-1

                        text-sm

                        text-text-secondary
                      "
                    >
                      {
                        event.description
                      }
                    </p>

                  </div>



                  <div
                    className="
                      text-right
                    "
                  >

                    <p
                      className="
                        text-sm
                        font-medium

                        text-text-primary
                      "
                    >
                      {

                        new Date(
                          event.date
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )

                      }
                    </p>

                  </div>

                </div>

              </div>

            </div>

          );

        }
      )
    }

  </div>

</div>

          </div>



          {/* RIGHT SIDEBAR */}

          <div
            className="
              space-y-6
            "
          >

      {/* CUSTOMER INFO */}

<div
  className="
    overflow-hidden

    rounded-[2rem]

    border
    border-border

    bg-surface

    shadow-sm
  "
>

  {/* TOP SECTION */}

  <div
    className="
      border-b
      border-border

      p-6
    "
  >

    <div
      className="
        flex
        items-start
        gap-4
      "
    >

      {/* AVATAR */}

      <div
        className="
          flex
          h-16
          w-16

          items-center
          justify-center

          rounded-3xl

          bg-brand/10

          text-2xl
          font-bold

          text-brand
        "
      >

        {
          customer.customerName
            ?.charAt(0)
        }

      </div>



      {/* INFO */}

      <div
        className="
          min-w-0
          flex-1
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
            flex-wrap
          "
        >

          <h2
            className="
              text-xl
              font-semibold

              tracking-tight

              text-text-primary
            "
          >
            {
              customer.customerName
            }
          </h2>



          {/* TIER */}

          <span
            className={`
              inline-flex
              items-center

              rounded-full

              px-3
              py-1

              text-xs
              font-semibold

              ${
                customer.customerTier ===
                "Platinum"

                  ? "bg-[#EEF2FF] text-[#4338CA]"

                  : customer.customerTier ===
                    "Gold"

                  ? "bg-[#FFF7E8] text-[#B7791F]"

                  : customer.customerTier ===
                    "Silver"

                  ? "bg-[#F3F4F6] text-[#4B5563]"

                  : "bg-[#FFF4E8] text-[#C77700]"
              }
            `}
          >

            {
              customer.customerTier
            }

          </span>

        </div>



        <p
          className="
            mt-2

            text-sm

            text-text-secondary
          "
        >
           customer profile
        </p>

      </div>

    </div>

  </div>



  {/* BODY */}

  <div
    className="
      p-6
    "
  >

    <div
      className="
        space-y-4
      "
    >

      {/* EMAIL */}

      <div
        className="
          rounded-2xl

          border
          border-border

          bg-surface-secondary

          p-4
        "
      >

        <div
          className="
            flex
            items-start
            gap-3
          "
        >

          <div
            className="
              mt-0.5

              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-xl

              bg-surface

              text-text-secondary
            "
          >

            <Mail size={16} />

          </div>



          <div
            className="
              min-w-0
            "
          >

            <p
              className="
                text-[11px]
                font-medium
                uppercase

                tracking-[0.18em]

                text-text-secondary
              "
            >
              Email Address
            </p>

            <p
              className="
                mt-2

                break-all

                text-sm
                font-medium

                text-text-primary
              "
            >
              {
                customer.customerEmail
              }
            </p>

          </div>

        </div>

      </div>



      {/* PHONE */}

      <div
        className="
          rounded-2xl

          border
          border-border

          bg-surface-secondary

          p-4
        "
      >

        <div
          className="
            flex
            items-start
            gap-3
          "
        >

          <div
            className="
              mt-0.5

              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-xl

              bg-surface

              text-text-secondary
            "
          >

            <Phone size={16} />

          </div>



          <div>

            <p
              className="
                text-[11px]
                font-medium
                uppercase

                tracking-[0.18em]

                text-text-secondary
              "
            >
              Phone Number
            </p>

            <p
              className="
                mt-2

                text-sm
                font-medium

                text-text-primary
              "
            >
              {
                customer.customerPhone
              }
            </p>

          </div>

        </div>

      </div>



      {/* ADDRESS */}

      <div
        className="
          rounded-2xl

          border
          border-border

          bg-surface-secondary

          p-4
        "
      >

        <div
          className="
            flex
            items-start
            gap-3
          "
        >

          <div
            className="
              mt-0.5

              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-xl

              bg-surface

              text-text-secondary
            "
          >

            <MapPin size={16} />

          </div>



          <div>

            <p
              className="
                text-[11px]
                font-medium
                uppercase

                tracking-[0.18em]

                text-text-secondary
              "
            >
              Latest Shipping Address
            </p>

            <p
              className="
                mt-2

                text-sm
                leading-7

                text-text-primary
              "
            >
              {
                customer.latestAddress
              }
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>


{/* CUSTOMER INSIGHTS */}

<div
  className="
    rounded-[2rem]

    border
    border-border

    bg-surface

    p-6

    shadow-sm
  "
>

  {/* HEADER */}

  <div
    className="
      mb-6

      flex
      items-center
      justify-between
    "
  >

    <div>

      <h2
        className="
          text-lg
          font-semibold

          text-text-primary
        "
      >
        Customer Insights
      </h2>

      <p
        className="
          mt-1

          text-sm

          text-text-secondary
        "
      >
        Behavioral & commerce analytics
      </p>

    </div>

  </div>



  {/* INSIGHTS */}

  <div
    className="
      space-y-4
    "
  >

    {/* FAVORITE CATEGORY */}

    <div
      className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        p-4
      "
    >

      <p
        className="
          text-[11px]
          uppercase

          tracking-[0.18em]

          text-text-secondary
        "
      >
        Favorite Category
      </p>

      <p
        className="
          mt-2

          text-sm
          font-semibold

          text-text-primary
        "
      >
        {favoriteCategory}
      </p>

    </div>



    {/* MATERIAL */}

    <div
      className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        p-4
      "
    >

      <p
        className="
          text-[11px]
          uppercase

          tracking-[0.18em]

          text-text-secondary
        "
      >
        Most Purchased Material
      </p>

      <p
        className="
          mt-2

          text-sm
          font-semibold

          text-text-primary
        "
      >
        {mostPurchasedMaterial}
      </p>

    </div>



    {/* HIGHEST ORDER */}

    <div
      className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        p-4
      "
    >

      <p
        className="
          text-[11px]
          uppercase

          tracking-[0.18em]

          text-text-secondary
        "
      >
        Highest Order Value
      </p>

      <p
        className="
          mt-2

          text-lg
          font-bold

          text-text-primary
        "
      >
        ₹
        {highestOrder?.toLocaleString()}
      </p>

    </div>





  </div>

</div>



{/* OPERATIONS RAIL */}

<div
  className="
    rounded-[2rem]

    border
    border-border

    bg-surface

    p-6

    shadow-sm
  "
>

  {/* HEADER */}

  <div
    className="
      mb-6
    "
  >

    <h2
      className="
        text-lg
        font-semibold

        text-text-primary
      "
    >
      Customer Metadata
    </h2>

    <p
      className="
        mt-1

        text-sm

        text-text-secondary
      "
    >
      Operational customer profile
    </p>

  </div>



  {/* META LIST */}

  <div
    className="
      space-y-5
    "
  >

    {/* FIRST PURCHASE */}

    <div
      className="
        flex
        items-center
        justify-between
        gap-4
      "
    >

      <p
        className="
          text-sm

          text-text-secondary
        "
      >
        First Purchase
      </p>

      <p
        className="
          text-sm
          font-semibold

          text-text-primary
        "
      >
        {
          new Date(
            firstPurchase
          ).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          )
        }
      </p>

    </div>



    {/* LAST PURCHASE */}

    <div
      className="
        flex
        items-center
        justify-between
        gap-4
      "
    >

      <p
        className="
          text-sm

          text-text-secondary
        "
      >
        Last Purchase
      </p>

      <p
        className="
          text-sm
          font-semibold

          text-text-primary
        "
      >
        {
          new Date(
            lastPurchase
          ).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          )
        }
      </p>

    </div>



    {/* PAYMENT */}

    <div
      className="
        flex
        items-center
        justify-between
        gap-4
      "
    >

      <p
        className="
          text-sm

          text-text-secondary
        "
      >
        Preferred Payment
      </p>

      <p
        className="
          text-sm
          font-semibold

          text-text-primary
        "
      >
        {preferredPayment}
      </p>

    </div>



    {/* AVG ORDER */}

    <div
      className="
        flex
        items-center
        justify-between
        gap-4
      "
    >

      <p
        className="
          text-sm

          text-text-secondary
        "
      >
        Avg Order Value
      </p>

      <p
        className="
          text-sm
          font-semibold

          text-text-primary
        "
      >
        ₹
        {
          Math.floor(
            customer.totalSpent /
            customer.totalOrders
          ).toLocaleString()
        }
      </p>

    </div>



    {/* ITEMS */}

    <div
      className="
        flex
        items-center
        justify-between
        gap-4
      "
    >

      <p
        className="
          text-sm

          text-text-secondary
        "
      >
        Total Items Bought
      </p>

      <p
        className="
          text-sm
          font-semibold

          text-text-primary
        "
      >
        {totalItemsBought}
      </p>

    </div>



    {/* REGION */}

    <div
      className="
        flex
        items-center
        justify-between
        gap-4
      "
    >

      <p
        className="
          text-sm

          text-text-secondary
        "
      >
        Region
      </p>

      <p
        className="
          text-sm
          font-semibold

          text-text-primary
        "
      >
        {region}
      </p>

    </div>

  </div>

</div>

          </div>

        </div>

      </div>

    </div>

  );

}
