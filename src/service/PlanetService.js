const axios = require("axios").create({
  baseURL: "https://swapi.co/api/"
});

const Planet = require("../models/Planet");
const PlanetRepository = require("../repository/PlanetRepository");

class PlanetService {
  constructor() {
    this.planetRepository = new PlanetRepository();
  }

  async insertPlanet(name, climate, terrain) {
    const pipeline = [
      {
        $sort: { PLANET_ID: -1 }
      },
      { $limit: 1 }
    ];

    let lista = await this.planetRepository.aggregate(pipeline);

    let id = "1";
    if (lista && lista.length > 0)
      id = parseInt(lista[lista.length - 1].PLANET_ID) + 1;

    let pl = new Planet({
      PLANET_ID: id.toString(),
      NAME: name,
      CLIMATE: climate,
      TERRAIN: terrain
    });
    try {
      await this.planetRepository.insertOne(pl);
      return { success: true, msg: "Planeta inserido com sucesso" };
    } catch (e) {
      return { success: false, msg: "Erro ao inserir planeta" };
    }
  }

  async getAllPlanets() {
    return await this.planetRepository.findAll();
  }

  async deletePlanet(planetId) {
    try {
      await this.planetRepository.deleteOne({ PLANET_ID: planetId });
      return true;
    } catch (e) {
      return false;
    }
  }

  async getPlanetById(planetId) {
    try {
      return await this.planetRepository.findOne({ PLANET_ID: planetId });
    } catch (e) {
      console.log("ERRO AO PESQUISAR");
      return;
    }
  }

  async getPlanetByName(planetName) {
    try {
      return await this.planetRepository.findOne({ NAME: planetName });
    } catch (e) {
      console.log("ERRO AO BUSCAR POR ID");
      return;
    }
  }

  async getDataPlanet(planetName) {
    try {
      return axios
        .get("/planets/?search=" + planetName)
        .then(function(response) {
          console.log(response);
          return response.data;
        })
        .catch(function(error) {
          console.log(error);
          return {
            result: false
          };
        });
    } catch (e) {
      return {
        result: false
      };
    }
  }

  async getQtdAparicoes(name) {
    try {
      let qtdFilms = 0;
      let dataPlanetConsult = await this.getDataPlanet(name);
      if (dataPlanetConsult && dataPlanetConsult.results) {
        dataPlanetConsult = dataPlanetConsult.results[0];
      }

      if (dataPlanetConsult) {
        qtdFilms = dataPlanetConsult.films.length;
      }
      return {
        result: "Sucesso",
        error: false,
        qtd: qtdFilms
      };
    } catch (e) {
      return {
        result: "Erro ao pesquisar quantidade de aparições do planeta " + name,
        error: true,
        qtd: 0
      };
    }
  }
}

module.exports = PlanetService;
