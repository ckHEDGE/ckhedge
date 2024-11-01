import OrdersTable from './OrdersTable'

const OrdersHistory = () => {
    return (
        <>  <div className="border border-[#43507a] rounded-2xl my-6 w-fit flex items-center gap-4 p-1 ">
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
        </>
    )
}

export default OrdersHistory