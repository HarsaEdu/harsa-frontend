import React from 'react';

const Content = (props) => {
  const { className, children } = props

  return (
    <div className={`bg-white ${className} w-4/5 p-4`}>
      {children}
      Content Area
    </div>
  );
};

export default Content;
