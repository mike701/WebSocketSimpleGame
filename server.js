const express=require("express");
// const { request } = require("http");
const webSocket = require("websocket").server
const {v4: uuidv4 } =require('uuid');
const app = express();
const user2 = express();
const server=require("http").createServer();
let PORT = 3001;

app.get("/", (req, res) => {
  // res.send(`<h1>Hello Gamers</h1>`)
  res.sendFile(__dirname + '/index.html')
})
user2.get("/", (req, res) => {
  // res.send(`<h1>Hello Gamers</h1>`)
  res.sendFile(__dirname + '/index2.html')  
})
user2.listen(3002, () => console.log(`Listening to the sweet sounds of Port: ${3002}`));
app.listen(PORT, () => console.log(`Listening to the sweet sounds of Port: ${PORT}`));
server.listen(3000,()=>{console.log("Listening on port 3000 with httpServer")})
const wsServer = new webSocket({"httpServer":server})

// wsServer.on('upgrade', (request, socket, head) => {
//   wsServer.handleUpgrade(request, socket, head, socket => {
//     wsServer.emit('connection', socket, request);
//   });
// });

const clients = {}
const games = {}

wsServer.on("request", (request) => {

  const connection = request.accept(null, request.origin)
  console.log("connection",connection)
  connection.on("open", () => {console.log("open")})
  connection.on("close", () => {console.log("connection close")})
  connection.on("message", message => { 
    const response = JSON.parse(message.utf8Data)
    console.log(response,response.method)
    if (response.method === "create") {
      // console.log("first")
      const clientId = response.clientId;
      const gameId = uuidv4();
      games[gameId] = {
        "id": gameId,
        "clients":[clientId],
        "Position": 20,
      }
      const payLoad = {
        "method": "create",
        "game": games[gameId]
      }
      console.log(payLoad)
      const unique = clients[clientId].connection
      unique.send(JSON.stringify(payLoad))
    } else if (response.method === "update") {
      console.log(response)
      // const clientId = response.clientId;
      games[response.gameId] = {
        "id": response.gameId,
        "clients":[...games[response.gameId].clients],
        "Position": response.Position,
      }
      const payLoad = {
        "method": "update",
        "game": games[response.gameId]
      }
      console.log(payLoad, games[response.gameId])
      for (const client in games[response.gameId].clients) {
        // console.log(games[response.gameId].clients[client]);
        const unique = clients[games[response.gameId].clients[client]].connection
        unique.send(JSON.stringify(payLoad))
      }
    } else if (response.method === "join") {
      console.log(response)
      const clientId = response.clientId;
      let currentGame = games[response.gameId]
      currentGame.clients.push(clientId)
      const payLoad = {
        "method": "join",
        "game": currentGame
      }
      console.log(payLoad,currentGame)
      const unique = clients[clientId].connection
      unique.send(JSON.stringify(payLoad))
    }
  })
  const clientId = uuidv4();
  clients[clientId] = { "connection":connection };
  const payLoad = {
    "method": "connect",
    "clientId":clientId
  }
  connection.send(JSON.stringify(payLoad))
  // const client = new webSocketServer('ws://localhost:3000');
  // client.on('open', () => {
  //   // Causes the server to print "Hello"
  //   console.log("client")
  //   client.send('Hello');
  //   client.send(JSON.stringify(payLoad))
  //   console.log(payLoad)
  // });
  // client.OPEN;
})

