import React from "react";
import Sidebar from "../Sidebar/InstructorSidebar";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { Link } from "react-router-dom";

import BellIcon from '../../assets/bell.svg'

const Layout = (props) => {
  const { children, className} = props;
  const roleName = localStorage.getItem('role_name');

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-80 h-screen overflow-auto text-white">
      {roleName === 'admin' ? (
          <AdminSidebar />
        ) : (
          <Sidebar />
        )}
      </div>

      {/* Content */}
      <div className={`${className} container w-3/4 mx-auto pt-5 bg-white grow`}>
        <div className='flex justify-end mx-auto'>
          <Link to="/notifikasi">
            <img src={BellIcon} alt="Bell Icon" className='w-[58px]'/>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
