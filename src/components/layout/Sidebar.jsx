 import React from 'react';

const Sidebar = (props) => {
  const { className, children } = props

  return (
    <div className={`bg-gray-200 ${className} w-1/5 p-4`}>
      {children}
      Sidebar Content
    </div>
  );
};

export default Sidebar;
