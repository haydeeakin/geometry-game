import React from 'react';
import "./queue.css";
import "./transformation.css"

class Transformation extends React.Component {
    constructor() {
        super();
        this.state = {
            singleMove: true

        }
    }
    singletoMultiple =(event) => {
        if(event.target.value === "multiple"){
            this.setState({
                singleMove: false
            })
        }else{
            this.setState({
                singleMove: true
            })
        }

    }
    // handleKeyDown =(event) => {
    //     event.preventDefault();
    //     return false;
    // }
    render() {
        return (
            <div id="transformation">
                <h1 style={{ color: "purple" }}>Transformation Selector</h1><br />
                <select className="transformSelector" onChange={this.singletoMultiple}>
                        <option value="single">Single Move(Default)</option>
                        <option value="multiple">Multiple Moves</option>
                </select>
                <br></br><br></br>
                {/* <button className="buttons btnUp">
                </button> */}
                <input type="button" className="buttons btnUp" value=" "></input>
                <input hidden={this.state.singleMove} Min="-10" max="10" type="number" className="numInput" name="numInput" value={this.state.numInput} />
                <br></br>
                {/* <button className="buttons btnDown"
                    // onClick={() => {
                    //     this.translate("down");
                    // }}
                >
                </button> */}
                <input type="button" className="buttons btnDown" value=" "></input>
                <input hidden={this.state.singleMove} type="number" className="numInput" name="numInput" value={this.state.numInput} />
                <br></br>
                {/* <button className="buttons btnLeft"
                    // onClick={() => {
                    //     this.translate("left");
                    // }}
                >
                </button> */}
                <input type="button" className="buttons btnLeft" value=" "></input>
                <input hidden={this.state.singleMove} type="number" className="numInput" name="numInput" value={this.state.numInput} />
                <br></br>
                {/* <button className="buttons btnRight"
                    // onClick={() => {
                    //     this.translate("right");
                    // }}
                >
                </button> */}
                <input type="button" className="buttons btnRight" value=" "></input>
                <input hidden={this.state.singleMove} type="number" className="numInput" name="numInput" value={this.state.numInput} />
                <br></br>
                {/* <button className="buttons btnCounterClock"
                    // onClick={() => {
                    //     this.rotation("clockwise");
                    // }}
                >
                </button> */}
                <input type="button" className="buttons btnCounterClock" value=" " ></input>
                <input hidden={this.state.singleMove} type="number" className="numInput" name="numInput" value={this.state.numInput} />
                <br></br>
                {/* <button className="buttons btnClock"
                    // onClick={() => {
                    //     this.rotation("counterClockwise");
                    // }}
                >
                </button> */}
                <input type="button" className="buttons btnClock" value=" "></input>
                <input hidden={this.state.singleMove} type="number" className="numInput" name="numInput" value={this.state.numInput} />
                <br></br>
                {/* <button className="buttons btnReflecX"
                    // onClick={() => {
                    //     this.reflection("x");
                    // }}
                >
                </button> */}
                <input type="button" className="buttons btnReflecX" value=" "></input>
                <input hidden={this.state.singleMove} type="text" className="numInput" name="numInput" defaultValue="Reflection-X" />
                <br></br>
                {/* <button className="buttons btnReflecY"
                    // onClick={() => {
                    //     this.reflection("y");
                    // }}
                >
                </button>   */}
                <input type="button" className="buttons btnReflecY" value=" "></input>
                <input hidden={this.state.singleMove}type="text" className="numInput" name="numInput" defaultValue="Reflection-Y" />
                <br></br>
            </div >
        )
    }
}
export default Transformation;