const http = require('http');
const static = require('node-static');
const WebSocketServer = new require('ws');
var PORT = process.env.PORT || 5000

// подключенные клиенты
let clients = {};

// WebSocket-сервер на порту 8081
const webSocketServer = new WebSocketServer.Server({ port: 8081 });
webSocketServer.on('connection', function (ws) {

  const id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on('message', function (message) {
    console.log('получено сообщение ' + message);

    for (const key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', function () {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

});


// обычный сервер (статика) на порту 8080
var fileServer = new static.Server('.');
http.createServer(function (req, res) {

  fileServer.serve(req, res);

}).listen(PORT);

console.log("Сервер запущен на портах 8080, 8081");

