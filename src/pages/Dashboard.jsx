 import {
  IndianRupee,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function Dashboard() {

  return (

    <div className="space-y-6">

      {/* HERO */}
      <div
        className="
          rounded-3xl
          border
          border-black/5

          bg-gradient-to-br
          from-[#111111]
          to-[#1C1C1C]

          p-8
          text-white

          shadow-xl
        "
      >

        <div
          className="
            flex
            flex-col
            gap-6

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div>

            <p className="text-sm text-white/60">
              Welcome back
            </p>

            <h1
              className="
                mt-2
                text-4xl
                font-bold
                tracking-tight
              "
            >
              Store Performance
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-relaxed
                text-white/70
              "
            >
              Monitor revenue, inventory,
              customer activity and order
              operations across your store.
            </p>

          </div>

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <button
              className="
                rounded-xl
                bg-white
                px-5
                py-3

                text-sm
                font-semibold
                text-black

                transition
                hover:opacity-90
              "
            >
              Export Report
            </button>

            <button
              className="
                rounded-xl
                border
                border-white/10

                bg-white/5

                px-5
                py-3

                text-sm
                font-semibold
                text-white

                backdrop-blur-xl

                transition
                hover:bg-white/10
              "
            >
              View Analytics
            </button>

          </div>

        </div>

      </div>

      {/* KPI CARDS */}
      <div
        className="
          grid
          grid-cols-1
          gap-4

          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {/* Revenue */}
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
              items-start
              justify-between
            "
          >

            <div>

              <p className="text-sm text-[#6D7175]">
                Total Revenue
              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                  tracking-tight
                "
              >
                ₹4.2L
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

                bg-green-100
                text-green-700
              "
            >
              <IndianRupee size={22} />
            </div>

          </div>

          <div
            className="
              mt-6
              flex
              items-center
              gap-2
            "
          >

            <TrendingUp
              size={16}
              className="text-green-600"
            />

            <span
              className="
                text-sm
                font-medium
                text-green-600
              "
            >
              +18.4%
            </span>

            <span
              className="
                text-sm
                text-[#6D7175]
              "
            >
              this month
            </span>

          </div>

        </div>

        {/* Orders */}
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
              items-start
              justify-between
            "
          >

            <div>

              <p className="text-sm text-[#6D7175]">
                Orders
              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                  tracking-tight
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

                bg-blue-100
                text-blue-700
              "
            >
              <ShoppingCart size={22} />
            </div>

          </div>

          <div
            className="
              mt-6
              flex
              items-center
              gap-2
            "
          >

            <TrendingUp
              size={16}
              className="text-green-600"
            />

            <span
              className="
                text-sm
                font-medium
                text-green-600
              "
            >
              +12.2%
            </span>

            <span
              className="
                text-sm
                text-[#6D7175]
              "
            >
              from last week
            </span>

          </div>

        </div>

        {/* Customers */}
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
              items-start
              justify-between
            "
          >

            <div>

              <p className="text-sm text-[#6D7175]">
                Customers
              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                  tracking-tight
                "
              >
                42
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

                bg-purple-100
                text-purple-700
              "
            >
              <Users size={22} />
            </div>

          </div>

          <div
            className="
              mt-6
              flex
              items-center
              gap-2
            "
          >

            <TrendingUp
              size={16}
              className="text-green-600"
            />

            <span
              className="
                text-sm
                font-medium
                text-green-600
              "
            >
              +8.7%
            </span>

            <span
              className="
                text-sm
                text-[#6D7175]
              "
            >
              active users
            </span>

          </div>

        </div>

        {/* Low Stock */}
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
              items-start
              justify-between
            "
          >

            <div>

              <p className="text-sm text-[#6D7175]">
                Low Stock
              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                  tracking-tight
                "
              >
                5
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
              <AlertTriangle size={22} />
            </div>

          </div>

          <div
            className="
              mt-6
              flex
              items-center
              gap-2
            "
          >

            <TrendingDown
              size={16}
              className="text-red-600"
            />

            <span
              className="
                text-sm
                font-medium
                text-red-600
              "
            >
              Needs attention
            </span>

          </div>

        </div>

      </div>

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-1
          gap-6

          xl:grid-cols-3
        "
      >

        {/* SALES CHART */}
        <div
          className="
            xl:col-span-2

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

              <h2
                className="
                  text-lg
                  font-semibold
                  text-[#1A1A1A]
                "
              >
                Revenue Overview
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#6D7175]
                "
              >
                Monthly sales performance
              </p>

            </div>

            <select
              className="
                rounded-xl
                border
                border-black/10

                bg-[#F6F6F7]

                px-4
                py-2

                text-sm
                outline-none
              "
            >
              <option>Last 6 Months</option>
            </select>

          </div>

          {/* Fake Chart */}
          <div
            className="
              mt-8
              flex
              h-[320px]
              items-end
              gap-4
            "
          >

            {[40, 60, 55, 80, 72, 95].map(
              (height, index) => (

                <div
                  key={index}
                  className="flex-1"
                >

                  <div
                    style={{
                      height: `${height}%`,
                    }}
                    className="
                      rounded-t-2xl

                      bg-gradient-to-t
                      from-black
                      to-[#404040]

                      transition
                      hover:opacity-80
                    "
                  />

                </div>

              )
            )}

          </div>

        </div>

        {/* QUICK INSIGHTS */}
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

          <h2
            className="
              text-lg
              font-semibold
              text-[#1A1A1A]
            "
          >
            Quick Insights
          </h2>

          <div className="mt-6 space-y-5">

            <div
              className="
                rounded-2xl
                bg-[#F6F6F7]
                p-4
              "
            >

              <p className="text-sm text-[#6D7175]">
                Best Selling Category
              </p>

              <h3
                className="
                  mt-2
                  text-xl
                  font-bold
                "
              >
                Diamond
              </h3>

            </div>

            <div
              className="
                rounded-2xl
                bg-[#F6F6F7]
                p-4
              "
            >

              <p className="text-sm text-[#6D7175]">
                Conversion Rate
              </p>

              <h3
                className="
                  mt-2
                  text-xl
                  font-bold
                "
              >
                4.8%
              </h3>

            </div>

            <div
              className="
                rounded-2xl
                bg-[#F6F6F7]
                p-4
              "
            >

              <p className="text-sm text-[#6D7175]">
                Returning Customers
              </p>

              <h3
                className="
                  mt-2
                  text-xl
                  font-bold
                "
              >
                62%
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* LOWER GRID */}
      <div
        className="
          grid
          grid-cols-1
          gap-6

          xl:grid-cols-2
        "
      >

        {/* RECENT ORDERS */}
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

            <h2
              className="
                text-lg
                font-semibold
                text-[#1A1A1A]
              "
            >
              Recent Orders
            </h2>

            <button
              className="
                text-sm
                font-medium
                text-black/60
              "
            >
              View All
            </button>

          </div>

          <div className="mt-6 space-y-4">

            {[1,2,3,4].map((item) => (

              <div
                key={item}
                className="
                  flex
                  items-center
                  justify-between

                  rounded-2xl
                  border
                  border-black/5

                  p-4
                "
              >

                <div>

                  <h3 className="font-semibold">
                    #ORD-102{item}
                  </h3>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-[#6D7175]
                    "
                  >
                    Abdus Salam
                  </p>

                </div>

                <div className="text-right">

                  <h3 className="font-semibold">
                    ₹12,000
                  </h3>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-green-600
                    "
                  >
                    Paid
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* LOW STOCK */}
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

            <h2
              className="
                text-lg
                font-semibold
                text-[#1A1A1A]
              "
            >
              Inventory Alerts
            </h2>

            <button
              className="
                text-sm
                font-medium
                text-black/60
              "
            >
              Manage
            </button>

          </div>

          <div className="mt-6 space-y-4">

            {[1,2,3,4].map((item) => (

              <div
                key={item}
                className="
                  flex
                  items-center
                  justify-between

                  rounded-2xl
                  border
                  border-black/5

                  p-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div
                    className="
                      h-12
                      w-12

                      rounded-xl
                      bg-[#F6F6F7]
                    "
                  />

                  <div>

                    <h3 className="font-semibold">
                      Diamond Ring {item}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-[#6D7175]
                      "
                    >
                      SKU-102{item}
                    </p>

                  </div>

                </div>

                <div
                  className="
                    rounded-full
                    bg-red-100

                    px-3
                    py-1

                    text-xs
                    font-semibold
                    text-red-700
                  "
                >
                  2 Left
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}
