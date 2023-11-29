import React from 'react';

const CardTotalMentee = ({ title, amount }) => {
  return (
    <div className="w-6/12 h-32 bg-[#092C4C] p-4 rounded-xl text-left">
      <h3 className="text-white text-xl">Total</h3>
      <h3 className="text-white text-xl">{title}</h3>
      <p className="text-white text-3xl font-bold">{amount}</p>
    </div>
  );
};

export default CardTotalMentee;
