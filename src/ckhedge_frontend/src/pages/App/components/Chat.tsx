import React, { useEffect, useMemo, useState } from 'react'
import { FiCamera, FiSettings } from 'react-icons/fi';
import { MdFullscreen } from 'react-icons/md';
import { formatStockData, getStockData } from '../utils/utils';
import ReactApexChart from 'react-apexcharts';
import { candleStickOptions } from '../constants';

const Chat = () => {
    interface StockData {
        [key: string]: {
            '1. open': number;
            '2. high': number;
            '3. low': number;
            '4. close': number;
        };
    }

    interface StockDataState {
        'Time Series (5min)'?: StockData;
    }

    const [stockData, setStockData] = useState<StockDataState>({});


    useEffect(() => {
        const data = localStorage.getItem("stockData");
        if (data !== null) {
            setStockData(JSON.parse(data));
            return;
        }
        console.log("Getting data");
        getStockData("IBM").then((data) => {
            localStorage.setItem("stockData", JSON.stringify(data));
            setStockData(data);
        });
    }, []);
    const seriesData = useMemo(
        () => (stockData && stockData['Time Series (5min)'] ? formatStockData(stockData) : []),
        [stockData]
    );


    return (
        <div className="col-span-2">
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
                <ReactApexChart
                    series={
                        [
                            {
                                data: seriesData
                            }
                        ]
                    }
                    options={candleStickOptions}
                    type="candlestick"
                />
            </div>
        </div>
    )
}

export default Chat