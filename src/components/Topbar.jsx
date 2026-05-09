import {
  Menu,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

export default function Topbar({
  setSidebarOpen,
}) {
  return (
    <header
      className="
        sticky
        top-0
        z-30

        h-[68px]

        border-b
        border-black/5

        bg-white/80
        backdrop-blur-xl

        px-4
        md:px-6

        flex
        items-center
        justify-between
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* mobile menu */}
        <button
          onClick={() =>
            setSidebarOpen(true)
          }
          className="
            md:hidden
            text-black/70
          "
        >
          <Menu size={22} />
        </button>

        {/* title */}
        <div className="hidden md:block">
          <h1
            className="
              text-[22px]
              font-semibold
              tracking-tight
              text-[#111111]
            "
          >
            Dashboard
          </h1>

          <p
            className="
              text-sm
              text-[#6D7175]
              mt-0.5
            "
          >
            Store operations overview
          </p>
        </div>
      </div>

      {/* CENTER SEARCH */}
      <div
        className="
          hidden
          lg:flex

          items-center

          w-full
          max-w-xl

          mx-8
        "
      >
        <div
          className="
            relative
            w-full
          "
        >
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
            placeholder="Search products, orders, customers..."
            className="
              w-full
              h-11

              rounded-xl

              border
              border-black/5

              bg-[#F6F7F9]

              pl-11
              pr-4

              text-sm

              outline-none

              focus:border-black/15
              focus:bg-white

              transition
            "
          />
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        {/* notification */}
        <button
          className="
            relative

            w-10
            h-10

            rounded-xl

            border
            border-black/5

            bg-white

            flex
            items-center
            justify-center

            hover:bg-[#F8F8F8]

            transition
          "
        >
          <Bell
            size={18}
            className="text-[#444]"
          />

          {/* notification dot */}
          <span
            className="
              absolute
              top-2.5
              right-2.5

              h-2
              w-2

              rounded-full
              bg-red-500
            "
          />
        </button>

        {/* profile */}
        <button
          className="
            flex
            items-center
            gap-3

            rounded-xl

            border
            border-black/5

            bg-white

            px-3
            py-2

            hover:bg-[#F8F8F8]

            transition
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center

              rounded-full

              bg-[#6B1A2A]

              text-sm
              font-semibold
              text-white
            "
          >
            A
          </div>

          <div className="hidden sm:block text-left">
            <p
              className="
                text-sm
                font-medium
                text-[#111]
                leading-none
              "
            >
              Abdus
            </p>

            <p
              className="
                mt-1
                text-xs
                text-[#6D7175]
              "
            >
              Super Admin
            </p>
          </div>

          <ChevronDown
            size={16}
            className="
              hidden
              sm:block
              text-black/40
            "
          />
        </button>
      </div>
    </header>
  );
}
