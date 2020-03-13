import React from 'react'
import {validate} from "../fetch"
import Home from "./home"
import './login.css'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.nameRef=React.createRef();
        this.passwordRef=React.createRef();
        this.state = {
            user: '',
            password: '',
            page: 'login',
            showNavBar: true,
            message: ""
        }
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    changePage = async (target, username, password) => {
        
        let result = await validate('http://127.0.0.1:5000/user/' + username + '/' + password)
        if (result === "success") {
            
            this.setState({
                page: target,
                showNavBar: false
            })
        } else {
            this.setState ({
                message: "Wrong username or password. Please try again!"
            })
            
        }
    }
    pageState = () => {
        if (this.state.page === 'login') {
            return (
                <div className="login">
                    <h1 style={{paddingTop:"2vh",color:'black'}}>Login</h1>
                    <label className="lblLogin">Username: <input className="txtLogin" type="text" name="user" ref={this.nameRef} value={this.state.user} onChange={this.handleChange}></input>
                    </label><br/>
                    <label className="lblLogin">Password: <input className="txtLogin" type="password" name="password" ref={this.passowrdRef} value={this.state.password} onChange={this.handleChange}></input>
                    </label>
                    <br />
                    <p style={{height:'1vh', color:'rgb(187, 0, 0)'}}>{this.state.message}</p><br/>
                    <button className="btnSubmit" onClick={async () => this.changePage('home', this.state.user, this.state.password)}>Submit</button>
                    <br />
                </div>
            )
        }
        if (this.state.page === 'home') {
            return <Home navBar={this.state.showNavBar}/>
        }
    }
    render() {
        return (
            <div >
                {/* <div className="banner">
                    <h2 className="banner header" ><span style={{ filter: "drop-shadow(0px 30px 2px yellow)" }}>Welcome to Transformation Game</span></h2>
                </div> */}
                {this.pageState()}
            </div>


        )
    }
}
export default Login