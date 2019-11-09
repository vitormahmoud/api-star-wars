const Connection = require("./Connection");
const BaseRepository = require("./BaseRepository");
const Planet = require("../models/Planet");

class PlanetRepository extends BaseRepository {
  constructor() {
    super(Connection.getCollection("PLANET"), Planet);
  }

  async findOne(query = {}, projection = {}) {
    const result = await this.collection.findOne(query, projection);

    if (result) return new this.Model(result);

    return null;
  }

  async find(query = {}, projection = {}) {
    const resultsRaw = await this.find(query, projection);
    const results = await resultsRaw.toArray();
    return results.map(item => new this.Model(item));
  }

  async insertOne(Model) {
    await this.collection.insertOne(Model);
  }

  async deleteOne(query = {}) {
    await this.collection.deleteOne(query);
  }

  async findAll(query = {}, projection = {}) {
    const resultsRaw = await this.collection.find(query, projection);
    const results = await resultsRaw.toArray();
    return results.map(item => new this.Model(item));
  }

  async lastPlanetInclude() {
    const result = await this.collection
      .find()
      .sort({ PLANET_ID: -1 })
      .limit(1);

    console.log(result);

    if (result) return result.map(item => new this.Model(item));

    return null;
  }
}

module.exports = PlanetRepository;
