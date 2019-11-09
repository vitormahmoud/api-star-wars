const express = require("express");
const PlanetService = require("../service/PlanetService");
const router = express.Router();

router.get("/", async (req, res) => {
  const planetService = new PlanetService();
  let all = await planetService.getAllPlanets();
  all = all.map(item => {
    return {
      PLANET_ID: item.PLANET_ID,
      NAME: item.NAME,
      CLIMATE: item.CLIMATE,
      TERRAIN: item.TERRAIN
    };
  });
  return res.status(200).json(all);
});

router.post("/", async (req, res) => {
  const { name, climate, terrain } = req.body;
  let dataPlanetServer;
  const planetService = new PlanetService();
  if (!name && !climate && !terrain) return res.status(400).json("Bad request");

  try {
    dataPlanetServer = await planetService.getDataPlanet(name);
    if (!dataPlanetServer && dataPlanetServer.count == 0) {
      return res.status(404).json({
        result: "Planeta " + name + " não existe na série de filmes Star-Wars !"
      });
    }
  } catch (e) {
    return res.status(500).json({
      result: "Erro ao verificar planeta na rota de filmes"
    });
  }
  try {
    existPlanet = await planetService.getPlanetByName(name);
    if (existPlanet) {
      return res.status(404).json({
        result: "Ja existe um planeta cadastrado com nome : " + name
      });
    }
  } catch (e) {
    return res.status(500).json({
      result: "Erro verificar se o planeta ja foi cadastrado"
    });
  }

  try {
    const result = await planetService.insertPlanet(name, climate, terrain);

    return res.status(200).json({ result: result });
  } catch (e) {
    return res.status(500).json({
      result: "Erro ao inserir planeta"
    });
  }
});

router.post("/planetByName", async (req, res) => {
  const { name } = req.body;

  const planetService = new PlanetService();
  if (!name) return res.status(400).json("Bad request");
  try {
    const planet = await planetService.getPlanetByName(name);
    if (planet) {
      const aparicoes = await planetService.getQtdAparicoes(name);
      return res
        .status(200)
        .json({ result: planet, filmsQuantity: aparicoes.qtd });
    } else {
      return res.status(404).json({
        result: "Nenhum planeta encontrado"
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      result: "Erro ao pesquisar planeta"
    });
  }
});

router.get("/:planetId", async (req, res) => {
  const planetId = req.params.planetId;

  if (!planetId) return res.status(400).json("Bad request");
  try {
    const planetService = new PlanetService();
    const planet = await planetService.getPlanetById(planetId);
    if (planet) {
      return res.status(200).json({
        result: planetService.checkPlanet(planet)
      });
    } else {
      return res.status(404).json({
        result: "Nenhum planeta encontrado"
      });
    }
  } catch (e) {
    return res.status(500).json({
      result: "Erro na busca por ID"
    });
  }
});

router.delete("/:planetId", async (req, res) => {
  const planetId = req.params.planetId;

  if (!planetId) return res.status(400).json("Bad request");

  console.log("Planeta a ser deletado é de número : " + planetId);
  try {
    const planetService = new PlanetService();
    const result = await planetService.deletePlanet(planetId);

    return res.status(200).json({ result: result });
  } catch (e) {
    return res.status(500).json({
      result: "Erro ao deletar planeta"
    });
  }
});

module.exports = router;
