import { useContext, useState } from "react";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { pages } from "../constants";
import AppMenu from "./AppMenu";
import { WalletListModal } from "../../../components/WalletListModal";
import ConnectedButton from "../../Home/components/ConnectedButton";
import { AuthContext } from "../../../hooks/auth/AuthContext";

const AppNavbar = () => {
    const [toggle, setToggle] = useState(false);
    const { isAuthenticated, backendActor } = useContext(AuthContext);
    const [openWalletList, setOpenWalletList] = useState(false);
    const handleWalletListClose = () => {
        setOpenWalletList(false);
    };

    return (
        <div className="">
            <div className="flex justify-between">
                <Link to="/app" className="flex items-center gap-2">
                    <img src="/icon.svg" alt=""
                        className="w-[30px] h-[30px]"
                    />
                    <span className="font-bold">ckHEDGE</span>
                </Link>
                <div className="">
                    <ul className="md:flex md1:gap-7 md:gap-3 hidden  bg-[#453B54] py-2 px-4 rounded-full">
                        {pages.map((page, index) => (
                            <li
                                key={index}
                                className={`font-normal cursor-pointer text-[16px]`}
                            >
                                <Link to={page.route}>{page.name}</Link>
                            </li>))}

                    </ul>
                </div>
                <div className="flex items-center gap-3">
                    <div

                    >
                        {isAuthenticated ?
                            <ConnectedButton />
                            : <button
                                onClick={() => setOpenWalletList(true)}
                                className="bg-blue-500 rounded p-2 text-white  font-semibold">
                                Connect Wallet
                            </button>}
                    </div>
                    <div className="md:hidden">
                        <MdMenu
                            onClick={() => setToggle(true)}
                            className="text-white text-2xl hover:cursor-pointer" />
                    </div>
                    {toggle && <AppMenu setToggle={setToggle} />}
                </div>
            </div>
            <hr className="border-t-[1px] border-[#323c5c] w-full my-4" />
            <WalletListModal open={openWalletList} onClose={handleWalletListClose} />
        </div>

    )
}

export default AppNavbar