import api from "../api/client";

export async function getCurrentUser() {

  const res =
    await api.get(
      "/auth/me"
    );

  return res.data;

}


export async function updateProfile(
  payload
) {

  const res =
    await api.put(
      "/auth/profile",
      payload
    );

  return res.data;

}
