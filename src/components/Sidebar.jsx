import { NavLink } from "react-router-dom";
import logo from "../assets/icon/logo.png";

import { LayoutDashboard, Package, ShoppingCart, Users, X } from "lucide-react";

const links = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },

  {
    label: "Products",
    path: "/admin/products",
    icon: Package,
  },

  {
    label: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },

  {
    label: "Customers",
    path: "/admin/customers",
    icon: Users,
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
          z-40
          transition-opacity
          duration-300
          md:hidden

          ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50

          h-screen
          w-[260px]

          bg-white
          border-r
          border-black/5

          p-5

          flex
          flex-col

          transition-transform
          duration-300

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
          <div
            className="
     flex
      items-center
       gap-3
       px-1
  "
          >
            {/* logo */}
            <div
              className="
      h-11
      flex
      items-center
      justify-center
      shrink-0
    "
            >
              <img
                src={logo}
                alt="Gemora"
                className="
        h-10
        w-auto
        object-contain
      "
              />
            </div>

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
        text-[13px]
        font-semibold
        tracking-wide
        text-[#1A1A1A]
      "
              >
                Operations
              </span>

              <span
                className="
        text-[11px]
        text-black/45
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
              text-black/60
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* nav */}
        <nav
          className="
            flex
            flex-col
            gap-2
          "
        >
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex
                  items-center
                  gap-3

                  px-4
                  py-3

                  rounded-2xl

                  text-sm
                  font-medium

                  transition-all
                  duration-200

                  ${
                    isActive
                      ? `
                        bg-[#6B1A2A]
                        text-white
                      `
                      : `
                        text-black/70
                        hover:bg-black/[0.04]
                      `
                  }
                `}
              >
                <Icon size={18} />

                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
