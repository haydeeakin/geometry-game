import React from "react";
import MindFuel from "./game/MindFuel";
import Levels from "./game/Levels";

import "./App.css";

function App() {
  return (
    
    <div className="App">
      {/* <MindFuel /> */}
      {/* <Levels /> */}
    

      <div className="banner">
        <h2 className="banner header" ><span style={{ filter: "drop-shadow(0px 30px 2px yellow)" }}>Welcome to Transformation Game</span></h2>
      </div>
      <div style={{ textAlign: "left", backgroundColor: "black" }} >
        <button className="navbar">Experiment</button>
        <button className="navbar">Challenges</button>
        <button className="navbar">Sign Out</button>
      </div>



    </div>
  );
}

export default App;
