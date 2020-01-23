import React from 'react'
import "./queue.css"

class Queue extends React.Component{
    constructor(){
        super();
        this.state = {
            queue: [],
            interface: '',
            reflectionBox: true     //disable number box for reflection
        }
    }
    interfaceUpdate = (event) => {
        this.setState({
            interface: event.target.value
        })
    }
    reflectionBoxUpdate = (event) => {
        if(event.target.value === "x" ||event.target.value === "y"){
            this.setState({
                reflectionBox: false
            })
        }else{
            this.setState({
                reflectionBox: true
            })
        }

    }
    newActionSelector(){
        if(this.state.interface === "translation"){
            return(
                <div>
                    <select>
                        <option value="x">X</option>
                        <option value="y">Y</option>
                    </select>
                    <input type="number" name="x/yValue" min="-20" max="20" defaultValue="0"></input>
                    <button style={{height: 20, width: 50}}>Add</button>
                </div>
            )
        }
        if(this.state.interface === "rotation"){
            return(
                <div>
                    <select>
                        <option value="clockwise">Clockwise</option>
                        <option value="counterClockwise">Counter Clockwise</option>
                    </select>
                    <select>
                        <option value="90">90&deg;</option>
                        <option value="180">180&deg;</option>
                        <option value="270">270&deg;</option>
                    </select>
                    <button style={{height: 20, width: 50}}>Add</button>
                </div>
            )
        }
        if(this.state.interface === "reflection"){
            return(
                <div>
                    <select onChange={this.reflectionBoxUpdate}>
                        <option value="xAxis">X Axis</option>
                        <option value="yAxis">Y Axis</option>
                        <option value="x">X=</option>
                        <option value="y">Y=</option>
                    </select>
                    <input type="number" name="x/yValue" min="-20" max="20" defaultValue="0" hidden={this.state.reflectionBox}></input>
                    <button style={{height: 20, width: 50}}>Add</button>
                </div>
            )
        }
    }
    render(){
        return(
            <div id="actionQueue">
                <h1>Action Queue</h1><br/>
                <select onChange={this.interfaceUpdate}>
                    <option>Select Transformation</option>
                    <option value="translation">Translation</option>
                    <option value="rotation">Rotation</option>
                    <option value="reflection">Reflection</option>
                </select>
                {this.newActionSelector()}
            </div>
        )
    }
}
export default Queue;