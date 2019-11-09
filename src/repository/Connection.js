const MongoClient = require("mongodb").MongoClient;

const CONNECTION_URL = "mongodb://localhost:27017/";
const DATABASE_NAME = "star-war";

let database = null;

function connect() {
  console.log("REST API STAR-WARS STARTED");
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      CONNECTION_URL,
      { useUnifiedTopology: true },
      (error, client) => {
        if (error) {
          reject(error);
          return;
        }
        database = client.db(DATABASE_NAME);
        resolve(this.database);
      }
    );
  });
}

function disconnect() {
  if (database) database.close();
}

function getCollection(collectionName) {
  if (!database) {
    throw new Error("Call connect method first");
  }

  return database.collection(collectionName);
}

module.exports = {
  connect,
  disconnect,
  getCollection
};
