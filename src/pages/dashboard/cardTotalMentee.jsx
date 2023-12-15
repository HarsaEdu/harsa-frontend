import React from 'react';

const CardTotalMentee = ({ totalUsers, totalActiveUsers }) => {
  return (
    <div className='w-full flex gap-8 justify-between'>
      <div className="w-6/12 h-32 bg-[#092C4C] p-4 rounded-xl text-left">
        <h3 className="text-white text-xl">Total</h3>
        <h3 className="text-white text-xl">Peserta</h3>
        <p className="text-white text-3xl font-bold">{totalUsers}</p>
      </div>
      <div className="w-6/12 h-32 bg-[#092C4C] p-4 rounded-xl text-left">
        <h3 className="text-white text-xl">Total</h3>
        <h3 className="text-white text-xl">Peserta Aktif</h3>
        <p className="text-white text-3xl font-bold">{totalActiveUsers}</p>
      </div>
    </div>
  );
};

export default CardTotalMentee;
