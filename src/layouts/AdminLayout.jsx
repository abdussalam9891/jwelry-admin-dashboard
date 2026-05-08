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
        bg-[#F6F7F9]
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
        "
      >

        <Topbar
          setSidebarOpen={setSidebarOpen}
        />

        <main
          className="
            flex-1
            overflow-y-auto
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
