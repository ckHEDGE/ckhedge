import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { pages } from '../constants'

const AppMenu = ({ setToggle }) => {
    return (
        <div
            className={` fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50`}
        >
            <div className="absolute top-0 right-0 z-10 min-w-[200px] bg-gray-600 py-3 px-5">
                <button className="text-xl pb-5 pt-3" onClick={() => setToggle(false)}>
                    <AiOutlineClose />
                </button>
                <ul className=" flex-1 items-center flex-col justify-end ">
                    {pages.map((page, index) => (
                        <li
                        key={index}
                        className={`font-normal cursor-pointer text-[16px] mb-4`}
                    >
                        <Link to={page.route}>{page.name}</Link>
                    </li>))}
                </ul>
                <button  className="bg-blue-500 rounded xs:hidden p-2 text-white  ">
                        Connect Wallet
                    </button>
            </div>
        </div>
    )
}

export default AppMenu