import { NavLink } from "react-router-dom";

import {
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";

const navSections = [
  {
    title: "Overview",

    links: [
      {
        label: "Dashboard",
        path: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Commerce",

    links: [
      {
        label: "Products",
        path: "/admin/products",
        icon: Package,
      },

      {
        label: "Orders",
        path: "/admin/orders",
        icon: ShoppingCart,
        badge: 12,
      },
    ],
  },

  {
    title: "Customers",

    links: [
      {
        label: "Customers",
        path: "/admin/customers",
        icon: Users,
      },
    ],
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* overlay */}

      <div
        onClick={() => setSidebarOpen(false)}
        className={`
          fixed
          inset-0
          bg-black/40
          backdrop-blur-sm
          z-40
          transition-all
          duration-300
          md:hidden

          ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* sidebar */}

      <aside
        className={`
    fixed
    top-0
    left-0
    z-50

    h-screen
    w-[280px]

    bg-surface

    border-r
    border-border

    px-4
    py-5

    flex
    flex-col

    transition-transform
    duration-300

    shadow-[0_0_40px_rgba(0,0,0,0.08)]

    md:translate-x-0

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        {/* top */}

        <div
          className="
            flex
            items-center
            justify-between
            mb-10
          "
        >
          {/* brand */}

          <div
            className="
              flex
              items-center
              gap-3
              px-1
            "
          >
            {/* text */}

            <div
              className="
                flex
                flex-col
                leading-tight
              "
            >
              <span
                className="
                  text-[14px]
                  font-semibold
                  tracking-wide
                  text-text-primary
                "
              >
                Gemora
              </span>

              <span
                className="
                  text-[11px]
                 text-text-secondary
                  mt-0.5
                "
              >
                Admin Dashboard
              </span>
            </div>
          </div>

          {/* mobile close */}

          <button
            onClick={() => setSidebarOpen(false)}
            className="
              md:hidden

              h-9
              w-9

              rounded-xl

              bg-black/[0.04]

              flex
              items-center
              justify-center

             text-text-secondary
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* navigation */}

        <div
          className="
            flex-1
            overflow-y-auto
            pr-1
          "
        >
          {navSections.map((section) => (
            <div key={section.title} className="mb-7">
              {/* section title */}

              <p
                className="
                  px-4
                  mb-3

                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]

                 text-text-secondary
                "
              >
                {section.title}
              </p>

              {/* links */}

              <div
                className="
                  flex
                  flex-col
                  gap-1.5
                "
              >
                {section.links.map((link) => {
                  const Icon = link.icon;

                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={link.path === "/admin"}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) => `
                        relative
                        overflow-hidden

                        flex
                        items-center
                        gap-3

                        px-4
                        py-2

                        rounded-xl

                        text-sm
                        font-medium

                        transition-all
                        duration-200

                        ${
                          isActive
                            ? `
                              bg-brand/10
                              text-brand

                              border
                              border-[#6B1A2A]/10

                              shadow-sm
                            `
                            : `
                              text-text-secondary

                            hover:bg-surface-secondary
                              hover:text-black
                            `
                        }
                      `}
                    >
                      {({ isActive }) => (
                        <>
                          {/* active indicator */}

                          {isActive && (
                            <div
                              className="
                                absolute
                                left-0
                                top-2
                                bottom-2

                                w-1

                                rounded-r-full

                                bg-brand
                              "
                            />
                          )}

                          {/* icon */}

                          <Icon size={18} className="shrink-0" />

                          {/* label */}

                          <span className="flex-1">{link.label}</span>

                          {/* badge */}

                          {link.badge && (
                            <span
                              className="
                                text-[11px]
                                font-semibold

                                bg-brand
                                text-white

                                px-2
                                py-0.5

                                rounded-full
                              "
                            >
                              {link.badge}
                            </span>
                          )}

                          {/* arrow */}

                          {!link.badge && (
                            <ChevronRight
                              size={15}
                              className="
                                opacity-40
                              "
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* footer */}

        <div
          className="
            pt-5
            mt-3

            border-t
           border-border
          "
        >
          {/* settings */}

          <NavLink
            to="/admin/settings"
            className="
              flex
              items-center
              gap-3

              px-4
              py-2

              rounded-xl

              text-sm
              font-medium
             text-text-secondary

              hover:bg-surface-secondary
              hover:text-black

              transition-all
            "
          >
            <Settings size={18} />
            Settings
          </NavLink>

          {/* logout */}

          <button
            className="
              w-full

              flex
              items-center
              gap-3

              px-4
              py-2

              rounded-xl

              text-sm
              font-medium

              text-red-500

             hover:bg-red-500/10

              transition-all
            "
          >
            <LogOut size={18} />
            Logout
          </button>

          {/* admin card */}

          <div
            className="
              mt-5

              rounded-2xl

            bg-surface-secondary

              border
              border-border

              p-4

              shadow-sm
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              {/* avatar */}

              <div
                className="
                  relative
                  shrink-0
                "
              >
                <div
                  className="
                    h-11
                    w-11

                    rounded-full

                    bg-brand

                    flex
                    items-center
                    justify-center

                    text-white
                    font-semibold
                    text-sm
                  "
                >
                  A
                </div>

                {/* online dot */}

                <div
                  className="
                    absolute
                    bottom-0
                    right-0

                    h-3
                    w-3

                    rounded-full

                    bg-green-500

                    border-2
                 border-surface
                  "
                />
              </div>

              {/* info */}

              <div className="min-w-0">
                <p
                  className="
                    text-sm
                    font-semibold
                   text-text-primary

                    truncate
                  "
                >
                  Abdus
                </p>

                <p
                  className="
                    text-xs
                   text-text-secondary
                    mt-0.5
                  "
                >
                  Super Admin
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
