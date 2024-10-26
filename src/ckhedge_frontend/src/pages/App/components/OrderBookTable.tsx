import { orderBookData } from '../constants'

const OrderBookTable = () => {
  return (
    <div className=" text-white px-4 rounded-lg">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-[#A4A8AB] font-normal">
            <th className="px-4 py-2 text-left">Price(USDT)</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {orderBookData.map((row, index) => (
            <tr
              key={index}
              className={`bg-[#1b1f26] ${
                index % 2 === 0 ? 'bg-opacity-70' : ''
              }`}
            >
              <td className="px-4 py-2 text-[#e84c3d]">{row.price}</td>
              <td className="px-4 py-2">{row.amount}</td>
              <td className="px-4 py-2">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderBookTable