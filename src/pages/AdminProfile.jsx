import {
  useAuth,
} from "../context/AuthContext";
import { useState } from "react";

import { updateProfile } from "@/services/authService";
 import toast from "react-hot-toast";


export default function AdminProfilePage() {

   const { user, loading, setUser } =
  useAuth();

    const [editOpen,
  setEditOpen] =
    useState(false);


  const profile = {

  name:
    user?.name || "Admin",

  email:
    user?.email || "No email",

  avatar:
    user?.avatar ||
    "/default-avatar.png",

  role:
    user?.role === "admin"
      ? "Super Admin"
      : "User",

  phone:
    user?.phone ||
    "Not Added",

  joinedAt:
    user?.createdAt
      ? new Date(
          user.createdAt
        ).toLocaleDateString()
      : "Recently Joined",

  lastLogin:
    user?.lastLoginAt
      ? new Date(
          user.lastLoginAt
        ).toLocaleString()
      : "Recently",

};






const [formData,
  setFormData] =
    useState({

      name:
        profile.name,

      phone:
        profile.phone,

    });

 const [saving, setSaving] =
  useState(false);


  if (loading) {

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        text-text-secondary
      "
    >
      Loading profile...
    </div>

  );

}





async function
handleUpdateProfile() {

  if (
    !formData.name.trim()
  ) {

    return toast.error(
      "Name is required"
    );

  }

  try {

    setSaving(true);

    const data =
      await updateProfile(
        formData
      );

    setUser(
      data.user
    );

    toast.success(
      "Profile updated"
    );

    setEditOpen(false);

  } catch {

    toast.error(
      "Failed to update profile"
    );

  } finally {

    setSaving(false);

  }

}



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

    {/* TOP PROFILE STRIP */}

    <div
      className="
        flex
        flex-col
        gap-6

        rounded-3xl
        border
        border-border

        bg-surface

        p-6

        shadow-sm

        md:flex-row
        md:items-center
        md:justify-between
      "
    >

      {/* LEFT */}

      <div
        className="
          flex
          items-center
          gap-5
        "
      >

        {/* avatar */}

        <div
          className="
            relative

            flex
            h-20
            w-20
            shrink-0
            items-center
            justify-center

            overflow-hidden

            rounded-2xl

            bg-brand/10
          "
        >

          {profile.avatar && (

            <img
              src={profile.avatar}

              alt={profile.name}

              onError={(e) => {
                e.target.style.display =
                  "none";
              }}

              className="
                h-full
                w-full
                object-cover
              "
            />

          )}

          <span
            className="
              absolute
              inset-0

              flex
              items-center
              justify-center

              text-2xl
              font-bold

              text-brand
            "
          >
            {profile.name
              ?.charAt(0)
              ?.toUpperCase()}
          </span>

        </div>


        {/* user info */}

        <div>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <h1
              className="
                text-2xl
                font-bold
                tracking-tight
                text-text-primary
              "
            >
              {profile.name}
            </h1>

            <div
              className="
                rounded-full

                bg-brand/10

                px-3
                py-1

                text-[11px]
                font-semibold
                uppercase
                tracking-[0.08em]

                text-brand
              "
            >
              {profile.role}
            </div>

          </div>

          <p
            className="
              mt-2
              text-sm
              text-text-secondary
            "
          >
            {profile.email}
          </p>

          <div
            className="
              mt-4

              flex
              flex-wrap
              gap-2
            "
          >

            <div
              className="
                rounded-xl
                bg-surface-secondary

                px-3
                py-2

                text-xs
                font-medium
                text-text-secondary
              "
            >
              Joined {profile.joinedAt}
            </div>

            <div
              className="
                rounded-xl
                bg-surface-secondary

                px-3
                py-2

                text-xs
                font-medium
                text-green-600
              "
            >
              Active Session
            </div>

          </div>

        </div>

      </div>


      {/* ACTION */}

      <button

       onClick={() =>
    setEditOpen(true)
  }
        className="
          h-11
          rounded-2xl

          bg-brand

          px-5

          text-sm
          font-semibold
          text-white

          shadow-sm

          transition-all

          hover:opacity-90
        "
      >
        Edit Profile
      </button>

    </div>


    {/* SETTINGS CONTAINER */}

    <div
      className="
        mt-6

        overflow-hidden

        rounded-3xl
        border
        border-border

        bg-surface

        shadow-sm
      "
    >

      {/* PERSONAL INFO */}

      <div className="p-6">

        <div>

          <h2
            className="
              text-lg
              font-semibold
              text-text-primary
            "
          >
            Personal Information
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-text-secondary
            "
          >
            Administrative identity and contact details.
          </p>

        </div>


        <div className="mt-8">

          {/* row */}

          <div
            className="
              flex
              items-center
              justify-between

              border-b
              border-border

              py-4
            "
          >

            <div>

              <p
                className="
                  text-sm
                  font-medium
                  text-text-primary
                "
              >
                Full Name
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-text-secondary
                "
              >
                {profile.name}
              </p>

            </div>



          </div>


          {/* row */}

          <div
            className="
              flex
              items-center
              justify-between

              border-b
              border-border

              py-4
            "
          >

            <div>

              <p
                className="
                  text-sm
                  font-medium
                  text-text-primary
                "
              >
                Email Address
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-text-secondary
                "
              >
                {profile.email}
              </p>

            </div>

          </div>


          {/* row */}

          <div
            className="
              flex
              items-center
              justify-between

              border-b
              border-border

              py-4
            "
          >

            <div>

              <p
                className="
                  text-sm
                  font-medium
                  text-text-primary
                "
              >
                Phone Number
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-text-secondary
                "
              >
                {profile.phone}
              </p>

            </div>



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

  {/* heading */}

  <div>

    <h2
      className="
        text-lg
        font-semibold
        text-text-primary
      "
    >
      Security
    </h2>

    <p
      className="
        mt-1
        text-sm
        text-text-secondary
      "
    >
      Authentication provider and active account sessions.
    </p>

  </div>


  {/* cards */}

  <div
    className="
      mt-8
      grid
      gap-4
      md:grid-cols-2
    "
  >

    {/* GOOGLE AUTH */}

    <div
      className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        p-5

        transition-all

        hover:border-brand/20
        hover:bg-brand/5
      "
    >

      {/* top */}

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
            Google Authentication
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-6
              text-text-secondary
            "
          >
            Your account is secured using
            Google OAuth authentication.
          </p>

        </div>


        <div
          className="
            rounded-full

            bg-green-500/10

            px-2.5
            py-1

            text-[10px]
            font-semibold
            uppercase
            tracking-[0.08em]

            text-green-500
          "
        >
          Active
        </div>

      </div>


      {/* footer */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
        "
      >

        <p
          className="
            text-xs
            text-text-secondary
          "
        >
          Connected Provider
        </p>

        <a
          href="https://myaccount.google.com/security"

          target="_blank"

          rel="noreferrer"

          className="
            text-xs
            font-semibold
            text-brand
          "
        >
          Manage
        </a>

      </div>

    </div>


    {/* ACTIVE SESSION */}

    <div
      className="
        rounded-2xl

        border
        border-border

        bg-surface-secondary

        p-5

        transition-all

        hover:border-brand/20
        hover:bg-brand/5
      "
    >

      {/* top */}

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
            Active Session
          </p>

          <p
            className="
              mt-1
              text-xs
              leading-6
              text-text-secondary
            "
          >
            Current authenticated device
            and access session.
          </p>

        </div>


        <div
          className="
            rounded-full

            bg-brand/10

            px-2.5
            py-1

            text-[10px]
            font-semibold
            uppercase
            tracking-[0.08em]

            text-brand
          "
        >
          Current
        </div>

      </div>


      {/* footer */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
        "
      >

        <p
          className="
            text-xs
            text-text-secondary
          "
        >
          Chrome on Windows
        </p>

      <button
  disabled
  className="
    cursor-not-allowed
    text-xs
    font-semibold
    text-text-secondary
    opacity-50
  "
>
  Coming Soon
</button>

      </div>

    </div>

  </div>

</div>
    </div>

  </div>



  {editOpen && (

  <div
    className="
      fixed
      inset-0
      z-50

      flex
      items-center
      justify-center

      bg-black/50
      backdrop-blur-sm
    "
  >

    <div
      className="
        w-full
        max-w-md

        rounded-3xl

        border
        border-border

        bg-surface

        p-6

        shadow-2xl
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <h2
          className="
            text-xl
            font-semibold
            text-text-primary
          "
        >
          Edit Profile
        </h2>

        <button
          onClick={() =>
            setEditOpen(false)
          }
        >
          ✕
        </button>

      </div>


      <div className="mt-6 space-y-5">

        {/* name */}

        <div>

          <label
            className="
              mb-2
              block

              text-sm
              font-medium
              text-text-secondary
            "
          >
            Full Name
          </label>

          <input
            value={formData.name}

            onChange={(e) =>
              setFormData({
                ...formData,
                name:
                  e.target.value,
              })
            }

            className="
              h-12
              w-full

              rounded-2xl

              border
              border-border

              bg-surface-secondary

              px-4

              text-sm
              text-text-primary

              outline-none
            "
          />

        </div>


        {/* phone */}

        <div>

          <label
            className="
              mb-2
              block

              text-sm
              font-medium
              text-text-secondary
            "
          >
            Phone Number
          </label>

          <input
            value={formData.phone}

            onChange={(e) =>
              setFormData({
                ...formData,
                phone:
                  e.target.value,
              })
            }

            className="
              h-12
              w-full

              rounded-2xl

              border
              border-border

              bg-surface-secondary

              px-4

              text-sm
              text-text-primary

              outline-none
            "
          />

        </div>

      </div>


      {/* actions */}

      <div
        className="
          mt-8

          flex
          justify-end
          gap-3
        "
      >

        <button

          onClick={() =>
            setEditOpen(false)
          }

          className="
            h-11
            rounded-2xl

            border
            border-border

            px-5

            text-sm
            font-medium
            text-text-primary
          "
        >
          Cancel
        </button>


        <button
          onClick={handleUpdateProfile}
          disabled={saving}
          className="
            h-11
            rounded-2xl

            bg-brand

            px-5

            text-sm
            font-semibold
            text-white
          "
        >
         {saving
  ? "Saving..."
  : "Save Changes"}
        </button>

      </div>

    </div>

  </div>

)}

</div>
  );
}
