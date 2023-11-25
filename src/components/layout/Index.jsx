import React from 'react';
import Sidebar from '../Sidebar';

const Layout = (props) => {
    const {children, className} = props

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-[#092C4C] text-white ${className} h-screen w-1/4 p-4`}>
        <Sidebar />
      </div>

      {/* Content */}
      <div className={`overflow-y-auto ${className} h-screen w-3/4 p-4`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;