import { NavLink } from "react-router-dom";
import useLogout
from "../hooks/useLogout";
import { useState } from "react";

import {
  useAuth,
} from "../context/AuthContext";

import {
  Link,
} from "react-router-dom";

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
      children: [
        {
          label: "Overview",
          path: "/admin",
          exact: true,
        },
        {
          label: "Analytics",
          path: "/admin/analytics",
        },
      ],
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
        children: [
          {
            label: "All Products",
            path: "/admin/products",
             exact: true,
          },
          {
            label: "Add Product",
            path: "/admin/products/new",

          },
        ],
      },

      {
        label: "Orders",
        path: "/admin/orders",
        icon: ShoppingCart,
        children: [
          {
            label: "All Orders",
            path: "/admin/orders",
             exact: true,
          },
        ],
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
        children: [
          {
            label: "All Customers",
            path: "/admin/customers",
             exact: true,
          },
        ],
      },
    ],
  },


];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {


  const logout =
  useLogout();

const { user } =
  useAuth();

  const [openMenus, setOpenMenus] = useState({
  Dashboard: true,
  Products: false,
  Orders: false,
  Customers: false,
});

const toggleMenu = (label) => {
  setOpenMenus((prev) => ({
    ...prev,
    [label]: !prev[label],
  }));
};







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
    w-[260px]

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
            mb-7
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
    scrollbar-hide
  "
>
  {navSections.map((section) => (
    <div key={section.title} className="mb-5">
      {/* section title */}
      <p
        className="
          px-4
          mb-2
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
      <div className="flex flex-col gap-1">
        {section.links.map((link) => {
          const Icon = link.icon;
          const isOpen = openMenus[link.label];

          return (
            <div key={link.path} className="space-y-1">
              {/* PARENT */}
              <button
                onClick={() =>
                  link.children
                    ? toggleMenu(link.label)
                    : setSidebarOpen(false)
                }
                className="
                  w-full
                  group
                  flex
                  items-center
                  gap-3
                  px-4
                  py-2.5
                  rounded-xl
                  text-sm
                  font-medium
                  text-text-secondary
                  hover:bg-surface-secondary
                  hover:text-text-primary
                  transition-all
                "
              >
                <Icon size={18} className="shrink-0" />

                <span className="flex-1 text-left">
                  {link.label}
                </span>

                {link.children && (
                  <ChevronRight
                    size={15}
                    className={`
                      transition-transform
                      duration-200
                      ${isOpen ? "rotate-90" : ""}
                    `}
                  />
                )}
              </button>

              {/* CHILDREN */}
              {link.children && isOpen && (
                <div className="relative ml-7 pl-5">
                  {/* vertical line */}
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />

                  <div className="space-y-1 py-1">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        end={!!child.exact}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) => `
                          flex
                          items-center
                          gap-3
                          px-3
                          py-2
                          rounded-lg
                          text-[13px]
                          transition-all
                          ${
                            isActive
                              ? "text-brand bg-brand/10 font-medium"
                              : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                          }
                        `}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
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

          onClick={logout}
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

<Link
  to="/admin/profile"
  className="
    mt-3
    block

    rounded-2xl

    border
    border-border

    bg-surface-secondary

    p-3

    shadow-sm

    transition-all
    duration-200

    hover:border-brand/20
    hover:bg-brand/5
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
    flex
    h-9
    w-9
    shrink-0
    items-center
    justify-center

    overflow-hidden

    rounded-full

    bg-brand/10
  "
>

  {user?.avatar ? (

    <img
      src={user.avatar}

      alt={user.name}

      className="
        h-full
        w-full
        object-cover
      "
    />

  ) : (

    <span
      className="
        text-sm
        font-semibold
        text-brand
      "
    >
      {user?.name
        ?.charAt(0)
        ?.toUpperCase()}
    </span>

  )}

</div>


    {/* info */}

    <div className="min-w-0">

      <p
        className="
          truncate

          text-sm
          font-semibold

          text-text-primary
        "
      >
        {user?.name || "Admin"}
      </p>

      <p
        className="
          mt-0.5

          text-xs

          capitalize

          text-text-secondary
        "
      >
        {user?.role || "admin"}
      </p>

    </div>

  </div>

</Link>
        </div>
      </aside>
    </>
  );
}
