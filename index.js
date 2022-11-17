const express = require('express')

const { routes } = require('./routes')
const { items } = require('./fakeDb')
const ExpressError = require('./expressError')

const app = express()

app.use('/', routes)


app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError);
});

app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status },
  });
});


app.listen(3000,()=>{
  console.log("App started on port 3000")
})

module.exports = {
 app
}