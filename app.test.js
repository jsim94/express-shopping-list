const request = require("supertest");
const app = require("./app");
const { items } = require("./fakeDb");

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

process.env.NODE_ENV = "test";

const item = JSON.stringify({
  name: "Noodles",
  price: 3.5,
});

beforeEach(() => {
  items.push(JSON.parse(item));
});

afterEach(() => {
  items.length = 0;
});

describe("Test get", () => {
  test("all items", async () => {
    const resp = await request(app).get(`/items`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([{ name: "Noodles", price: 3.5 }]);
  });
  test("specific item", async () => {
    const resp = await request(app).get(`/items/Noodles`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ name: "Noodles", price: 3.5 });
  });
  test("item that doesnt exist", async () => {
    const resp = await request(app).get(`/items/Noodles1`);

    expect(resp.statusCode).toBe(404);
  });
});

describe("Test post", () => {
  test("new item", async () => {
    const resp = await request(app).post(`/items`).send({ name: "NewItem", price: 4.5 });

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ added: { name: "NewItem", price: 4.5 } });
  });
});

describe("Test patch", () => {
  test("with item that exists", async () => {
    const resp = await request(app).patch(`/items/Noodles`).send({ name: "NewItem2", price: 5.5 });

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ updated: { name: "NewItem2", price: 5.5 } });
  });
  test("with item that doesnt exist", async () => {
    const resp = await request(app).patch(`/items/Noodles1`).send({ name: "NewItem", price: 5.5 });

    expect(resp.statusCode).toBe(404);
  });
});

describe("Test delete", () => {
  test("valid item", async () => {
    const resp = await request(app).delete(`/items/Noodles`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
  test("invalid item", async () => {
    const resp = await request(app).delete(`/items/Noodles1`);
    expect(resp.statusCode).toBe(404);
  });
});
