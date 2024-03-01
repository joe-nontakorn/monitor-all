//monitor
const express = require("express");
const router = express.Router();
const BLDG1Controller = require("../controllers/BLDG1Controller");

router.get("/", BLDG1Controller.BLDG1);

module.exports = router;