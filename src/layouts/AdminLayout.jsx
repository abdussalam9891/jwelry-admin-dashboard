import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { Outlet } from "react-router-dom";

export default function AdminLayout() {

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (

   <div
  className="
    min-h-screen

    bg-bg

    text-text-primary

    flex
  "
>

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className="
    flex-1
    flex
    flex-col
    min-w-0

    md:ml-[280px]
  "
      >

        <Topbar
          setSidebarOpen={setSidebarOpen}
        />

        <main
          className="
            flex-1

            p-4
            md:p-6
            lg:p-8
          "
        >

          <Outlet />

        </main>

      </div>

    </div>

  );

}
