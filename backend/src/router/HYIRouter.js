//monitor
const express = require("express");
const router = express.Router();
const HYIController = require("../controllers/HYIController");

router.get("/", HYIController.HYI);

module.exports = router;