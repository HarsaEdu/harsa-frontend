import React from 'react';

const CardTotal = ({ judul, nominal }) => {
  return (
    <div className="w-full bg-[#092C4C] p-4 rounded-xl text-left">
      <h3 className="text-[#A2D2FF] text-xl">Total {judul}</h3>
      <p className="text-[#A2D2FF] text-3xl font-semibold">{nominal}</p>
    </div>
  );
};

export default CardTotal;
