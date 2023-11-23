import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

const Layout = (props) => {
  const { className } = props;

  return (
    <div className={`flex ${className}`}>
      <Sidebar></Sidebar>
      <Content></Content>
    </div>
  );
};

export default Layout;
