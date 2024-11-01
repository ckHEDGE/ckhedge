import OrderBookTable from './OrderBookTable'

const OrderBook = () => {
  return (
<>
    <h3
      className="text-lg font-semibold px-2  py-3 mt-2"
    >
      Order Book
    </h3>
    <OrderBookTable />
  </>
  )
}

export default OrderBook