const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const index = require('./routes/index');
const auth = require('./routes/auth');
const hello = require('./routes/hello');
const httpServer = require("http").createServer(app);
require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 1337;

app.use(cors());
app.use(express.json());

app.use('/', index);
app.use('/auth', auth);
app.use('/hello', hello);

if (process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.sockets.on('connection', function (socket) {
  console.log('connected, ' + socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('my message', (msg) => {
    io.emit('my broadcast', `server: ${msg}`);
  });

  socket.on('text editor', (msg) => {
    io.emit('server editor', `${msg}`);
  });

  socket.on('text option', (msg) => {
    io.emit('server option', `${msg}`);
  });

  socket.on('text alldata', (msg) => {
    io.broadcast.emit('server alldata', msg);
  });

});




const server = httpServer.listen(port, () => {
  console.log(`Example API listening on port ${port}!`);
});

module.exports = server;