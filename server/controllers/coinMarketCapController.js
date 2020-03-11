require("dotenv").config();
const rp = require("request-promise");
const { CMC_PRO_API_KEY } = process.env;
module.exports = {
  getCoinData: (req, res) => {
    console.log("hit");
    const requestOptions = {
      method: "GET",
      uri:
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical",
      qs: {
        symbol: "BTC,USDT,DASH,LTC,ETH,EOS",
        count: "200",
        time_start: "2018-03-10T23:59:00",
        time_end: "",
        invterval: "daily"
      },
      headers: {
        "X-CMC_PRO_API_KEY": CMC_PRO_API_KEY
      },
      json: true,
      gzip: true
    };

    rp(requestOptions)
      .then(response => {
        console.log("API call response:", response);
        res.status(200).send(response);
      })
      .catch(err => {
        console.log("API call error:", err.message);
      });
  }
};
