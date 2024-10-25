import { useState } from "react";
import { MdMenu } from "react-icons/md";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <img src="/icon.svg" alt=""
          className="w-[30px] h-[30px]"
        />
        <span className="font-bold">ckHEDGE</span>
      </div>
      <div className="">
        <ul className="ss:flex gap-7 hidden items-center">
          <li>API</li>
          <li>Docs</li>
          <li>Audit</li>
          <li>
            <Link to="/app" className="bg-white rounded p-2 text-[#4701AE] font-semibold ">
              Launch App
            </Link>
          </li>
        </ul>
        <div className="ss:hidden">
          <MdMenu
            onClick={() => setToggle(true)}
           className="text-white text-2xl hover:cursor-pointer" />
        </div>
        {toggle && <Menu setToggle={setToggle} />}
      </div>
    </div>
  )
}

export default Navbar