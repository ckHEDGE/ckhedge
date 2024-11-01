import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FiCamera, FiSettings } from 'react-icons/fi';
import { MdFullscreen } from 'react-icons/md';
import { formatStockData, getStockData } from '../utils/utils';
import ReactApexChart from 'react-apexcharts';
import { candleStickOptions } from '../constants';
import PeriodDropdown from './PeriodDropdown';
import ChartMenu from './ChartMenu';

const Chart = () => {
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
        <div className="col-span-3">
            <div className="flex items-center justify-between mt-2 gap-2">
                <div className="border border-[#43507a] rounded-2xl  w-fit flex items-center gap-4 p-1  ">
                    <button className='py-2 px-2 bg-[#1c2530] rounded-2xl '>
                        Candle Line
                    </button>
                    <button
                        className='py-2 px-2 rounded-2xl'
                    >
                        Depth Chart
                    </button>
                </div>
             <div className="flex gap-3">
             <PeriodDropdown />
             <ChartMenu />
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

export default Chart