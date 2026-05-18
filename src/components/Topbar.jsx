import { Bell, ChevronDown, Menu, Moon, Search, Sun } from "lucide-react";
import {
  Link,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import useLogout
from "../hooks/useLogout";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { getNotifications } from "@/services/notificationService";

export default function Topbar({ setSidebarOpen }) {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );
  const { user } =
  useAuth();

const logout =
  useLogout();

const [profileOpen,
  setProfileOpen] =
    useState(false);

const dropdownRef =
  useRef(null);


  const toggleTheme = () => {
    const html = document.documentElement;

    html.classList.toggle("dark");

    const dark = html.classList.contains("dark");

    setIsDark(dark);

    localStorage.setItem("theme", dark ? "dark" : "light");
  };


  const [notifications,
  setNotifications] =
    useState([]);

const [unreadCount,
  setUnreadCount] =
    useState(0);

const [open,
  setOpen] =
    useState(false);




    useEffect(() => {

  async function
  loadNotifications() {

    try {

      const data =
        await getNotifications();

      setNotifications(
        data.notifications
      );

      setUnreadCount(
        data.unreadCount
      );

    } catch (err) {

      console.error(err);

    }

  }

  loadNotifications();

}, []);


  useEffect(() => {

  function handleClickOutside(
    event
  ) {

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(
        event.target
      )
    ) {

      setProfileOpen(false);

    }

  }

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {

    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

  };

}, []);

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
    <div className="relative">

  {/* trigger */}

  <button

    onClick={() =>
      setOpen(!open)
    }

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

  {open && (

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

          notifications.map(
            (item) => (

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

                    ${
                      item.read
                        ? "bg-border"
                        : "bg-brand"
                    }
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

            )
          )

        )}

      </div>

    </div>

  )}

</div>




      {/* profile dropdown */}

<div
  ref={dropdownRef}
  className="relative"
>


  {/* trigger */}

<button

  onClick={() =>
    setProfileOpen(
      !profileOpen
    )
  }

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
      {user?.name
        ?.charAt(0)
        ?.toUpperCase()}
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

          onClick={() =>
            setProfileOpen(false)
          }

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

          onClick={() =>
            setProfileOpen(false)
          }

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
