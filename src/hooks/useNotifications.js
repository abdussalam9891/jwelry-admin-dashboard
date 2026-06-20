import { useEffect, useState } from "react";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  clearNotifications,
} from "@/services/notificationService";

export default function useNotifications(
  navigate
) {
  const [notifications, setNotifications] =
    useState([]);

  const [unreadCount, setUnreadCount] =
    useState(0);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data =
          await getNotifications();

        setNotifications(
          data.notifications || []
        );

        setUnreadCount(
          data.unreadCount || 0
        );
      } catch (error) {
        console.error(error);
      }
    }

    loadNotifications();
  }, []);

  const handleNotificationClick =
    async (notification) => {
      try {
        if (!notification.read) {
          await markNotificationRead(
            notification._id
          );

          setNotifications((prev) =>
            prev.map((item) =>
              item._id ===
              notification._id
                ? {
                    ...item,
                    read: true,
                  }
                : item
            )
          );

          setUnreadCount((prev) =>
            Math.max(prev - 1, 0)
          );
        }

        if (notification.link) {
          navigate(notification.link);
        }

        setNotificationOpen(false);
      } catch (error) {
        console.error(error);
      }
    };

  const handleMarkAllRead =
    async () => {
      try {
        await markAllNotificationsRead();

        setNotifications((prev) =>
          prev.map((item) => ({
            ...item,
            read: true,
          }))
        );

        setUnreadCount(0);
      } catch (error) {
        console.error(error);
      }
    };

  const handleClearAll =
    async () => {
      try {
        await clearNotifications();

        setNotifications([]);

        setUnreadCount(0);
      } catch (error) {
        console.error(error);
      }
    };

  return {
    notifications,
    unreadCount,
    notificationOpen,
    setNotificationOpen,
    handleNotificationClick,
    handleMarkAllRead,
    handleClearAll,
  };
}
