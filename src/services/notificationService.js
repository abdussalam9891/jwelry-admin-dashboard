import api from "../api/client";

export async function
getNotifications() {

  const res =
    await api.get(
      "/admin/notifications"
    );

  return res.data;

}


export async function
markNotificationRead(id) {

  await api.put(
    `/admin/notifications/${id}/read`
  );

}
