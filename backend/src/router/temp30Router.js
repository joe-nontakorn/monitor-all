//temp
const express = require("express");
const router = express.Router();
const temp30Controller = require("../controllers/temp30Controller");

router.get("/", temp30Controller.temp30);

module.exports = router;