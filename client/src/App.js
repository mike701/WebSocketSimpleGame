import './App.css';
import { Suspense, useState } from 'react';
import React from 'react'
import { newGame } from './GameClass.mjs';

function App() {
  const [gameFlag, setGameFlag] = useState(false)
  const [game,setGame]=useState(null)
  let clientId = null;
  let gameId = null;
  // let Game;
  let ws=new WebSocket('ws://localhost:3000');
  const rectangleForward = document.getElementById("moveForward");
  const rectangleBackward = document.getElementById("moveBackward");


  function moving(startingPoint){
    // ctx.clearRect(0, 0, c.width, c.height);
    const payLoad={
      "method":"update",
      "clientId":clientId,
      "gameId":gameId,
      "Position":startingPoint,
    }
    ws.send(JSON.stringify(payLoad))
  }
  let startingPoint
  // rectangleForward.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   moving(startingPoint += 10);
  // })
  // rectangleBackward.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   moving(startingPoint -= 10);
  // })
  function startGame(e) {
    e.preventDefault();
    console.log("starting game");
    const payLoad={
      "method": "create",
      "clientId":clientId
    }
    ws.send(JSON.stringify(payLoad));
  }
  function joinGame(e){
    e.preventDefault();
    console.log("Joining game");
    let joinId=document.getElementById('joinGame')
    // console.log(joinId.value)
    // ctx.clearRect(0, 0, c.width, c.height);
    // console.log("starting",startingPoint)
    const payLoad={
      "method":"join",
      "clientId":clientId,
      "gameId":joinId.value,
    }
    console.log(payLoad)
    ws.send(JSON.stringify(payLoad));
  }
  

  ws.onmessage = message => {            //message.data
          const response = JSON.parse(message.data);
          //connect
          if (response.method === "connect"){
              clientId = response.clientId;
              console.log("Client id Set successfully " + clientId)
          }

          //create
          if (response.method === "create"){
            console.log(response)
            gameId = response.game.id;
            setGame(new newGame(gameId));
            setGameFlag(true);
            console.log(game, gameFlag);
              startingPoint=response.game.Position;
          }
          if (response.method === "update"){
              console.log(response)
              gameId = response.game.id;
              startingPoint=response.game.Position;
          }
          if(response.method==="join"){
            console.log("join",response)
            gameId = response.game.id;
            startingPoint=response.game.Position;
          }
   }
  return (
    <div className="App">
      <>
        <div style={{padding:"5vh"}}>
          <button onClick={(e) => { startGame(e); }}>Start New Game</button>
          <button onClick={(e) => { joinGame(e); }}>Join A Game</button>
          <input type="text" id="joinGame"/>
          <button id="moveBackward">Back</button>
          <button id="moveForward">Forward</button>
         </div>
        <Suspense fallback={<h1>Hello</h1>} style={{ position: "absolute", top: "10vh" }}>
          {gameFlag && <>
            {game.onStart()}
          </>}
          </Suspense>
        </>
    </div>
  );
}

export default App;
