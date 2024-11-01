
import { useState } from 'react';
import { Link } from 'react-router-dom';


const BuySell = () => {
    const [action, setAction] = useState('buy')
    return (
        <>
            <div className="relative  text-left mt-4 bg-[#1c2530] p-4 rounded-2xl">
                <div className="flex gap-4">
                    <button
                        onClick={() => setAction('buy')}
                        className="w-full py-3 px-4 bg-[#0CAF60] text-white font-semibold rounded-2xl hover:bg-[#0a944f] transition-colors duration-200 ease-in-out"
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => setAction('sell')}
                        className="w-full py-3 px-4 bg-[#e84c3d] text-white font-semibold rounded-2xl hover:bg-[#d24335] transition-colors duration-200 ease-in-out"
                    >
                        Sell
                    </button>
                </div>
            </div>
            {/* Buy ckBTC */}
            {action === 'buy' && <>
                <div className="mt-2 flex items-center justify-between">
                    <h3
                        className=" text-[16px] font-semibold  py-3 "
                    >
                        Buy ckBTC
                    </h3>
                    <span
                        className='px-5 text-[16px] font-bold text-[#A4A8AB]'
                    >
                        0 ckUSDT
                    </span>
                </div>
                <div className="border border-[#43507a] rounded-2xl mt-3 md1:flex sm:grid flex w-full items-center gap-4 p-1 ">
                    <button className='py-2 px-3 bg-[#1c2530] rounded-2xl w-full'>
                        Limit
                    </button>
                    <button
                        className='py-2 px-3 rounded-2xl w-full'
                    >
                        Stop Limit
                    </button>
                    <button
                        className='py-2 px-3 rounded-2xl w-full'
                    >
                        Market
                    </button>
                </div>

                <div className=" bg-[#1c2530] rounded-2xl mt-3  justify-between flex items-center gap-4 px-4 py-5">
                    <span>
                        Price(USDT)
                    </span>
                    <Link
                        className='text-[10px] underline text-[#A4A8AB]'
                        to="#">
                        Best Price
                    </Link>
                </div>
                <div className=" bg-[#1c2530] rounded-2xl mt-3  justify-between flex items-center gap-4 px-4 py-5">
                    <span>
                        Amount(USDT)
                    </span>
                    <Link
                        className='text-[10px] underline text-[#A4A8AB]'
                        to="#">
                        Select All
                    </Link>
                </div>
                <div className="my-4">
                    <img src="/Slidebar.svg" alt="slidebar"
                        className="w-full"
                    />
                </div>
                <button className=" text-center bg-[#0CAF60] rounded-2xl mt-3 w-full  px-4 py-5">
                    Buy ckBTC
                </button>
            </>}

            {/* Sell ckBTC */}

            {action === 'sell' && <>   <div className="mt-2 flex items-center justify-between">
                <h3
                    className=" text-[16px] font-semibold  py-3 "
                >
                    Sell ckBTC
                </h3>
                <span
                    className='px-5 text-[16px] font-bold text-[#A4A8AB]'
                >
                    0 ckUSDT
                </span>
            </div>

                <div className="border border-[#43507a] rounded-2xl mt-3 m  justify-between flex items-center gap-4 p-1 ">
                    <button className='py-2 px-5 bg-[#1c2530] rounded-2xl '>
                        Limit
                    </button>
                    <button
                        className='py-2 px-5 rounded-2xl'
                    >
                        Stop Limit
                    </button>
                    <button
                        className='py-2 px-5 rounded-2xl'
                    >
                        Market
                    </button>
                </div>

                <div className=" bg-[#1c2530] rounded-2xl mt-3  justify-between flex items-center gap-4 px-4 py-5">
                    <span>
                        Price(USDT)
                    </span>
                    <Link
                        className='text-[10px] underline text-[#A4A8AB]'
                        to="#">
                        Best Price
                    </Link>
                </div>
                <div className=" bg-[#1c2530] rounded-2xl mt-3  justify-between flex items-center gap-4 px-4 py-5">
                    <span>
                        Amount(USDT)
                    </span>
                    <Link
                        className='text-[10px] underline text-[#A4A8AB]'
                        to="#">
                        Select All
                    </Link>
                </div>
                <div className="my-4">
                    <img src="/Slidebar.svg" alt="slidebar"
                        className="w-full"
                    />
                </div>
                <button className=" text-center bg-[#e84c3d] rounded-2xl mt-3 w-full  px-4 py-5">
                    Sell ckBTC
                </button></>}


        </>
    )
}

export default BuySell