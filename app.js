const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const index = require('./routes/index');
const hello = require('./routes/hello');
require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 1337;

app.use(cors());
app.use(express.json());

app.use('/', index);
app.use('/hello', hello);

if (process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// app.use((req, res, next) => {
//   console.log(req.method);
//   console.log(req.path);
//   next();
// });

// app.use((req, res, next) => {
//   var err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// app.use((err, req, res, next) => {
//   if (res.headersSent) {
//     return next(err);
//   }

//   res.status(err.status || 500).json({
//     "errors": [
//       {
//         "status": err.status,
//         "title": err.message,
//         "detail": err.message
//       }
//     ]
//   });
// });

const server = app.listen(port, () => {
  console.log(`Example API listening on port ${port}!`);
});

module.exports = server;