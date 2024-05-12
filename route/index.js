const express = require("express");
const router = express.Router();
const message = require("./message");
const auth = require("./auth");

router.use("/messages", message);
router.use("/auth", auth);

module.exports = router;
