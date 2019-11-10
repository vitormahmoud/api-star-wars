const connector = require("../src/repository/Connection");
const API_BASE_URL = "/api/rest/planetRouter/";
const request = require("supertest");
const app = require("../src/app");

describe("Get Endpoints", () => {
  it("Get ALL", async done => {
    connector.connect().then(async () => {
      const res = await request(app).get(API_BASE_URL);
      expect(res.statusCode).toEqual(200);
    });
    connector.disconnect();
    done();
  });

  it("GET ID", async done => {
    connector.connect().then(async () => {
      const res = await request(app).get(`${API_BASE_URL}12`);
      expect(res.statusCode).toEqual(200);
      expect(res.result.PLANET_ID).toEqual(12);
    });
    connector.disconnect();
    done();
  });

  it("GET ID error", async done => {
    connector.connect().then(async () => {
      const res = await request(app).get(`${API_BASE_URL}aaa`);
      expect(res.statusCode).toEqual(200);
      expect(res.result.PLANET_ID).toEqual(12);
    });
    connector.disconnect();
    done();
  });

  it("GET NAME", async done => {
    connector.connect().then(async () => {
      const res = await request(app).get(
        `${API_BASE_URL}planetByName/Alderaan`
      );
      expect(res.statusCode).toEqual(200);
      expect(res.result.PLANET_ID).toEqual(12);
    });
    connector.disconnect();
    done();
  });
});

describe("Delete Endpoints", () => {
  it("Delete planet", async done => {
    connector.connect().then(async () => {
      const res = await request(app).delete(`${API_BASE_URL}1`);
      expect(res.statusCode).toEqual(200);
    });
    connector.disconnect();
    done();
  });
  it("Delete planet ERROR", async done => {
    connector.connect().then(async () => {
      const res = await request(app).delete(`${API_BASE_URL}aaa`);
      expect(res.statusCode).toEqual(200);
    });
    connector.disconnect();
    done();
  });
});

// describe("Post Endpoints", () => {});
