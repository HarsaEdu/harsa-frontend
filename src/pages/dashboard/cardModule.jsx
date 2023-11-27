// CardModule.js
import React from 'react';
import { Button } from '@/components/ui/button';

const CardModule = ({ id, logo, title, onClick, isActive }) => {
  return (
    <Button
      className={`w-[284px] h-[100px] p-4 rounded-xl text-left shadow-md ${
        isActive ? 'bg-[#092C4C]' : 'bg-white opacity-50 border-[#092C4C]'}`}
      onClick={() => onClick(id)}
    >
      <div className="flex">
        {logo}
        <h3 className={`text-[24px] font-bold ml-4 ${
          isActive ? 'text-white' : 'text-[#092C4C]'}`}>{title}
        </h3>
      </div>
    </Button>
  );
};

export default CardModule;