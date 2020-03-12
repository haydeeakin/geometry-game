import React from "react";
import MindFuel from "./game/MindFuel";
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
      <nav></nav>
        {this.pageState()}
    </div>
  );
  }

}

export default App;
