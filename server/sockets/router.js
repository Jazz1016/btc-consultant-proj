const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("hit");
  res.send({ response: "Server is up and running." }).status(200);
});

module.exports = router;
