 import React from 'react';

const Sidebar = (props) => {
  const { className= 'bg-gray-200' , children } = props

  return (
    <div className={`${className} w-1/5 p-4`}>
      {children}
      Sidebar Content
    </div>
  );
};

export default Sidebar;
