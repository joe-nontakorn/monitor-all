//pingRouter
const express = require("express");
const router = express.Router();
const ping2Controller = require("../controllers/ping2Controller");

router.get("/", ping2Controller.ping2Cctv);

module.exports = router;