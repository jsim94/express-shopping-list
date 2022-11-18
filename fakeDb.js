global.items = [];

function findItemIndex(name) {
  return items.findIndex((obj) => {
    return obj.name.toLowerCase() === name.toLowerCase();
  });
}

module.exports = {
  items,
  findItemIndex,
};
