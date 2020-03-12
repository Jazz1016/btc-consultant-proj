import React, { useState, useEffect } from "react";
import axios from "axios";
import CanvasJSReact from "./canvas.react";
import { Button } from "react-bootstrap";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Charts = () => {
  const [crypto, setCrypto] = useState({ historical: [], symbol: "adffdasf" });
  const { symbol } = crypto;
  useEffect(() => {}, []);
  // console.log(crypto);
  const cryptoData = crypto.historical.map((date, i) => {
    return {
      x: new Date(date.date),
      y: [date.close, date.high, date.low, date.open]
    };
  });
  // const monthly = () => {
  cryptoData.splice(30);
  // };
  const yearly = () => {
    cryptoData.splice(365);
  };

  const options = {
    theme: "dark1",
    animationEnabled: true,
    exportEnabled: true,
    // title: {
    //   text: "BTC price chart"
    // },
    axisX: {
      valueFormatString: "MMM"
    },
    axisY: {
      includeZero: false,
      prefix: "$",
      title: "Price (in USD)"
    },
    data: [
      {
        type: "candlestick",
        showInLegend: true,
        name: `${crypto.symbol}`,
        yValueFormatString: "$###0.00",
        xValueFormatString: "MMMM YY",
        dataPoints: cryptoData
      }
    ]
  };
  const getBitcoin = () => {
    axios
      .get(
        "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/BTCUSD"
      )
      .then(res => {
        console.log("hit", res.data);
        setCrypto(res.data);
      });
  };
  const getLitecoin = () => {
    axios
      .get(
        "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/LTCUSD"
      )
      .then(res => {
        console.log("hit", res.data);
        setCrypto(res.data);
      });
  };
  const getEtherium = () => {
    axios
      .get(
        "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/ETHUSD"
      )
      .then(res => {
        console.log("hit", res.data);
        setCrypto(res.data);
      });
  };

  console.log(crypto);
  return (
    <div>
      {}
      <CanvasJSChart options={options} />
      <Button
        onClick={() => {
          getBitcoin();
        }}
      >
        BTC
      </Button>
      <Button
        onClick={() => {
          getLitecoin();
        }}
      >
        LTC
      </Button>
      <Button
        onClick={() => {
          getEtherium();
        }}
      >
        ETH
      </Button>
      <Button
      // onClick={() => {
      //   weekly();
      // }}
      >
        Week
      </Button>
      <Button
      // onClick={() => {
      //   monthly();
      // }}
      >
        Month
      </Button>
      <Button
      // onClick={() => {
      //   yearly();
      // }}
      >
        Year
      </Button>
    </div>
  );
};

export default Charts;
