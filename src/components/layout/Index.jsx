import React from 'react';

const Layout = (props) => {
    const {children, className} = props

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-gray-400 ${className} h-screen w-1/5 p-4`}>
        {children}
        <p>Sidebar Content</p>
      </div>

      {/* Content */}
      <div className={`bg-gray-200 ${className} h-screen w-4/5 p-4`}>
        {children}
        <p>Main Content</p>
      </div>
    </div>
  );
};

export default Layout;
