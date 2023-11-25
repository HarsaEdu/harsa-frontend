import React from 'react';

const CardModule = ({ logo, title, onClick }) => {
  return (
    <div
      className="w-64 bg-white p-4 rounded-lg shadow-md cursor-pointer"
      onClick={onClick}
    >
      <img src={logo} alt={`${title} Logo`} className="w-16 h-16 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-center">{title}</h3>
    </div>
  );
};

export default CardModule;
