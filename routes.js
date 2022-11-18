const express = require("express");
const ExpressError = require("./expressError");
const { items, findItemIndex } = require("./fakeDb");

const router = new express.Router();

router.get("/", (req, res) => {
  return res.send("Nothing here :\\");
});

router.get("/items", (req, res) => {
  return res.json(items);
});

router.post("/items", (req, res) => {
  const item = {
    name: req.body.name,
    price: req.body.price,
  };

  items.push(item);
  return res.json({ added: item });
});

router.get("/items/:name", (req, res) => {
  itemIndex = findItemIndex(req.params.name);
  if (itemIndex === -1) {
    throw new ExpressError("Item index not found", 404);
  }

  return res.json(items[itemIndex]);
});

router.patch("/items/:name", (req, res) => {
  itemIndex = findItemIndex(req.params.name);
  if (itemIndex === -1) {
    throw new ExpressError("Item index not found", 404);
  }

  items[itemIndex].name = req.body.name;
  items[itemIndex].price = req.body.price;

  return res.json({ updated: items[itemIndex] });
});

router.delete("/items/:name", (req, res) => {
  itemIndex = findItemIndex(req.params.name);
  if (itemIndex === -1) {
    throw new ExpressError("Item index not found", 404);
  }

  items.pop(itemIndex);
  return res.json({ message: "Deleted" });
});

module.exports = {
  routes: router,
};
