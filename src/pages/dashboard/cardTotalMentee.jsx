import React from 'react';

const CardTotalMentee = ({ title, amount }) => {
  return (
    <div className="w-[555px] h-[155px] bg-[#092C4C] p-4 rounded-xl text-left">
      <h3 className="text-white text-[24px]">Total</h3>
      <h3 className="text-white text-[24px]">{title}</h3>
      <p className="text-white text-[40px] font-bold">{amount}</p>
    </div>
  );
};

export default CardTotalMentee;
