import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const formatBreadcrumbName = (name) => {
  // Mengganti strip dengan spasi dan mengkapitalkan setiap kata
  return name.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x !== " / ");


  return (
    <div className='font-poppins'>
      <Link to="/">Dashboard</Link>
      {pathnames.map((name, index) => {
        const formattedName = formatBreadcrumbName(name);
        const routeTo = `${pathnames.slice(0, index + 1).join('/')}`;
        console.log(routeTo)
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span key={index}> {formattedName} </span>
        ) : (
          <span key={index}>
            <Link to={routeTo}> {formattedName}</Link> &gt;{''}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
