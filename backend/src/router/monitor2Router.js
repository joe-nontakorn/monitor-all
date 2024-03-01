//monitor
const express = require("express");
const router = express.Router();
const monitor2Controller = require("../controllers/monitor2Controller");

router.get("/", monitor2Controller.monitor2);

module.exports = router;