<<<<<<< HEAD
import React from "react";
import Sidebar from "../Sidebar/InstructorSidebar";
import AdminSidebar from "../Sidebar/AdminSidebar";

import BellIcon from '../../assets/bell.svg'

const Layout = (props) => {
  const { children, className} = props;
  const roleName = localStorage.getItem('role_name');
=======
import React from 'react';
import Sidebar from '../Sidebar/InstructorSidebar';
import AdminSidebar from '../Sidebar/AdminSidebar';

const Layout = (props) => {
    const {children, className, userRole} = props
>>>>>>> 3e4d37d (feat: add from tambah kelas)

  return (
    <div className="flex">
      {/* Sidebar */}
<<<<<<< HEAD
      <div className="w-80 h-screen overflow-auto text-white">
      {roleName === 'admin' ? (
=======
      <div className="w-1/4 h-screen overflow-auto text-white">
      {userRole === 'admin' ? (
>>>>>>> 3e4d37d (feat: add from tambah kelas)
          <AdminSidebar />
        ) : (
          <Sidebar />
        )}
      </div>

      {/* Content */}
<<<<<<< HEAD
      <div className={`${className} container w-3/4 mx-auto pt-5 bg-white grow`}>
        <div className='flex justify-end mx-auto'>
          <img src={BellIcon} alt="Bell Icon" className='w-[58px]'/>
        </div>
=======
      <div className={`${className} w-full px-8 py-4 mx-auto bg-white grow`}>
>>>>>>> 3e4d37d (feat: add from tambah kelas)
        {children}
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Layout;
=======
export default Layout;
>>>>>>> 3e4d37d (feat: add from tambah kelas)
