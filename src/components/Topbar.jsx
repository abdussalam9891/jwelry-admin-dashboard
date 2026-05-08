import {

  Menu,
  Bell,

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

        h-[72px]

        bg-white/80
        backdrop-blur-xl

        border-b
        border-black/5

        flex
        items-center
        justify-between

        px-4
        md:px-6
        lg:px-8
      "
    >

      {/* left */}
      <div
        className="
          flex
          items-center
          gap-4
        "
      >

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

        <div>

          <h2
            className="
              text-lg
              md:text-xl
              font-semibold
              text-[#1A1A1A]
            "
          >
            Dashboard
          </h2>

          <p
            className="
              hidden
              sm:block

              text-sm
              text-black/45
              mt-0.5
            "
          >
            Store operations overview
          </p>

        </div>

      </div>


      {/* right */}
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
            w-10
            h-10

            rounded-full

            border
            border-black/5

            flex
            items-center
            justify-center

            hover:bg-black/[0.03]
            transition
          "
        >

          <Bell size={18} />

        </button>

        {/* avatar */}
        <button
          className="
            w-10
            h-10

            rounded-full

            bg-[#6B1A2A]
            text-white

            font-semibold

            flex
            items-center
            justify-center
          "
        >
          A
        </button>

      </div>

    </header>

  );

}
