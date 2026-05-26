import { Bell, ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { useEffect, useRef, useState } from "react";
import useLogout from "../hooks/useLogout";

import { getNotifications } from "@/services/notificationService";
import { globalSearch } from "@/services/searchService";

export default function Topbar({ setSidebarOpen }) {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );
  const { user } = useAuth();

  const logout = useLogout();

  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [searchResults, setSearchResults] = useState({
    products: [],
    orders: [],
    customers: [],
  });

  const [searchLoading, setSearchLoading] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);

  const [notifications, setNotifications] = useState([]);

  const [unreadCount, setUnreadCount] = useState(0);

  const [notificationOpen, setNotificationOpen] = useState(false);



  const searchRef = useRef(null);

  const toggleTheme = () => {
    const html = document.documentElement;

    html.classList.toggle("dark");

    const dark = html.classList.contains("dark");

    setIsDark(dark);

    localStorage.setItem("theme", dark ? "dark" : "light");
  };



  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await getNotifications();

        setNotifications(data.notifications);

        setUnreadCount(data.unreadCount);
      } catch (err) {
        console.error(err);
      }
    }

    loadNotifications();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      /* PROFILE */

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }


      if (
  searchRef.current &&
  !searchRef.current.contains(
    event.target
  )
) {
  setSearchOpen(false);
}



      /* NOTIFICATIONS */

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const flatResults = [
  ...searchResults.products.map(
    (item) => ({
      ...item,
      type: "product",
    })
  ),

  ...searchResults.orders.map(
    (item) => ({
      ...item,
      type: "order",
    })
  ),

  ...searchResults.customers.map(
    (item) => ({
      ...item,
      type: "customer",
    })
  ),
];


useEffect(() => {
  if (!search.trim()) {
    setSearchResults({
      products: [],
      orders: [],
      customers: [],
    });

    setSearchOpen(false);
    setActiveIndex(-1);
    return;
  }

  const timer =
    setTimeout(
      async () => {
        try {
          setSearchLoading(true);

          const data =
            await globalSearch(
              search
            );

          setSearchResults(
            data
          );

          setSearchOpen(true);
        } catch (err) {
          console.error(err);
        } finally {
          setSearchLoading(false);
        }
      },
      300
    );

  return () =>
    clearTimeout(timer);
}, [search]);


const handleSearchSelect =
  (item) => {
    if (
      item.type ===
      "product"
    ) {
      navigate(
        `/admin/products/${item._id}`
      );
    }

    if (
      item.type ===
      "order"
    ) {
      navigate(
        `/admin/orders/${item._id}`
      );
    }

    if (
      item.type ===
      "customer"
    ) {
      navigate(
        `/admin/customers/${item._id}`
      );
    }

    setSearch("");
    setSearchOpen(false);
    setActiveIndex(-1);
  };




  const handleSearchKeyDown =
  (e) => {
    if (!searchOpen) return;

    if (
      e.key ===
      "ArrowDown"
    ) {
      e.preventDefault();

      setActiveIndex(
        (prev) =>
          prev <
          flatResults.length - 1
            ? prev + 1
            : 0
      );
    }

    if (
      e.key ===
      "ArrowUp"
    ) {
      e.preventDefault();

      setActiveIndex(
        (prev) =>
          prev > 0
            ? prev - 1
            : flatResults.length -
              1
      );
    }

    if (
      e.key === "Enter" &&
      activeIndex >= 0
    ) {
      handleSearchSelect(
        flatResults[
          activeIndex
        ]
      );
    }

    if (
      e.key === "Escape"
    ) {
      setSearchOpen(false);
    }
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
     {/* CENTER SEARCH */}
<div
  ref={searchRef}
  className="
    hidden
    lg:flex
    items-center
    w-full
    max-w-xl
    mx-8
    relative
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
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
      onFocus={() => {
        if (
          search.trim()
        ) {
          setSearchOpen(
            true
          );
        }
      }}
      onKeyDown={
        handleSearchKeyDown
      }
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

    {/* DROPDOWN */}
    {searchOpen && (
      <div
        className="
          absolute
          top-[calc(100%+12px)]
          left-0
          z-50
          w-full
          overflow-hidden
          rounded-3xl
          border
          border-border
          bg-surface
          shadow-2xl
        "
      >
        {/* LOADING */}
        {searchLoading ? (
          <div
            className="
              p-6
              text-center
              text-sm
              text-text-secondary
            "
          >
            Searching...
          </div>
        ) : flatResults.length ===
          0 ? (
          /* EMPTY */
          <div
            className="
              p-6
              text-center
              text-sm
              text-text-secondary
            "
          >
            No results found
          </div>
        ) : (
          <div
            className="
              max-h-[430px]
              overflow-y-auto
            "
          >
            {/* PRODUCTS */}
            {searchResults
              .products
              .length > 0 && (
              <div>
                <p
                  className="
                    px-5
                    py-3
                    text-xs
                    font-semibold
                    uppercase
                    text-text-secondary
                  "
                >
                  Products
                </p>

                {searchResults.products.map(
                  (
                    product,
                    idx
                  ) => (
                    <button
                      key={
                        product._id
                      }
                      onClick={() =>
                        handleSearchSelect(
                          {
                            ...product,
                            type: "product",
                          }
                        )
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        gap-4
                        px-5
                        py-3
                        text-left
                        transition
                        hover:bg-surface-secondary
                        ${
                          activeIndex ===
                          idx
                            ? "bg-surface-secondary"
                            : ""
                        }
                      `}
                    >
                      <img
                        src={
                          product
                            .images?.[0]
                            ?.url
                        }
                        alt={
                          product.name
                        }
                        className="
                          h-12
                          w-12
                          rounded-2xl
                          object-cover
                          border
                          border-border
                        "
                      />

                      <div>
                        <p
                          className="
                            text-sm
                            font-medium
                            text-text-primary
                          "
                        >
                          {
                            product.name
                          }
                        </p>

                        <p
                          className="
                            text-xs
                            text-text-secondary
                          "
                        >
                          {
                            product.category
                          }
                        </p>
                      </div>
                    </button>
                  )
                )}
              </div>
            )}

            {/* ORDERS */}
            {searchResults
              .orders
              .length > 0 && (
              <div>
                <p
                  className="
                    px-5
                    py-3
                    text-xs
                    font-semibold
                    uppercase
                    text-text-secondary
                  "
                >
                  Orders
                </p>

                {searchResults.orders.map(
                  (
                    order,
                    idx
                  ) => {
                    const absoluteIndex =
                      searchResults
                        .products
                        .length +
                      idx;

                    return (
                      <button
                        key={
                          order._id
                        }
                        onClick={() =>
                          handleSearchSelect(
                            {
                              ...order,
                              type: "order",
                            }
                          )
                        }
                        className={`
                          w-full
                          px-5
                          py-3
                          text-left
                          transition
                          hover:bg-surface-secondary
                          ${
                            activeIndex ===
                            absoluteIndex
                              ? "bg-surface-secondary"
                              : ""
                          }
                        `}
                      >
                        <p
                          className="
                            text-sm
                            font-medium
                            text-text-primary
                          "
                        >
                          {
                            order.orderNumber
                          }
                        </p>

                        <p
                          className="
                            text-xs
                            text-text-secondary
                          "
                        >
                          {
                            order.customerName
                          }
                        </p>
                      </button>
                    );
                  }
                )}
              </div>
            )}

            {/* CUSTOMERS */}
            {searchResults
              .customers
              .length > 0 && (
              <div>
                <p
                  className="
                    px-5
                    py-3
                    text-xs
                    font-semibold
                    uppercase
                    text-text-secondary
                  "
                >
                  Customers
                </p>

                {searchResults.customers.map(
                  (
                    customer,
                    idx
                  ) => {
                    const absoluteIndex =
                      searchResults
                        .products
                        .length +
                      searchResults
                        .orders
                        .length +
                      idx;

                    return (
                      <button
                        key={
                          customer._id
                        }
                        onClick={() =>
                          handleSearchSelect(
                            {
                              ...customer,
                              type:
                                "customer",
                            }
                          )
                        }
                        className={`
                          flex
                          w-full
                          items-center
                          gap-4
                          px-5
                          py-3
                          text-left
                          transition
                          hover:bg-surface-secondary
                          ${
                            activeIndex ===
                            absoluteIndex
                              ? "bg-surface-secondary"
                              : ""
                          }
                        `}
                      >
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-brand/10
                          "
                        >
                          {customer
                            ?.avatar ? (
                            <img
                              src={
                                customer.avatar
                              }
                              alt={
                                customer.name
                              }
                              className="
                                h-full
                                w-full
                                rounded-full
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
                              {customer.name
                                ?.charAt(
                                  0
                                )
                                ?.toUpperCase()}
                            </span>
                          )}
                        </div>

                        <div>
                          <p
                            className="
                              text-sm
                              font-medium
                              text-text-primary
                            "
                          >
                            {
                              customer.name
                            }
                          </p>

                          <p
                            className="
                              text-xs
                              text-text-secondary
                            "
                          >
                            {
                              customer.email
                            }
                          </p>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )}
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
        <div ref={notificationRef} className="relative">
          {/* trigger */}

          <button
            onClick={() => setNotificationOpen((prev) => !prev)}
            className="
      relative

      flex
      h-11
      w-11
      items-center
      justify-center

      rounded-2xl

      border
      border-border

      bg-surface

      transition-all

      hover:bg-surface-secondary
    "
          >
            <Bell
              size={18}
              className="
        text-text-primary
      "
            />

            {unreadCount > 0 && (
              <span
                className="
          absolute
          right-2
          top-2

          flex
          h-2.5
          w-2.5

          rounded-full

          bg-red-500
        "
              />
            )}
          </button>

          {/* dropdown */}

          {notificationOpen && (
            <div
              className="
        absolute
        right-0
        top-[calc(100%+12px)]

        z-50

        w-[360px]

        overflow-hidden

        rounded-3xl

        border
        border-border

        bg-surface

        shadow-2xl
      "
            >
              {/* header */}

              <div
                className="
          flex
          items-center
          justify-between

          border-b
          border-border

          px-5
          py-4
        "
              >
                <div>
                  <h3
                    className="
              text-sm
              font-semibold
              text-text-primary
            "
                  >
                    Notifications
                  </h3>

                  <p
                    className="
              mt-1
              text-xs
              text-text-secondary
            "
                  >
                    Recent store activity
                  </p>
                </div>

                {unreadCount > 0 && (
                  <div
                    className="
              rounded-full

              bg-brand/10

              px-2.5
              py-1

              text-[10px]
              font-semibold

              text-brand
            "
                  >
                    {unreadCount} New
                  </div>
                )}
              </div>

              {/* list */}

              <div
                className="
          max-h-[420px]
          overflow-y-auto
        "
              >
                {notifications.length === 0 ? (
                  <div
                    className="
              p-10

              text-center

              text-sm
              text-text-secondary
            "
                  >
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((item) => (
                    <button
                      key={item._id}
                      className="
                  flex
                  w-full
                  items-start
                  gap-4

                  border-b
                  border-border

                  px-5
                  py-4

                  text-left

                  transition-all

                  hover:bg-surface-secondary
                "
                    >
                      {/* dot */}

                      <div
                        className={`
                    mt-1.5

                    h-2.5
                    w-2.5

                    rounded-full

                    ${item.read ? "bg-border" : "bg-brand"}
                  `}
                      />

                      {/* content */}

                      <div className="flex-1">
                        <p
                          className="
                      text-sm
                      font-medium
                      text-text-primary
                    "
                        >
                          {item.title}
                        </p>

                        <p
                          className="
                      mt-1
                      text-xs
                      leading-6
                      text-text-secondary
                    "
                        >
                          {item.message}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* profile dropdown */}

        <div ref={dropdownRef} className="relative">
          {/* trigger */}

          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="
    flex
    items-center
    gap-3

    rounded-2xl

    border
    border-border

    bg-surface

    px-3
    py-2

    transition-all

    hover:bg-surface-secondary
  "
          >
            {/* avatar */}

            <div
              className="
    flex
    h-10
    w-10
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
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              )}
            </div>

            {/* info */}

            <div
              className="
      hidden
      text-left
      sm:block
    "
            >
              <p
                className="
        text-sm
        font-medium
        text-text-primary
      "
              >
                {user?.name}
              </p>

              <p
                className="
        text-xs
        capitalize
        text-text-secondary
      "
              >
                {user?.role}
              </p>
            </div>

            <ChevronDown
              size={16}
              className="
      hidden
      text-text-secondary
      sm:block
    "
            />
          </button>

          {/* dropdown */}

          {profileOpen && (
            <div
              className="
        absolute
        right-0
        top-[calc(100%+12px)]

        w-[240px]

        overflow-hidden

        rounded-2xl

        border
        border-border

        bg-surface

        shadow-xl
      "
            >
              {/* top user section */}

              <div
                className="
          border-b
          border-border

          p-4
        "
              >
                <p
                  className="
            truncate

            text-sm
            font-semibold

            text-text-primary
          "
                >
                  {user?.name}
                </p>

                <p
                  className="
            mt-1

            truncate

            text-xs

            text-text-secondary
          "
                >
                  {user?.email}
                </p>
              </div>

              {/* links */}

              <div className="p-2">
                <Link
                  to="/admin/profile"
                  onClick={() => setProfileOpen(false)}
                  className="
            flex
            items-center

            rounded-xl

            px-3
            py-2

            text-sm
            font-medium

            text-text-primary

            transition

            hover:bg-surface-secondary
          "
                >
                  My Profile
                </Link>

                <Link
                  to="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  className="
            mt-1
            flex
            items-center

            rounded-xl

            px-3
            py-2

            text-sm
            font-medium

            text-text-primary

            transition

            hover:bg-surface-secondary
          "
                >
                  Settings
                </Link>

                <button
                  onClick={logout}
                  className="
            mt-1

            flex
            w-full
            items-center

            rounded-xl

            px-3
            py-2

            text-left
            text-sm
            font-medium

            text-red-500

            transition

            hover:bg-red-500/10
          "
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
