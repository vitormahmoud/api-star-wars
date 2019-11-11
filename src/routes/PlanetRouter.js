const express = require("express");
const PlanetService = require("../service/PlanetService");
const router = express.Router();

router.get("/", async (req, res) => {
  const planetService = new PlanetService();
  let all = await planetService.getAllPlanets();

  for (let index = 0; index < all.length; index++) {
    try {
      const aparicoes = await planetService.getQtdAparicoes(all[index].NAME);
      all[index].QTD_FILMS = aparicoes.qtd;
    } catch (e) {
      all[index].QTD_FILMS = 0;
    }
  }
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

router.get("/:search", async (req, res) => {
  const search = req.params.search;

  if (!search) return res.status(400).json("Bad request");
  try {
    const planetService = new PlanetService();
    let planet;

    if (await planetService.isNumeric(search)) {
      planet = await planetService.getPlanetById(search);
    } else {
      planet = await planetService.getPlanetByName(search);
    }

    if (planet) {
      const aparicoes = await planetService.getQtdAparicoes(planet.NAME);
      planet.QTD_FILMS = aparicoes.qtd;

      return res.status(200).json({
        result: planet
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
