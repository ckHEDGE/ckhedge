import React from "react";
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex justify-center items-start">
      <div className=" xl:max-w-[1500px] w-full ">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;