// CardModule.js
import React from 'react';

const CardModule = ({ id, logo, title, onClick, isActive }) => {
  return (
    <div
      className={`w-[284px] h-[102px] p-4 rounded-lg text-left shadow-md cursor-pointer transition duration-300 transform hover:scale-105 ${
        isActive ? 'bg-[#092C4C]' : 'bg-white opacity-50'}`}
      onClick={() => onClick(id)}
    >
      <div className="flex">
        {logo}
        <h3 className={`text-[24px] font-bold ml-4 ${
          isActive ? 'text-white' : 'text-[#092C4C]'}`}>{title}</h3>
      </div>
    </div>
  );
};

export default CardModule;