<<<<<<< HEAD
<<<<<<< HEAD
import React from "react";
import Sidebar from "../Sidebar/InstructorSidebar";
import AdminSidebar from "../Sidebar/AdminSidebar";

import BellIcon from '../../assets/bell.svg'

const Layout = (props) => {
  const { children, className} = props;
  const roleName = localStorage.getItem('role_name');
=======
=======
>>>>>>> 1989afc128079573fbb69e4670e0036a4d0e3d3e
import React from 'react';
import Sidebar from '../Sidebar/InstructorSidebar';
import AdminSidebar from '../Sidebar/AdminSidebar';

const Layout = (props) => {
    const {children, className, userRole} = props
<<<<<<< HEAD
>>>>>>> 3e4d37d (feat: add from tambah kelas)
=======
>>>>>>> 1989afc128079573fbb69e4670e0036a4d0e3d3e

  return (
    <div className="flex">
      {/* Sidebar */}
<<<<<<< HEAD
<<<<<<< HEAD
      <div className="w-80 h-screen overflow-auto text-white">
      {roleName === 'admin' ? (
=======
      <div className="w-1/4 h-screen overflow-auto text-white">
      {userRole === 'admin' ? (
>>>>>>> 3e4d37d (feat: add from tambah kelas)
=======
      <div className="w-1/4 h-screen overflow-auto text-white">
      {userRole === 'admin' ? (
>>>>>>> 1989afc128079573fbb69e4670e0036a4d0e3d3e
          <AdminSidebar />
        ) : (
          <Sidebar />
        )}
      </div>

      {/* Content */}
<<<<<<< HEAD
<<<<<<< HEAD
      <div className={`${className} container w-3/4 mx-auto pt-5 bg-white grow`}>
        <div className='flex justify-end mx-auto'>
          <img src={BellIcon} alt="Bell Icon" className='w-[58px]'/>
        </div>
=======
      <div className={`${className} w-full px-8 py-4 mx-auto bg-white grow`}>
>>>>>>> 3e4d37d (feat: add from tambah kelas)
=======
      <div className={`${className} w-full px-8 py-4 mx-auto bg-white grow`}>
>>>>>>> 1989afc128079573fbb69e4670e0036a4d0e3d3e
        {children}
      </div>
    </div>
  );
};

<<<<<<< HEAD
<<<<<<< HEAD
export default Layout;
=======
export default Layout;
>>>>>>> 3e4d37d (feat: add from tambah kelas)
=======
export default Layout;
>>>>>>> 1989afc128079573fbb69e4670e0036a4d0e3d3e
