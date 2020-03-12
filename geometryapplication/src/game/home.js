import React from "react";
import MindFuel from "./MindFuel";
// import MindFuel from "./game/MindFuel";
// import Levels from "./game/Levels";



class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      page: 'login'
    }
  }
  
handleOnClick = (e) => {
    console.log(e.target.name)
    // if (event.target.name === "btnExperiment") {
    //     return < MindFuel/>
        
    // }
}


  render(){
      return (
    
    <div className="App">
 
      <div className="banner">
        <h2 className="banner header" ><span style={{ filter: "drop-shadow(0px 30px 2px yellow)" }}>Welcome to Transformation Game</span></h2>
      </div>
      <div style={{ textAlign: "left", backgroundColor: "black" }} >
        <button className="navbar" name= "btnExperiment" onClick ={(event)=> this.handleOnClick()} >Experiment</button>
        <button className="navbar" name= "btnChallenges">Challenges</button>
        <button className="navbar" name= "btnSignOut">Sign Out</button>
      </div>
    </div>
  );
  }

}

export default Home;
