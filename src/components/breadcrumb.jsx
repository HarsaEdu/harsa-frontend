import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const formatBreadcrumbName = (name) => {
  // Mengganti strip dengan spasi dan mengkapitalkan setiap kata
  return name.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x !== " / ");
  
  // Filter segmen rute yang bukan angka (misalnya, ID dinamis)
  const limitedPathnames = pathnames.filter((name) => !/^\d+$/.test(name)).slice(0, 4);

  return (
    <div className='font-poppins bg-[#A2D2FF] rounded-full px-4 py-1 text-sm inline-block'>
      <Link to="/dashboard" className="text-[#667085]">Dashboard</Link>
      {limitedPathnames.map((name, index) => {
        const formattedName = formatBreadcrumbName(name);
        const routeTo = `${limitedPathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === limitedPathnames.length - 1;
        return isLast ? (
          <span key={index} className="text-[#092C4C]"> {formattedName} </span>
        ) : (
          <span key={index}>
            <Link to={routeTo} className="text-[#667085]"> {formattedName}</Link> &gt;{''}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
