
import OrderBook from './components/OrderBook';
import BuySell from './components/BuySell';
import OrdersHistory from './components/OrdersHistory';
import Chart from './components/Chart';

const Dash = () => {
  return (
    <div>
      <div className="text-xs">
        <div className="grid lg:grid-cols-5 grid-cols-3 p-3 gap-5 rounded-2xl border  border-[#43507a]  ">
          <div className="col-span-1 hidden lg:block">
            <OrderBook />
          </div>


          <div className="lg:col-span-3 sm:col-span-2 col-span-3">
            <Chart />
            <div className="sm:hidden">
              <BuySell />
            </div>
          </div>
          <div className="hidden sm:block pr-4 ">
            <BuySell />
          </div>

        </div>
        <div className="lg:hidden w-full b">
          <OrderBook />
        </div>


        <OrdersHistory />
      </div>
    </div>
  )
}

export default Dash