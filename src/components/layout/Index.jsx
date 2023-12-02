import React from "react";
import Sidebar from "../Sidebar/InstructorSidebar";
import AdminSidebar from "../Sidebar/AdminSidebar";

import BellIcon from '../../assets/bell.svg'

const Layout = (props) => {
  const { children, className, userRole } = props;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-80 h-screen overflow-auto text-white">
      {userRole === 'admin' ? (
          <AdminSidebar />
        ) : (
          <Sidebar />
        )}
      </div>

      {/* Content */}
      <div className={`${className} container w-3/4 mx-auto pt-5 bg-white grow`}>
        <div className='flex justify-end mx-auto'>
          <img src={BellIcon} alt="Bell Icon" className='w-[58px]'/>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
