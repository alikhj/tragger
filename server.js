var express = require('express'),
  httpServer = require('http'),
  path = require('path'),
  app = express(),
  rethink = require('rethinkdb'),
  crypto = require('crypto'),
  server = httpServer.createServer(app)

var io = require('socket.io').listen(server)
io.on('connection', function(socket) {
  console.log(socket.id + "connected")
})

httpServer.globalAgent.maxSockets = 1000

app.route('/').get(function(req, res) {
  console.log('server accessed through browser');
})



var r = require('./setupDatabase')
server.listen(3000)
console.info('tragger server started. listening on port 3000')
