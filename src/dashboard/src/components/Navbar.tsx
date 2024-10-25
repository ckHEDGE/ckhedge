
const Navbar = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <img src="/icon.svg" alt=""
          className="w-[30px] h-[30px]"
        />
        <span className="font-bold">ckHEDGE</span>
      </div>
      <div className="">
        <ul className="flex gap-7 items-center">
          <li>API</li>
          <li>Docs</li>
          <li>Audit</li>
          <li>
            <button className="bg-white rounded p-2 text-[#4701AE] font-semibold ">
              Connect Wallet
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar