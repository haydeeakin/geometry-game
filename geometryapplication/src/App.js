import React from "react";
import MindFuel from "./game/MindFuel";
<<<<<<< HEAD
import Levels from "./game/Levels";

=======
import Login from "./game/login"
import {validate} from "./fetch"
>>>>>>> 995af50389ea23232ebb99cce169248c8415c127
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
    }
  }
  pageState = () => {
    if(this.state.page === 'login'){
      return <Login submit={this.changePage}/>
    }
    if(this.state.page === 'game'){
      return <MindFuel/>
    }
  }

  render(){
      return (
    
    <div className="App">
<<<<<<< HEAD
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



=======
      <nav></nav>
        {this.pageState()}
>>>>>>> 995af50389ea23232ebb99cce169248c8415c127
    </div>
  );
  }

}

export default App;
