import { orderBookData } from '../constants'

const OrderBookTable = () => {
  return (
<div className="text-white rounded-lg w-full">
  <table className="w-full text-sm">
    <thead>
      <tr className="text-[#A4A8AB]">
        <th className="px-1 py-1 text-left w-1/3">Price (USDT)</th>
        <th className="px-1 py-1 text-left w-1/3">Amount</th>
        <th className="px-1 py-1 text-left w-1/3">Total</th>
      </tr>
    </thead>
    <tbody>
      {orderBookData.map((row, index) => (
        <tr
          key={index}
          className={`bg-[#1b1f26] ${index % 2 === 0 ? 'bg-opacity-70' : ''}`}
        >
          <td className="px-1 py-1 text-[#e84c3d]">{row.price}</td>
          <td className="px-1 py-1">{row.amount}</td>
          <td className="px-1 py-1">{row.total}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  )
}

export default OrderBookTable