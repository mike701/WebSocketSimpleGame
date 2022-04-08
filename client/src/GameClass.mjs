import Environment from "./Environment.jsx";

class newGame{
  constructor(gameId) {
    this.gameId = gameId;
  }
  onStart() {
    console.log("Starting Game from class");
    return <Environment/>
  }

}

export { newGame }