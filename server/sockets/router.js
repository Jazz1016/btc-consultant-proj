const express = require("express");
const router = express.Router();

router.get("/api/chat", (req, res) => {
  res.send("server is up and running");
});

module.exports = router;
