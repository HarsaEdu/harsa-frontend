import React from "react";
import Sidebar from "../Sidebar/InstructorSidebar";
import AdminSidebar from "../Sidebar/AdminSidebar";

const Layout = (props) => {
  const { children, className, userRole } = props;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen w-1/4 overflow-auto text-white">
        {userRole === "admin" ? <AdminSidebar /> : <Sidebar />}
      </div>

      {/* Content */}
      <div className={`${className} mx-auto w-full grow bg-white px-8 py-4`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
