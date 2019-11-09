require("dotenv").config({
  path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env"
});
const express = require("express");
const BodyParser = require("body-parser");
const PlanetRepository = require("../repository/PlanetRepository");

var app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.listen(3000);

app.get("/pln", async (request, response) => {
  const planetRepository = new PlanetRepository();

  try {
    const count = await planetRepository.count();
    const Planet = await planetRepository.findOne();
    const FindMany = await planetRepository.find();
    return response.status(200).json({
      Count: count,
      FindOne: Planet,
      FindMany: FindMany
    });
  } catch (e) {
    return response.status(500).json(e);
  }
});
