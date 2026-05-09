import {
  Search,
  Filter,
  Eye,
  PackageCheck,
  Clock3,
  Truck,
  XCircle,
} from "lucide-react";

export default function Orders() {

  return (

    <div className="space-y-6">

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

          <h1
            className="
              text-3xl
              font-bold
              tracking-tight
              text-[#1A1A1A]
            "
          >
            Orders
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-[#6D7175]
            "
          >
            Monitor customer purchases,
            fulfillment and payment activity.
          </p>

        </div>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <button
            className="
              rounded-xl
              border
              border-black/10

              bg-white

              px-5
              py-3

              text-sm
              font-medium

              transition
              hover:bg-[#F6F6F7]
            "
          >
            Export
          </button>

          <button
            className="
              rounded-xl
              bg-black

              px-5
              py-3

              text-sm
              font-medium
              text-white

              transition
              hover:opacity-90
            "
          >
            Create Order
          </button>

        </div>

      </div>

      {/* KPI */}
      <div
        className="
          grid
          grid-cols-1
          gap-4

          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        <div
          className="
            rounded-3xl
            border
            border-black/5

            bg-white
            p-6

            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p className="text-sm text-[#6D7175]">
                Total Orders
              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                "
              >
                184
              </h2>

            </div>

            <div
              className="
                flex
                h-12
                w-12

                items-center
                justify-center

                rounded-2xl

                bg-black
                text-white
              "
            >
              <PackageCheck size={22} />
            </div>

          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-black/5

            bg-white
            p-6

            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p className="text-sm text-[#6D7175]">
                Processing
              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                "
              >
                24
              </h2>

            </div>

            <div
              className="
                flex
                h-12
                w-12

                items-center
                justify-center

                rounded-2xl

                bg-yellow-100
                text-yellow-700
              "
            >
              <Clock3 size={22} />
            </div>

          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-black/5

            bg-white
            p-6

            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p className="text-sm text-[#6D7175]">
                Shipped
              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                "
              >
                58
              </h2>

            </div>

            <div
              className="
                flex
                h-12
                w-12

                items-center
                justify-center

                rounded-2xl

                bg-blue-100
                text-blue-700
              "
            >
              <Truck size={22} />
            </div>

          </div>

        </div>

        <div
          className="
            rounded-3xl
            border
            border-black/5

            bg-white
            p-6

            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p className="text-sm text-[#6D7175]">
                Cancelled
              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                "
              >
                6
              </h2>

            </div>

            <div
              className="
                flex
                h-12
                w-12

                items-center
                justify-center

                rounded-2xl

                bg-red-100
                text-red-700
              "
            >
              <XCircle size={22} />
            </div>

          </div>

        </div>

      </div>

      {/* FILTER BAR */}
      <div
        className="
          flex
          flex-col
          gap-4

          rounded-3xl
          border
          border-black/5

          bg-white
          p-4

          shadow-sm

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <div
          className="
            flex
            flex-1
            items-center
            gap-3
          "
        >

          <div className="relative flex-1">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                text-black/40
              "
            />

            <input
              type="text"
              placeholder="Search orders..."
              className="
                w-full

                rounded-2xl
                border
                border-black/10

                bg-[#F6F6F7]

                py-3
                pl-11
                pr-4

                text-sm
                outline-none

                focus:border-black
              "
            />

          </div>

          <button
            className="
              flex
              items-center
              gap-2

              rounded-2xl
              border
              border-black/10

              bg-[#F6F6F7]

              px-4
              py-3

              text-sm
              font-medium
            "
          >

            <Filter size={16} />

            Filters

          </button>

        </div>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <select
            className="
              rounded-2xl
              border
              border-black/10

              bg-[#F6F6F7]

              px-4
              py-3

              text-sm
              outline-none
            "
          >
            <option>All Status</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <select
            className="
              rounded-2xl
              border
              border-black/10

              bg-[#F6F6F7]

              px-4
              py-3

              text-sm
              outline-none
            "
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Highest Value</option>
          </select>

        </div>

      </div>

      {/* TABLE */}
      <div
        className="
          overflow-hidden

          rounded-3xl
          border
          border-black/5

          bg-white

          shadow-sm
        "
      >

        <div className="overflow-x-auto">

          <table className="min-w-full border-collapse">

            <thead>

              <tr
                className="
                  border-b
                  border-black/5

                  bg-[#FAFAFA]

                  text-left
                "
              >

                <th
                  className="
                    px-6
                    py-4

                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide

                    text-[#6D7175]
                  "
                >
                  Order
                </th>

                <th
                  className="
                    px-6
                    py-4

                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide

                    text-[#6D7175]
                  "
                >
                  Customer
                </th>

                <th
                  className="
                    px-6
                    py-4

                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide

                    text-[#6D7175]
                  "
                >
                  Date
                </th>

                <th
                  className="
                    px-6
                    py-4

                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide

                    text-[#6D7175]
                  "
                >
                  Amount
                </th>

                <th
                  className="
                    px-6
                    py-4

                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide

                    text-[#6D7175]
                  "
                >
                  Payment
                </th>

                <th
                  className="
                    px-6
                    py-4

                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide

                    text-[#6D7175]
                  "
                >
                  Fulfillment
                </th>

                <th
                  className="
                    px-6
                    py-4

                    text-right

                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide

                    text-[#6D7175]
                  "
                >
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {[1,2,3,4,5,6].map((item) => (

                <tr
                  key={item}
                  className="
                    border-b
                    border-black/5

                    transition
                    hover:bg-[#FAFAFA]
                  "
                >

                  <td className="px-6 py-5">

                    <div>

                      <h3
                        className="
                          font-semibold
                          text-[#1A1A1A]
                        "
                      >
                        #ORD-102{item}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-[#6D7175]
                        "
                      >
                        3 items
                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-5">

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >

                      <div
                        className="
                          flex
                          h-11
                          w-11

                          items-center
                          justify-center

                          rounded-full

                          bg-black
                          text-sm
                          font-semibold
                          text-white
                        "
                      >
                        A
                      </div>

                      <div>

                        <h3 className="font-medium">
                          Abdus Salam
                        </h3>

                        <p
                          className="
                            mt-1
                            text-sm
                            text-[#6D7175]
                          "
                        >
                          abdu@gmail.com
                        </p>

                      </div>

                    </div>

                  </td>

                  <td
                    className="
                      px-6
                      py-5
                      text-[#4A4A4A]
                    "
                  >
                    8 May 2026
                  </td>

                  <td
                    className="
                      px-6
                      py-5

                      font-semibold
                      text-[#1A1A1A]
                    "
                  >
                    ₹12,000
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className="
                        rounded-full

                        bg-green-100

                        px-3
                        py-1

                        text-xs
                        font-semibold
                        text-green-700
                      "
                    >
                      Paid
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <span
                      className="
                        rounded-full

                        bg-yellow-100

                        px-3
                        py-1

                        text-xs
                        font-semibold
                        text-yellow-700
                      "
                    >
                      Processing
                    </span>

                  </td>

                  <td
                    className="
                      px-6
                      py-5
                      text-right
                    "
                  >

                    <button
                      className="
                        inline-flex
                        items-center
                        gap-2

                        rounded-xl
                        border
                        border-black/10

                        px-4
                        py-2

                        text-sm
                        font-medium

                        transition
                        hover:bg-black
                        hover:text-white
                      "
                    >

                      <Eye size={16} />

                      View

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}
        <div
          className="
            flex
            flex-col
            gap-4

            border-t
            border-black/5

            px-6
            py-4

            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <p
            className="
              text-sm
              text-[#6D7175]
            "
          >
            Showing 1-10 of 184 orders
          </p>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <button
              className="
                rounded-xl
                border
                border-black/10

                px-4
                py-2

                text-sm
                font-medium

                transition
                hover:bg-[#F6F6F7]
              "
            >
              Previous
            </button>

            <button
              className="
                rounded-xl
                bg-black

                px-4
                py-2

                text-sm
                font-medium
                text-white
              "
            >
              1
            </button>

            <button
              className="
                rounded-xl
                border
                border-black/10

                px-4
                py-2

                text-sm
                font-medium

                transition
                hover:bg-[#F6F6F7]
              "
            >
              2
            </button>

            <button
              className="
                rounded-xl
                border
                border-black/10

                px-4
                py-2

                text-sm
                font-medium

                transition
                hover:bg-[#F6F6F7]
              "
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}
