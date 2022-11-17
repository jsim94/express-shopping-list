global.items =[
  {
    name:"Pickles",
    price: 3.50
  }
]


function findItemIndex(name) {
  return items.findIndex((obj)=>{
    return obj.name === itemName;
  })
}

module.exports = {
  items,
  findItemIndex
}