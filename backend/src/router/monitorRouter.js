//monitor
const express = require("express");
const router = express.Router();
const monitorController = require("../controllers/monitorController");

router.get("/", monitorController.monitor);

module.exports = router;