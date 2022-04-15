import Avatar from "./Avatar.js";
import Environment from "./Environment.jsx";
import { UserControl } from "./UserControl.jsx";

class newGame{
  constructor(gameId) {
    this.gameId = gameId;
  }
  onStart() {
    console.log("Starting Game from class");
    return <Environment>
      <UserControl avatar={[0, 10, 0]}/>

      <Avatar position={[0,10,0]}/>
    </Environment>
  }

}

export { newGame }