import React from "react";
import MindFuel from "./game/MindFuel";
import Levels from "./game/Levels";
import Home from "./game/home";
import Login from "./game/login"
import {validate} from "./fetch"
import "./App.css";

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      page: 'login'
    }
  }
  changePage = async (target, username, password) => {
    let result = await validate('http://127.0.0.1:5000/user/' + username + '/' + password)
    if(result === "success"){
      this.setState({
        page: target
      })
    } else {
      alert("Wrong username or password. Please try again!")
    }
  }
  pageState = () => {
    if(this.state.page === 'login'){
      return <Login submit={this.changePage}/>
    }
    if(this.state.page === 'home'){
      return <Home/>
    }

  }

  render(){
      return (
    
    <div className="App">
      {/* <MindFuel /> */}
      {/* <Levels /> */}
          {/* <div className="banner">
            <h2 className="banner header" ><span style={{ filter: "drop-shadow(0px 30px 2px yellow)" }}>Welcome to Transformation Game</span></h2>
          </div> */}
          {this.pageState()}

      {/* <div className="banner">
        <h2 className="banner header" ><span style={{ filter: "drop-shadow(0px 30px 2px yellow)" }}>Welcome to Transformation Game</span></h2>
      </div>
      <div style={{ textAlign: "left", backgroundColor: "black" }} >
        <button className="navbar">Experiment</button>
        <button className="navbar">Challenges</button>
        <button className="navbar">Sign Out</button>
      </div> */}



    </div>
  );
  }

}

export default App;
