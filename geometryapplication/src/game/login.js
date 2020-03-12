import React from 'react'

class Login extends React.Component {
    constructor() {
        super()
        this.nameRef=React.createRef();
        this.passwordRef=React.createRef();
        this.state = {
            user: '',
            password: ''
        }
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <div style={{ color: "white" }}>
                <div className="banner">
                    <h2 className="banner header" ><span style={{ filter: "drop-shadow(0px 30px 2px yellow)" }}>Welcome to Transformation Game</span></h2>
                </div>
                <h1>Login</h1>
                Username: <input type="text" name="user" ref={this.nameRef} value={this.state.user} onChange={this.handleChange}></input>
                Password: <input type="password" name="password"ref={this.passowrdRef} value={this.state.password} onChange={this.handleChange}></input>
                <br/>
                <button onClick={() => this.props.submit('home',this.state.user,this.state.password)}>Submit</button>
                <br/>
                <p>{this.props.message}</p>
            </div>


        )
    }
}
export default Login