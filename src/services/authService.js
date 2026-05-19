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


export async function
updateAvatar(file) {

  const formData =
    new FormData();

  formData.append(
    "avatar",
    file
  );

  const res =
    await api.put(

      "/auth/profile/avatar",

      formData,

      {

        headers: {

          "Content-Type":
            "multipart/form-data",

        },

      }

    );

  return res.data;

}



export async function
updateNotificationPreferences(
  preferences
) {

  const res =
    await api.put(

      "/auth/preferences",

      preferences

    );

  return res.data;

}



/* OTP */
export async function requestOtp(
  phone
) {
  const res = await api.post(
    "/auth/request-otp",
    { phone }
  );

  return res.data;
}

export async function verifyAdminOtp(
  payload
) {
  const res = await api.post(
    "/auth/verify-otp-admin",
    payload
  );

  return res.data;
}
