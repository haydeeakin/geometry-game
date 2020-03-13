import React from "react";
import MindFuel from "./MindFuel";
import Levels from "./Levels";
import Login from "./login";
import './queue.css';


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
    if (this.state.whichButtonClicked==='btnChallenges') {
      return < Levels/>
    }

  }

  render(){

    return (
    
    <div className="App">
 
      {/* <div className="banner">
        <h2 className="banner header" ><span style={{ filter: "drop-shadow(0px 30px 2px yellow)" }}>Welcome to Transformation Game</span></h2>
      </div> */}
      <div style={{backgroundColor: "black", textAlign:"center" }} >
        <button className={this.state.whichButtonClicked==="btnExperiment"? "navbarClicked":"navbar"} name= "btnExperiment" onClick ={this.handleClick} >Experiment</button>
        <button className={this.state.whichButtonClicked==="btnChallenges"? "navbarClicked":"navbar"} name= "btnChallenges" onClick ={this.handleClick}>Challenges</button>
        <button className={this.state.whichButtonClicked==="btnSignOut"? "navbarClicked":"navbar"} name= "btnSignOut" onClick={this.handleClick}>Sign Out</button>
      </div>
      {this.displayComponent()}
    </div>
  );
  }

}

export default Home;
