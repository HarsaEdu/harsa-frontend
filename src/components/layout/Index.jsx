import React from 'react';
import Sidebar from '../Sidebar/InstructorSidebar';
import AdminSidebar from '../Sidebar/AdminSidebar';

const Layout = (props) => {
    const {children, className, userRole} = props

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 h-screen overflow-auto text-white">
      {userRole === 'admin' ? (
          <AdminSidebar />
        ) : (
          <Sidebar />
        )}
      </div>

      {/* Content */}
      <div className={`${className} w-full px-8 py-4 mx-auto bg-white grow`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;