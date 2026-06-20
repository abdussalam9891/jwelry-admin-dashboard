import { Bell, CheckCheck, Trash2 } from "lucide-react";

import {
  formatDistanceToNow,
} from "date-fns";

export default function NotificationDropdown({
  notificationRef,
  notificationOpen,
  setNotificationOpen,
  notifications,
  unreadCount,
  onNotificationClick,
  onMarkAllRead,
  onClearAll,
}) {
  return (
    <div
      ref={notificationRef}
      className="relative"
    >
      {/* Trigger */}

      <button
        onClick={() =>
          setNotificationOpen(
            (prev) => !prev
          )
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
          className="text-text-primary"
        />

        {unreadCount > 0 && (
          <div
  className="
    absolute
    -right-1
    -top-1

    flex
    h-5
    min-w-[20px]
    items-center
    justify-center

    rounded-full

    bg-brand

    px-1

    text-[10px]
    font-bold
    text-white

    shadow-lg
    shadow-brand/30
  "
>
  {unreadCount > 99
    ? "99+"
    : unreadCount}
</div>
        )}
      </button>

      {/* Dropdown */}

      {notificationOpen && (
        <div
          className="
  absolute
  right-0
  top-[calc(100%+12px)]

  z-50

  w-[420px]

  overflow-hidden

  rounded-3xl

  border
  border-border

  bg-surface
  backdrop-blur-sm

  ring-1
  ring-black/5

  shadow-2xl
"
        >
          {/* Header */}

          <div
            className="
              border-b
              border-border

              px-5
              py-4
            "
          >
            <div className="flex items-start justify-between">
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

            {/* Actions */}

            {notifications.length > 0 && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={onMarkAllRead}
                  className="
  flex
  items-center
  gap-2

  rounded-2xl

  border
  border-border

  bg-surface-secondary

  px-3
  py-2

  text-xs
  font-medium

  transition-all

  hover:bg-red-50
  hover:text-red-600
"
                >
                  <CheckCheck size={14} />
                  Mark all read
                </button>

                <button
                  onClick={onClearAll}
                  className="
  flex
  items-center
  gap-2

  rounded-2xl

  border
  border-border

  bg-surface-secondary

  px-3
  py-2

  text-xs
  font-medium

  transition-all

  hover:bg-red-50
  hover:text-red-600
"
                >
                  <Trash2 size={14} />
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* List */}

          <div
            className="
              max-h-[420px]
              overflow-y-auto
            "
          >
            {notifications.length === 0 ? (
              <div
                className="
                  flex
                  flex-col
                  items-center

                  p-10

                  text-center
                "
              >
                <Bell
                  size={32}
                  className="text-text-secondary"
                />

                <p
                  className="
                    mt-4
                    font-medium
                    text-text-primary
                  "
                >
                  No notifications
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-text-secondary
                  "
                >
                  We'll notify you when
                  important store activity
                  occurs.
                </p>
              </div>
            ) : (
              notifications
              .map(
                (item) => (
                  <button
                    key={item._id}
                    onClick={() =>
                      onNotificationClick(
                        item
                      )
                    }
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
                   <div
  className={`
    mt-2

    h-2.5
    w-2.5

    rounded-full

    ${
      item.read
        ? "bg-border"
        : "bg-brand shadow-md shadow-brand/40"
    }
  `}
/>

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

                      <p
                        className="
                          mt-2
                          text-[11px]
                          text-text-secondary
                        "
                      >
                       {formatDistanceToNow(
  new Date(item.createdAt),
  {
    addSuffix: true,
  }
)}
                      </p>
                    </div>
                  </button>
                )
              )
            )}
          </div>

          {/* Footer */}

          {notifications.length >
            0 && (
            <div
              className="
                border-t
                border-border

                p-4
              "
            >
              <button
  className="
    w-full

    rounded-2xl

    bg-brand/10

    py-3

    font-semibold
    text-brand

    transition-all

    hover:bg-brand
    hover:text-white
  "
>
  View All Notifications
</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
