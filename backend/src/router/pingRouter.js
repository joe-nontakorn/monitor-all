//pingRouter
const express = require("express");
const router = express.Router();
const pingController = require("../controllers/pingController");

router.get("/", pingController.pingCctv);

module.exports = router;