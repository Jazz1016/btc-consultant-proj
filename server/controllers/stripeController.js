const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = {
  payment: (req, res) => {
    console.log(req.body);
    const {
      token: { id },
      priceTotal
    } = req.body;

    stripe.charges.create(
      {
        amount: priceTotal * 100,
        currency: "usd",
        source: id,
        description: "Test Charge"
      },
      async (err, charge) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        } else {
          console.log("Order successful");
          return res.status(200).send(charge);
        }
      }
    );
  }
};
