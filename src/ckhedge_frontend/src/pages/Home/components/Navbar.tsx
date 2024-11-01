import { useContext, useMemo, useState } from "react";
import { MdMenu } from "react-icons/md";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { idlFactory, canisterId } from "../../../../../declarations/ckhedge_backend";
import { Actor } from "@dfinity/agent";
import { WalletListModal } from "../../../components/WalletListModal";
import { AuthContext } from "../../../hooks/auth/AuthContext";
import ConnectedButton from "./ConnectedButton";


const Navbar = () => {
  // const agent = useAgent()
  // console.log("Agent: ", agent);
  // const { identity, delegationType } = useIdentityKit()
  // console.log("Identity: ", identity);
  // const targetActor =
  //   agent &&
  //   Actor.createActor(idlFactory, {
  //     agent,
  //     canisterId,
  //   })

  const { isAuthenticated } = useContext(AuthContext);

  const [toggle, setToggle] = useState(false)
  const [openWalletList, setOpenWalletList] = useState(false);


  const handleWalletListClose = () => {
    setOpenWalletList(false);
  };

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
            {isAuthenticated ? 
            <div>
              <ConnectedButton />
            </div> : <button
              onClick={() => setOpenWalletList(true)}
              className="bg-white rounded p-2 text-[#4701AE]  font-semibold">
              Connect Wallet
            </button>}
          </li>
        </ul>
        <div className="ss:hidden">
          <MdMenu
            onClick={() => setToggle(true)}
            className="text-white text-2xl hover:cursor-pointer" />
        </div>
        {toggle && <Menu setToggle={setToggle} />}
        <WalletListModal open={openWalletList} onClose={handleWalletListClose} />
      </div>
    </div>
  )
}

export default Navbar