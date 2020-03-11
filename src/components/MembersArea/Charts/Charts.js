import React, { useState, useEffect } from "react";
import axios from "axios";
import CanvasJSReact from "./canvas.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Charts = () => {
  const [crypto, setCrypto] = useState([]);
  useEffect(() => {
    getCryptocurrencies();
  }, []);
  console.log(crypto);
  const xAxis = crypto.map((date, i) => {
    return {
      x: new Date(date.date),
      y: [date.close, date.high, date.low, date.open]
    };
  });
  console.log(xAxis.splice(30));
  console.log(xAxis);
  const options = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Intel Corporation Stock Price -  2017"
    },
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
        name: "Intel Corporation",
        yValueFormatString: "$###0.00",
        xValueFormatString: "MMMM YY",
        dataPoints: xAxis
      }
    ]
  };
  const getCryptocurrencies = () => {
    axios
      .get(
        "https://financialmodelingprep.com/api/v3/historical-price-full/crypto/BTCUSD"
      )
      .then(res => {
        console.log("hit", res.data);
        setCrypto(res.data.historical);
      });
  };
  console.log(crypto);
  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef = {ref => this.chart = ref} */
      />
      <div className="chart"></div>
    </div>
  );
};

export default Charts;
