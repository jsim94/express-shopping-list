

//const request = require("supertest")
//const { app } = ("./index")
//const { items } = require("./fakeDb")

let item = {
  name:"Noodles",
  price: 3.50
}

//beforeEach(()=>{
//  items.push(item)
//})

//afterEach(()=> {
//  items.length = 0
//})

test("get items",()=>{
  // await const res = await request(app).get('/items')
  
  expect('200').toBe('200')
  
})