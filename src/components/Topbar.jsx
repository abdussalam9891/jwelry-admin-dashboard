import { Bell, ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";
import { useState } from "react";

export default function Topbar({ setSidebarOpen }) {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );
  const toggleTheme = () => {
    const html = document.documentElement;

    html.classList.toggle("dark");

    const dark = html.classList.contains("dark");

    setIsDark(dark);

    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  return (
    <header
      className="
        sticky
        top-0
        z-30

        h-[68px]

        border-b
        border-border

        bg-surface/80
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
          onClick={() => setSidebarOpen(true)}
          className="
            md:hidden
            text-text-secondary
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
              text-text-primary
            "
          >
            Dashboard
          </h1>

          <p
            className="
              text-sm
              text-text-secondary
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
             text-text-secondary
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
             border-border
             bg-surface-secondary



              pl-11
              pr-4

              text-sm

              outline-none


              focus:bg-surface

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
        {/* {theme button } */}

        <button
          onClick={toggleTheme}
          className="
    flex
    h-11
    w-11
    items-center
    justify-center

    rounded-2xl

    border
    border-border

    bg-surface

    text-text-primary

    transition-colors

    hover:bg-surface-secondary
  "
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* notification */}
        <button
          className="
            relative

            w-10
            h-10

            rounded-xl

            border
            border-border

            bg-surface

            flex
            items-center
            justify-center

            hover:bg-surface-secondary

            transition
          "
        >
          <Bell size={18} className="text-text-primary" />

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
            border-border

            bg-surface

            px-3
            py-2

            hover:bg-surface-secondary

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

              bg-brand

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
               text-text-primary
                leading-none
              "
            >
              Abdus
            </p>

            <p
              className="
                mt-1
                text-xs
                text-text-secondary
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
             text-text-secondary
            "
          />
        </button>
      </div>
    </header>
  );
}
