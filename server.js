// const http = require('http');
// const static = require('node-static');
const express = require('express');
const WebSocketServer = new require('ws');

const PORT = process.env.PORT || 5000
const INDEX = '/index.html';
const GM = '/gm.html';


const server = express()
  .use((req, res) => res.sendFile(req.url, { root: __dirname }))
  // .get('/gm.html', (req,res) => {res.sendFile(GM)}) 
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

// подключенные клиенты
let clients = {};

// WebSocket-сервер на порту 8081
const webSocketServer = new WebSocketServer.Server({ server });
webSocketServer.on('connection', (ws) => {

  const id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on('message', (message) => {
    console.log('получено сообщение ' + message);

    for (const key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', () => {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

});


// // обычный сервер (статика) на порту 8080
// var fileServer = new static.Server('.');
// http.createServer(function (req, res) {

//   fileServer.serve(req, res);

// }).listen(PORT);

// console.log("Сервер запущен на портах 8080, 8081");

