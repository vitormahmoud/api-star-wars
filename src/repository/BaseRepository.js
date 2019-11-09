class BaseRepository {
  constructor(collection, Model) {
    this.collection = collection;
    this.Model = Model;
  }

  async count(query = {}) {
    return await this.collection.countDocuments(query);
  }

  async findOne(query = {}, projection = {}) {
    const result = await this.collection.findOne(query, projection);
    if (result) return new this.Model(result);

    return null;
  }

  async find(query = {}, projection = {}) {
    const resultsRaw = await this.collection.find(query, projection);
    const results = await resultsRaw.toArray();
    return results.map(item => new this.Model(item));
  }

  async insertOne(Model) {
    await this.collection.insertOne(Model);
  }

  async updateOne(query = {}, updateQuery) {
    if (!updateQuery)
      throw new Error("Deve ser passada a query para realização do update");
    await this.collection.updateOne(query, updateQuery);
  }

  async deleteOne(query = {}) {
    await this.collection.deleteOne(query);
  }

  async deleteMany(query = {}) {
    await this.collection.deleteMany(query);
  }

  async findPaginated(page, pageSize, query = {}, projection = {}) {
    const resultsRaw = await this.collection
      .find(query, projection)
      .skip(page * pageSize)
      .limit(pageSize);

    const results = await resultsRaw.toArray();
    return results.map(item => new this.Model(item));
  }

  async aggregate(pipelines = []) {
    const resultsRaw = await this.collection.aggregate(pipelines);
    const results = await resultsRaw.toArray();
    return results.map(item => new this.Model(item));
  }

  async aggregateCount(pipelines = []) {
    const result = await this.collection.aggregate(pipelines);
    return result.next();
  }

  async findAll(query = {}, projection = {}) {
    const resultsRaw = await this.collection.find(query, projection);
    const results = await resultsRaw.toArray();
    return results.map(item => new this.Model(item));
  }
}

module.exports = BaseRepository;
