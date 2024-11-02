import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";

const Layout = () => {
  return (
    <div className="bg-black text-white min-h-screen py-5 ss:px-10 px-2">
      <AppNavbar />
      <Outlet />
    </div>
  );
};

export default Layout;