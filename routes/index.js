const express = require("express");
const router = express.Router();

//home route
router.get("/", (req, res) => {
  return res.status(200).json({
    msg: "Welcome!",
  });
});
router.use("/api", require("./api/index"));

//all other routes that are not defined
router.get("*", (req, res) => {
  return res.status(200).json({
    msg: "This Route is not available!",
  });
});

module.exports = router;
