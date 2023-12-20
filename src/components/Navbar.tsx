import React from "react";
import { useAuth } from "../context/Context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { login, logout, isAuthenticated } = useAuth();
  return (
    <div className="flex justify-between items-center">
      <div className="">
        <h1>ckHedge</h1>
      </div>
      <div className="">
        <ul className="flex justify-between gap-5">
          <li>Home</li>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/trade">Trade</Link>
              </li>
              <li>
                <button>Connect Wallet</button>
              </li>
            </>
          )}
          <li>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={isAuthenticated ? logout : login}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
