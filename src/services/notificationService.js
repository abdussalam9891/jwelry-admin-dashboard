import api from "../api/client";

export async function getNotifications() {
  const res = await api.get(
    "/admin/notifications"
  );

  return res.data;
}

export async function markNotificationRead(
  id
) {
  const res = await api.patch(
    `/admin/notifications/${id}/read`
  );

  return res.data;
}

export async function markAllNotificationsRead() {
  const res = await api.patch(
    "/admin/notifications/read-all"
  );

  return res.data;
}

export async function clearNotifications() {
  const res = await api.delete(
    "/admin/notifications"
  );

  return res.data;
}

export async function deleteNotification(
  id
) {
  const res = await api.delete(
    `/admin/notifications/${id}`
  );

  return res.data;
}
