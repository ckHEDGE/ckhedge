import { FiXCircle } from "react-icons/fi"; 
import { orderData } from "../constants";

const OrdersTable = () => {
  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full bg-[#121212] text-white">
        <thead>
          <tr className="text-left bg-[#1c1c1c] text-gray-400">
            <th className="py-2 px-4">Time</th>
            <th className="py-2 px-4">All Pairs</th>
            <th className="py-2 px-4">All Types</th>
            <th className="py-2 px-4">Buy/Sell</th>
            <th className="py-2 px-4">Price (USDT)</th>
            <th className="py-2 px-4">Amount (BTC)</th>
            <th className="py-2 px-4">Filled</th>
            <th className="py-2 px-4">Unfilled</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order, index) => (
            <tr key={index} className="text-left border-b border-gray-700">
              <td className="py-2 px-4">{order.time}</td>
              <td className="py-2 px-4 flex items-center">
                <img src="/Currencies.svg" alt="BTC icon" className="w-5 h-5 mr-1" />
                {order.pair}
              </td>
              <td className="py-2 px-4">{order.type}</td>
              <td className="py-2 px-4">{order.action}</td>
              <td className="py-2 px-4">{order.price}</td>
              <td className="py-2 px-4">{order.amount}</td>
              <td className="py-2 px-4">{order.filled}</td>
              <td className="py-2 px-4">{order.unfilled}</td>
              <td className="py-2 px-4 text-red-500 flex items-center cursor-pointer">
                Cancel <FiXCircle className="ml-1" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
