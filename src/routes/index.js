const express = require("express");
const router = express.Router();

const planetRouter = require("./PlanetRouter");

const API_BASE_URL = "/api/rest";

router.use(`${API_BASE_URL}/planetRouter`, planetRouter);
router.all("*", async (req, res) => {
  res.status(404).json("not found");
});

module.exports = router;
