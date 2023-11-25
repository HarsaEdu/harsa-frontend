import React from 'react';
import Sidebar from '../Sidebar/InstructorSidebar';
import AdminSidebar from '../Sidebar/AdminSidebar';

const Layout = (props) => {
    const {children, className, userRole} = props

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-[#092C4C] text-white ${className} h-screen w-1/4 p-4`}>
      {userRole === 'admin' ? (
          <AdminSidebar />
        ) : (
          <Sidebar />
        )}
      </div>

      {/* Content */}
      <div className={`overflow-y-auto ${className} h-screen w-4/5 p-4`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;