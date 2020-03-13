import React from "react";
import MindFuel from "./MindFuel";
// import MindFuel from "./game/MindFuel";
// import Levels from "./game/Levels";
import './queue.css'


class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      whichButtonClicked: ''
    }
  }
  
  handleClick = (event) => {
    this.setState({
      whichButtonClicked: event.target.name,
    })

  }
  displayComponent () {
    if (this.state.whichButtonClicked==='btnExperiment') {
      return < MindFuel/>
    }
  }

  render(){

    return (
    
    <div className="App">
 
      <div className="banner">
        <h2 className="banner header" ><span style={{ filter: "drop-shadow(0px 30px 2px yellow)" }}>Welcome to Transformation Game</span></h2>
      </div>
      <div style={{backgroundColor: "black", textAlign:"center" }} >
        <button className={this.state.whichButtonClicked==="btnExperiment"? "navbarClicked":"navbar"} name= "btnExperiment" onClick ={this.handleClick} >Experiment</button>
        <button className={this.state.whichButtonClicked==="btnChallenges"? "navbarClicked":"navbar"} name= "btnChallenges">Challenges</button>
        <button className={this.state.whichButtonClicked==="btnSignOut"? "navbarClicked":"navbar"} name= "btnSignOut">Sign Out</button>
      </div>
      {this.displayComponent()}
    </div>
  );
  }

}

export default Home;
