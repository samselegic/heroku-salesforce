const express = require("express");
const router = express.Router();

router.use("/download", require("./download"));
router.use("/upload", require("./upload"));

module.exports = router;
