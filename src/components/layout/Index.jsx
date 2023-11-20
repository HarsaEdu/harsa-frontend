import React from 'react';
import Sidebar from '../Sidebar';

const Layout = (props) => {
    const {children, className} = props

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-gray-400 ${className} h-screen w-1/5 p-4`}>
        <Sidebar />
      </div>

      {/* Content */}
      <div className={`bg-gray-200 ${className} h-screen w-4/5 p-4`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
