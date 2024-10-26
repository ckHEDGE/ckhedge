import { FiSettings, FiCamera } from 'react-icons/fi';
import { MdFullscreen } from 'react-icons/md';
import OrderBookTable from './components/OrderBookTable'
import { ClientKey } from '../../../../declarations/ckhedge_backend/ckhedge_backend.did';
import { Link } from 'react-router-dom';
import OrdersTable from './components/OrdersTable';

const Dash = () => {
  return (
    <div>
      <div className="text-xs">
        <div className="grid grid-cols-4 gap-5 rounded-2xl border  border-[#43507a]  ">


          {/* Order book column */}


          <div className="col-span-1  ">
            <h3
              className=" text-[16px] font-semibold px-5 py-3 mt-2"
            >
              Order Book
            </h3>
            <OrderBookTable />
          </div>

          {/* Chart column */}

          <div className="col-span-2 ">
            <div className="flex items-center justify-between mt-2">
              <div className="border border-[#43507a] rounded-2xl  w-fit flex items-center gap-4 p-1  ">
                <button className='py-2 px-5 bg-[#1c2530] rounded-2xl '>
                  Candle Line
                </button>
                <button
                  className='py-2 px-5 rounded-2xl'
                >
                  Depth Chart
                </button>
              </div>
              <div className="flex gap-4 ml-6">
                <button>
                  <FiSettings size={18} />
                </button>
                <button>
                  <FiCamera size={18} />
                </button>
                <button>
                  <MdFullscreen size={25} />
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  className='rounded-2xl bg-[#0CAF60] border border-[#43507a] px-3 py-1'
                >
                  1D
                </button>
                <button
                  className='rounded-2xl border border-[#43507a] px-3 py-1'
                >
                  1M
                </button>
                <button
                  className='rounded-2xl border border-[#43507a] px-3 py-1'
                >
                  6M
                </button>
                <button
                  className='rounded-2xl border border-[#43507a] px-3 py-1'
                >
                  1Y
                </button>
                <button
                  className='rounded-2xl border border-[#43507a] px-3 py-1'
                >
                  ALL
                </button>
              </div>
            </div>
            <div className="mt-5">
              <img src="/Chart.svg" alt="chart"
                className="w-full"
              />
            </div>
          </div>

          {/* Buy sell column */}

          <div className="col-span-1 pr-4 ">
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
            <button className=" text-center bg-[#0CAF60] rounded-2xl mt-3 w-full  px-4 py-5">
              Buy ckBTC
            </button>

            {/* Sell ckBTC */}

            <div className="mt-2 flex items-center justify-between">
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
            </button>


          </div>
        </div>

        {/* Order history column */}

        <div className="border border-[#43507a] rounded-2xl my-6 w-fit flex items-center gap-4 p-1 ">
          <button className='py-2 px-5 bg-[#1c2530] rounded-2xl '>
            Open Orders
          </button>
          <button
            className='py-2 px-5 rounded-2xl'
          >
            Order History
          </button>
          <button
            className='py-2 px-5 rounded-2xl'
          >
            Market trades
          </button>
        </div>
        <div className=" bg-[#1c2530] rounded-2xl">
          <OrdersTable />
        </div>
      </div>
    </div>
  )
}

export default Dash