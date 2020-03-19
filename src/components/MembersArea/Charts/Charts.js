import React, { useState, useEffect } from "react";
import axios from "axios";
import CanvasJSReact from "./canvas.react";
import { Button } from "react-bootstrap";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Charts = () => {
  const [BTC, setBTC] = useState({});
  const [LTC, setLTC] = useState({});
  const [ETH, setETH] = useState({});
  const [DASH, setDASH] = useState({});
  const [EOS, setEOS] = useState({});
  const [XMR, setXMR] = useState({});
  const [XRP, setXRP] = useState({});
  const [liveCrypto, setLiveCrypto] = useState([]);
  const [options, setOptions] = useState({
    theme: "dark1",
    animationEnabled: true,
    exportEnabled: true,
    axisX: {
      valueFormatString: "MM/YY"
    },
    axisY: {
      includeZero: false,
      prefix: "$",
      title: "Price (in USD)"
    },
    data: {
      type: "candlestick",
      showInLegend: true,
      name: `symbol`,
      yValueFormatString: "$###0.00",
      xValueFormatString: "MMMM YY",
      dataPoints: null
    }
  });
  useEffect(() => {
    axios
      .get(
        "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/BTCUSD"
      )
      .then(res => {
        setBTC(res.data);
      });
    axios
      .get(
        "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/LTCUSD"
      )
      .then(res => {
        setLTC(res.data);
      });
    axios
      .get(
        "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/ETHUSD"
      )
      .then(res => {
        setETH(res.data);
      });
    axios
      .get(
        "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/DASHUSD"
      )
      .then(res => {
        setDASH(res.data);
      });
    axios
      .get(
        "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/EOSUSD"
      )
      .then(res => {
        setEOS(res.data);
      });
    axios
      .get(
        "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/XMRUSD"
      )
      .then(res => {
        setXMR(res.data);
      });
    axios
      .get(
        "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/XRPUSD"
      )
      .then(res => {
        setXRP(res.data);
      });
  }, []);

  const getBitcoinAllTime = () => {
    const cryptoData = BTC.historical.map((date, i) => {
      return {
        x: new Date(date.date),
        y: [date.close, date.high, date.low, date.open]
      };
    });
    setOptions({
      ...options,
      data: [
        {
          type: "candlestick",
          showInLegend: true,
          name: `${BTC.symbol}`,
          yValueFormatString: "$###0.00",
          xValueFormatString: "MMMM YYYY",
          dataPoints: cryptoData
        }
      ]
    });
  };

  const getBitcoin = () => {
    axios
      .get(
        "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/BTCUSD"
      )
      .then(res => {
        console.log("hit", res.data);
        // setSymbol(res.data.symbol);
        // setCrypto(res.data.historical);
        const cryptoData = res.data.historical.map((date, i) => {
          return {
            x: new Date(date.date),
            y: [date.close, date.high, date.low, date.open]
          };
        });
        setOptions([
          {
            type: "candlestick",
            showInLegend: true,
            name: `${res.data.symbol}`,
            yValueFormatString: "$###0.00",
            xValueFormatString: "MMMM YY",
            dataPoints: cryptoData
          }
        ]);
      });
  };

  console.log(BTC, LTC, ETH, DASH, EOS, XRP, XMR);
  return (
    <div>
      {}
      <CanvasJSChart options={options} />
      <Button
        onClick={() => {
          getBitcoinAllTime();
        }}
      >
        BTC
      </Button>
      <Button
        onClick={() => {
          // getLitecoin();
        }}
      >
        LTC
      </Button>
      <Button
        onClick={() => {
          // getEtherium();
        }}
      >
        ETH
      </Button>
      <Button>Week</Button>
      <Button>Month</Button>
      <Button>Year</Button>
    </div>
  );
};

export default Charts;

// const getLitecoin = () => {
//   axios
//     .get(
//       "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/LTCUSD"
//     )
//     .then(res => {
//       console.log("hit", res.data);
//       const cryptoData = res.data.historical.map((date, i) => {
//         return {
//           x: new Date(date.date),
//           y: [date.close, date.high, date.low, date.open]
//         };
//       });
//       setData([
//         {
//           type: "candlestick",
//           showInLegend: true,
//           name: `${res.data.symbol}`,
//           yValueFormatString: "$###0.00",
//           xValueFormatString: "MM/YY",
//           dataPoints: cryptoData
//         }
//       ]);
//     });
// };
// const getEtherium = () => {
//   axios
//     .get(
//       "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/ETHUSD"
//     )
//     .then(res => {
//       console.log("hit", res.data);
//       const cryptoData = res.data.historical.map((date, i) => {
//         return {
//           x: new Date(date.date),
//           y: [date.close, date.high, date.low, date.open]
//         };
//       });
//       setData([
//         {
//           type: "candlestick",
//           showInLegend: true,
//           name: `${res.data.symbol}`,
//           yValueFormatString: "$###0.00",
//           xValueFormatString: "YYYY",
//           dataPoints: cryptoData
//         }
//       ]);
//     });
// };
