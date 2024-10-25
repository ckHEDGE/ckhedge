import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";

const Layout = () => {
  return (
    <div className="bg-black text-white h-screen pt-5 px-10">
      <AppNavbar />
      <Outlet />
    </div>
  );
};

export default Layout;