import {
  Moon,
  Sun,
  Bell,
  Globe,
  Shield,
  ChevronRight,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {

  updateNotificationPreferences,

} from "@/services/authService";

import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {

  const [theme, setTheme] =
    useState(
      localStorage.getItem("theme") ||
      "light"
    );

 const { user } =
  useAuth();

const [notifications,
  setNotifications] =
    useState(
      user
      ?.notificationPreferences || {}
    );


  // theme sync

  useEffect(() => {

    if (theme === "dark") {

      document.documentElement.classList.add(
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );

    }

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);


  function handleThemeChange(
    value
  ) {

    setTheme(value);

    toast.success(
      `Switched to ${value} mode`
    );

  }


async function
toggleNotification(
  key
) {

  const updated = {

    ...notifications,

    [key]:
      !notifications[key],

  };

  setNotifications(
    updated
  );

  try {

    await updateNotificationPreferences(
      updated
    );

    toast.success(
      "Preference updated"
    );

  } catch {

    toast.error(
      "Failed to update preference"
    );

  }

}

  useEffect(() => {

  if (
    user?.notificationPreferences
  ) {

    setNotifications(

      user.notificationPreferences

    );

  }

}, [user]);


  return (

    <div
      className="
        min-h-screen
        bg-background

        px-6
        py-8
      "
    >

      <div
        className="
          mx-auto
          max-w-5xl
        "
      >

        {/* HEADER */}

        <div>

          <h1
            className="
              text-3xl
              font-bold
              tracking-tight
              text-text-primary
            "
          >
            Settings
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-text-secondary
            "
          >
            Manage your dashboard
            preferences and account
            experience.
          </p>

        </div>


        {/* SETTINGS CONTAINER */}

        <div
          className="
            mt-8

            overflow-hidden

            rounded-3xl

            border
            border-border

            bg-surface

            shadow-sm
          "
        >

          {/* APPEARANCE */}

          <div className="p-6">

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center

                      rounded-2xl

                      bg-brand/10

                      text-brand
                    "
                  >
                    <Moon size={18} />
                  </div>

                  <div>

                    <h2
                      className="
                        text-lg
                        font-semibold
                        text-text-primary
                      "
                    >
                      Appearance
                    </h2>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-text-secondary
                      "
                    >
                      Customize the
                      dashboard theme.
                    </p>

                  </div>

                </div>

              </div>


              {/* theme buttons */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <button

                  onClick={() =>
                    handleThemeChange(
                      "light"
                    )
                  }

                  className={`
                    flex
                    items-center
                    gap-2

                    rounded-2xl

                    px-4
                    py-2

                    text-sm
                    font-medium

                    transition-all

                    ${
                      theme === "light"
                        ? "bg-brand text-white"
                        : "bg-surface-secondary text-text-primary"
                    }
                  `}
                >

                  <Sun size={16} />

                  Light

                </button>


                <button

                  onClick={() =>
                    handleThemeChange(
                      "dark"
                    )
                  }

                  className={`
                    flex
                    items-center
                    gap-2

                    rounded-2xl

                    px-4
                    py-2

                    text-sm
                    font-medium

                    transition-all

                    ${
                      theme === "dark"
                        ? "bg-brand text-white"
                        : "bg-surface-secondary text-text-primary"
                    }
                  `}
                >

                  <Moon size={16} />

                  Dark

                </button>

              </div>

            </div>

          </div>


          {/* NOTIFICATIONS */}

          <div
            className="
              border-t
              border-border

              p-6
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-2xl

                  bg-brand/10

                  text-brand
                "
              >
                <Bell size={18} />
              </div>

              <div>

                <h2
                  className="
                    text-lg
                    font-semibold
                    text-text-primary
                  "
                >
                  Notifications
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-text-secondary
                  "
                >
                  Control operational
                  alerts and updates.
                </p>

              </div>

            </div>


            <div className="mt-8 space-y-4">

              {[
                {
                  key: "orders",
                  title:
                    "Order Notifications",
                  desc:
                    "Receive alerts for new orders.",
                },

                {
                  key: "stockAlerts",
                  title:
                    "Low Stock Alerts",
                  desc:
                    "Get notified when inventory runs low.",
                },

                {
                  key: "customers",
                  title:
                    "Customer Activity",
                  desc:
                    "Updates about new customer registrations.",
                },

              ].map((item) => (

                <div

                  key={item.key}

                  className="
                    flex
                    items-center
                    justify-between

                    rounded-2xl

                    border
                    border-border

                    bg-surface-secondary

                    px-5
                    py-4
                  "
                >

                  <div>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-text-primary
                      "
                    >
                      {item.title}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-text-secondary
                      "
                    >
                      {item.desc}
                    </p>

                  </div>


                  {/* toggle */}

                  <button

                    onClick={() =>
                      toggleNotification(
                        item.key
                      )
                    }

                    className={`
                      relative

                      h-7
                      w-12

                      rounded-full

                      transition-all

                      ${
                        notifications[
                          item.key
                        ]
                          ? "bg-brand"
                          : "bg-border"
                      }
                    `}
                  >

                    <div
                      className={`
                        absolute
                        top-1

                        h-5
                        w-5

                        rounded-full
                        bg-white

                        transition-all

                        ${
                          notifications[
                            item.key
                          ]
                            ? "left-6"
                            : "left-1"
                        }
                      `}
                    />

                  </button>

                </div>

              ))}

            </div>

          </div>


          {/* REGIONAL */}

          <div
            className="
              border-t
              border-border

              p-6
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-2xl

                  bg-brand/10

                  text-brand
                "
              >
                <Globe size={18} />
              </div>

              <div>

                <h2
                  className="
                    text-lg
                    font-semibold
                    text-text-primary
                  "
                >
                  Regional Preferences
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-text-secondary
                  "
                >
                  Timezone and locale
                  configuration.
                </p>

              </div>

            </div>


            <div
              className="
                mt-8
                grid
                gap-4
                md:grid-cols-2
              "
            >

              <div
                className="
                  rounded-2xl

                  border
                  border-border

                  bg-surface-secondary

                  p-5
                "
              >

                <p
                  className="
                    text-sm
                    font-medium
                    text-text-primary
                  "
                >
                  Currency
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    text-text-secondary
                  "
                >
                  INR (₹)
                </p>

              </div>


              <div
                className="
                  rounded-2xl

                  border
                  border-border

                  bg-surface-secondary

                  p-5
                "
              >

                <p
                  className="
                    text-sm
                    font-medium
                    text-text-primary
                  "
                >
                  Timezone
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    text-text-secondary
                  "
                >
                  Asia/Kolkata
                </p>

              </div>

            </div>

          </div>


          {/* SECURITY */}

          <div
            className="
              border-t
              border-border

              p-6
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-2xl

                  bg-brand/10

                  text-brand
                "
              >
                <Shield size={18} />
              </div>

              <div>

                <h2
                  className="
                    text-lg
                    font-semibold
                    text-text-primary
                  "
                >
                  Authentication
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-text-secondary
                  "
                >
                  Connected provider
                  and account access.
                </p>

              </div>

            </div>


            <div
              className="
                mt-8

                rounded-2xl

                border
                border-border

                bg-surface-secondary

                p-5
              "
            >

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >

                <div>

                  <p
                    className="
                      text-sm
                      font-semibold
                      text-text-primary
                    "
                  >
                    Google OAuth
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-6
                      text-text-secondary
                    "
                  >
                    Your account is
                    authenticated using
                    Google secure login.
                  </p>

                </div>


                <a
                  href="https://myaccount.google.com/security"

                  target="_blank"

                  rel="noreferrer"

                  className="
                    flex
                    items-center
                    gap-1

                    text-sm
                    font-semibold
                    text-brand
                  "
                >
                  Manage

                  <ChevronRight
                    size={16}
                  />

                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
