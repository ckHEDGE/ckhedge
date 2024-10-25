import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { pages } from "../constants";
import AppMenu from "./AppMenu";

const AppNavbar = () => {
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
                    {pages.map((page, index) => (
                        <li
                            key={index}
                            className={`font-normal cursor-pointer text-[16px] mb-4`}
                        >
                            <Link to={page.route}>{page.name}</Link>
                        </li>))}

                </ul>
                <div className="ss:hidden">
                    <MdMenu
                        onClick={() => setToggle(true)}
                        className="text-white text-2xl hover:cursor-pointer" />
                </div>
                {toggle && <AppMenu setToggle={setToggle} />}
            </div>
            <div className="">
            <Link to="/app" className="bg-blue-500 rounded p-2 text-white  ">
                Connect Wallet
              </Link>
            </div>
        </div>
    )
}

export default AppNavbar