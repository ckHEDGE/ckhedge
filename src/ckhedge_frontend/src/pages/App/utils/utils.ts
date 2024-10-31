export const getStockData = async (symbol: string) => {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.LIVE_CHAT}`);
    const data = await response.json();
    return data
};

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

export const formatStockData = (stockData: StockDataState) => {
    const formattedData = [];

    if (stockData['Time Series (5min)']) {
        Object.entries(stockData['Time Series (5min)']).forEach(
            ([key, value]) => {
                formattedData.push({
                    x: key,
                    y: [
                        Number(value['1. open']),
                        Number(value['2. high']),
                        Number(value['3. low']),
                        Number(value['4. close']),
                    ],
                });
            }
        );
    }

    return formattedData;
};

