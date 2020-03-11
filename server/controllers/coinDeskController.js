const axios = require("axios");

module.exports = {
  getBTCPrices: async (req, res) => {
    await axios
      .get("http://api.bitcoincharts.com/v1/trades.csv?symbol=BTC")
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
