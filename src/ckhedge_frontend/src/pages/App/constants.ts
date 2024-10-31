
import { ApexOptions } from 'apexcharts';
export const candleStickOptions: ApexOptions = {
    chart: {
        type: 'candlestick',
    },
    title: {
        text: 'Stock Chart',
        align: 'left',
    },
    xaxis: {
        type: 'datetime',
    },
    yaxis: {
        tooltip: {
            enabled: true,
        },
    },
};



export const pages = [
    {
      name: "Trade",
      route: "/trade",
    },
    {
      name: "Dashboard",
      route: "/dashboard",
    },
    {
      name: "Insurance",
      route: "/insurance",
    },
    {
      name: "Stacking",
      route: "/stacking",
    },
    {
      name: "History",
      route: "/history",
    },
    {
      name: "Governance",
      route: "/governance",
    }
  ]

  export const orderBookData =  [
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' },
    { price: '43.114', amount: '3396.4537', total: '3,397.1437' }
  ];

  export const orderData = [
    {
      time: "2022/07/30 16:18:41",
      pair: "BTC/USDT",
      type: "Limit Order",
      action: "Buy",
      price: "36,641.20",
      amount: "0.265622",
      filled: "25%",
      unfilled: "75%",
    },
    {
      time: "2022/07/30 16:18:41",
      pair: "BTC/USDT",
      type: "Limit Order",
      action: "Sell",
      price: "36,641.20",
      amount: "1.56525",
      filled: "25%",
      unfilled: "75%",
    },
    {
      time: "2022/07/30 16:18:41",
      pair: "BTC/USDT",
      type: "Limit Order",
      action: "Buy",
      price: "36,641.20",
      amount: "0.265622",
      filled: "25%",
      unfilled: "75%",
    },
    {
      time: "2022/07/30 16:18:41",
      pair: "BTC/USDT",
      type: "Limit Order",
      action: "Sell",
      price: "36,641.20",
      amount: "0.265622",
      filled: "50%",
      unfilled: "50%",
    },
  ];
  
  