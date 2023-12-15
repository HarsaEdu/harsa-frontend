import React from 'react';
import { Button } from '@/components/ui/button';

const CardModule = ({ id, logo, title, onClick, isActive }) => {

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <div className='border-2 rounded-xl border-[#092C4C]'>
      <Button
      className={`w-64 h-24 p-4 rounded-xl text-left shadow-md ${
        isActive ? 'bg-[#092C4C]' : 'bg-white opacity-50'}`}
      onClick={() => onClick(id)}
      >
        <div className="flex items-center">
          <img
            src={logo}
            alt={`Module ${title}`}
            className="w-12 h-12 object-cover rounded-full"
          />
          <h3 className={`text-xl font-semibold ml-4 ${
            isActive ? 'text-white' : 'text-[#092C4C]'}`}
            title={title} // Menambahkan atribut title untuk menampilkan tooltip
          >
            {truncateText(title, 23)} {/* Membatasi judul menjadi maksimal 20 karakter */}
          </h3>
        </div>
      </Button>
    </div>
  );
};

export default CardModule;