import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const formatBreadcrumbName = (name) => {
  // Mengganti strip dengan spasi dan mengkapitalkan setiap kata
  return name.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x !== " / ");

  const [dynamicId, setDynamicId] = useState(null);

  useEffect(() => {
    // Cari ID dinamis pada pathnames
    const idIndex = pathnames.findIndex((name, index) => /^\d+$/.test(name) && index >= 2);
  
    if (idIndex !== -1) {
      const id = pathnames[idIndex];
      setDynamicId(id);
    } else {
      setDynamicId(null);
    }
  }, [pathnames]);

  // Filter segmen rute yang bukan angka (misalnya, ID dinamis)
  const limitedPathnames = pathnames.filter((name, index) => {
    // Skip ID dinamis pada posisi tertentu
    if (index === 1 && /^\d+$/.test(name)) {
      return false;
    }
    return !/^\d+$/.test(name);
  }).slice(0, 4);

  return (
    <div className='font-poppins bg-[#A2D2FF] rounded-full px-4 py-1 text-sm inline-block'>
      <Link to="/dashboard" className="text-[#667085]">Dashboard</Link>
      {limitedPathnames.map((name, index) => {
        const formattedName = formatBreadcrumbName(name);
        const routeTo = `${limitedPathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === limitedPathnames.length - 1;
        const isSecondBreadcrumb = index === 1;

        // Pengecekan apakah kita berada di breadcrumb kedua
        const linkTo = isSecondBreadcrumb ? routeTo : `${routeTo}/${dynamicId || ''}`;

        return isLast ? (
          <span key={index} className="text-[#092C4C]"> {formattedName} </span>
        ) : (
          <span key={index}>
            <Link to={linkTo} className="text-[#667085]"> {formattedName}</Link> &gt;{''}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
