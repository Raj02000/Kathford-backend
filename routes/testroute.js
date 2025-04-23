const express = require("express");
const { sample, getTest } = require("../controller/testcontroller");
const router = express();

router.get("/home", sample);
router.get("/test", getTest);

module.exports = router;
