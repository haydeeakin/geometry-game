import React from 'react'
import "./queue.css"
import ListItem from "./listItem"
import { translation, rotation, reflection } from "./game";

class LevelQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: [],
            interface: '',
            reflectionBox: true,     //disable number box for reflection
            translate: "Up",
            num: 1,
            rotate: "Clockwise",
            degree: 90,
            xynum: 0,
            line: [1,0,0],
            axis: "xAxis",
            points: props.levelPoints,
            changePoints: props.levelChangePoints,
            message: "",
        }
    }
    handleAxisChange = event => {
        this.setState({
            axis: event.target.value
        })
    }
    handleChangeTranslate = event => {
        this.setState({
            translate: event.target.value,

        })
    }
    handleChangeNum = event => {
        this.setState({
            num: event.target.value,

        })
    }
    handleChangeRotate = event => {
        this.setState({
            rotate: event.target.value,

        })
    }
    handleChangeDegree = event => {
        this.setState({
            degree: event.target.value,

        })
    }
    handleUndo = () => {
        let copyQueue = this.state.queue;
        copyQueue.pop();
        this.setState({
            queue: copyQueue
        })
    }
    handleClearAll = () => {
        this.setState({
            queue: [],
        })
    }
    interfaceUpdate = (event) => {
        this.setState({
            interface: event.target.value
        })
    }
    reflectionBoxUpdate = (event) => {
        if (event.target.value === "x" || event.target.value === "y") {
            this.setState({
                reflectionBox: false
            })
        } else {
            this.setState({
                reflectionBox: true
            })
        }

    }
    handleChangeXynum = (event) => {
        this.setState({
            xynum: event.target.value
        })
    }

    
    buildOptions(typeofTransform) {
        let numList = [];
        if (typeofTransform === "translate") {
            for (let i = 1; i <= 20; i++) {
                numList.push(<option key={i} value={i} >{i}</option>)
            }
            return numList;
        }
        else {
            for (let i = -10; i <= 10; i++) {
                numList.push(<option key={i} value={i} >{i}</option>)
            }
            return numList;
        }
    }
    pointsInbound = coordinate => {
        for (let b of coordinate) {
          if (b[0] < -10 || b[0] > 10) {
            return false;
          }
          if (b[1] < -10 || b[1] > 10) {
            return false;
          }
        }
        return true;
      };
    handleAdd = (transform, type = null, value = null, location = [0,0]) => {
        if(this.state.queue.length > 5){
            return;
        }
        let queueCopy = this.state.queue;
        let l = {transform: transform, type: type, value: value, location: location }
        if(l.transform === "Reflect"){
            if(this.state.axis === "xAxis"){
                l.location = [0,1,0]
            }
            if(this.state.axis === "yAxis"){
                l.location = [1,0,0]
            }
            if(this.state.axis === "x"){
                l.location = [1,0,-this.state.xynum]
            }
            if(this.state.axis === "y"){
                l.location = [0,1,-this.state.xynum]
            }
            
        }
        queueCopy.push(l)
        this.setState({
            queue: queueCopy
        })

    }
    messageArea = (message = "") => {
        this.setState({
            message: message
        })
    }
    handleExecute = async() => {
        let copyPoints = this.state.points
        for(let i = 0; i<this.state.queue.length; i++){
            if(this.state.queue[i].transform === 'Translate' && this.state.queue[i].type === 'Up'){
                translation(copyPoints, Number(this.state.queue[i].value), 'y')
            }
            if(this.state.queue[i].transform === 'Translate' && this.state.queue[i].type === 'Down'){
                translation(copyPoints, -Number(this.state.queue[i].value), 'y')
            }
            if(this.state.queue[i].transform === 'Translate' && this.state.queue[i].type === 'Right'){
                translation(copyPoints, Number(this.state.queue[i].value), 'x')
            }
            if(this.state.queue[i].transform === 'Translate' && this.state.queue[i].type === 'Left'){
                translation(copyPoints, -Number(this.state.queue[i].value), 'x')
            }
            if(this.state.queue[i].transform === 'Rotate' && this.state.queue[i].type === 'Clockwise'){
                rotation(copyPoints, -Number(this.state.queue[i].value), this.state.queue[i].location)
            }
            if(this.state.queue[i].transform === 'Rotate' && this.state.queue[i].type === 'Counter-Clock'){
                rotation(copyPoints, Number(this.state.queue[i].value), this.state.queue[i].location)
            }
            if(this.state.queue[i].transform === 'Reflect'){
                reflection(copyPoints, this.state.queue[i].location)
            }
            if(this.pointsInbound(copyPoints)){
                await this.state.changePoints(copyPoints);
            }else{
                this.messageArea("step " + (i + 1).toString() + " placed the shape out of bounds")
                break
            }
            
            
        }
        this.setState({
            queue: []
        })
        
    }
    newActionSelector = () => {
        if (this.state.interface === "Translation") {
            return (
                <div>
                    <select className="widthHeight dropbox" onChange={this.handleChangeTranslate} value={this.state.translate} >
                        <option value="Up">Up</option>
                        <option value="Down">Down</option>
                        <option value="Left">Left</option>
                        <option value="Right">Right</option>
                    </select>
                    {/* <input className="widthHeight"   type="number" name="x/yValue" min="-20" max="20" defaultValue="0"></input> */}
                    <select className="widthHeight" onChange={this.handleChangeNum} value={this.state.num}  >
                        {this.buildOptions("translate")}
                    </select>
                    <button className="widthHeight btnAdd"   onClick={() => this.handleAdd("Translate",this.state.translate, this.state.num)}>Add</button>
                </div>
            )
        }
        if (this.state.interface === "Rotation") {
            return (
                <div>
                    <select className="widthHeight dropbox"   onChange={this.handleChangeRotate}>
                        <option value="Clockwise">Clockwise</option>
                        <option value="Counter-Clock">Counter-Clock</option>
                    </select>
                    <select className="widthHeight"   onChange={this.handleChangeDegree}>
                        <option value="90">90&deg;</option>
                        <option value="180">180&deg;</option>
                        <option value="270">270&deg;</option>
                    </select>
                    <button className="widthHeight btnAdd"   onClick={() => this.handleAdd("Rotate",this.state.rotate, this.state.degree)}>Add</button>
                </div>
            )
        }
        if (this.state.interface === "Reflection") {
            return (
                <div>
                    <select className="widthHeight dropbox" style={{width: "10vh"}} onChange={(event) => {this.reflectionBoxUpdate(event); this.handleAxisChange(event)}}   value={this.state.axis}>
                        <option value="xAxis">X Axis</option>
                        <option value="yAxis">Y Axis</option>
                        <option value="x">X=</option>
                        <option value="y">Y=</option>
                    </select>
                    <select   value={this.state.xynum} hidden={this.state.reflectionBox} onChange={this.handleChangeXynum}>
                        {this.buildOptions("relection")}
                    </select>
                    {/* <input className="widthHeight" type="number" name="x/yValue" min="-20" max="20" defaultValue="0" hidden={this.state.reflectionBox}></input> */}
                    <button className="widthHeight btnAdd"   onClick={() => this.handleAdd("Reflect", "y", null, [this.state.reflectionBox, this.state.xynum])}>Add</button>
                </div>
            )
        }
    }
    render() {
        return (
            <div className="buildStrategy">
                <div style={{ textAlign: "center", color: this.props.levelHeaderFontColor, backgroundColor:"black" }} >
                    <h1 style={{ marginBottom: 10, color: this.props.levelHeaderFontColor }}>Build your Strategy</h1><br />

                    <select className="dropdownStrategy" style={{ color: this.props.levelHeaderFontColor}} onChange={this.interfaceUpdate}  >
                        <option>Select Transformation</option>
                        <option value="Translation">Translation</option>
                        <option value="Rotation">Rotation</option>
                        <option value="Reflection">Reflection</option>
                    </select>
                    <div style={{ height: 40 }} >
                        {this.newActionSelector()}
                    </div>
                    
                    <div className="actionList" style={{ backgroundColor: this.props.levelHeaderFontColor }}>
                        {this.state.queue.map((current, index) => {
                            return <ListItem key={index} typeTransform={current.transform} type={current.type} value={current.value} location={current.location} /> 
                        })}
                    </div>
                    <p className="queueMessage">{this.state.message}</p>
                    <br />
                    <input type="button" className="buttons btnCancel" value=" " onClick={this.handleClearAll}  ></input>
                    <input type="button" className="buttons btnExecute" value=" " onClick={this.handleExecute}  ></input>
                    <input type="button" className="buttons btnUndo" value=" " onClick={this.handleUndo}  ></input>
                    <br />
                </div>
            </div>
        )
    }
}
class LevelTransformation {
    constructor(validCoordinates, points){
        this.queue = [];
        this.validCoordinates = validCoordinates;
        this.points = points;
    }
    add = (transform, type = null, value = null, location = [0,0]) => {
        if(this.queue.length > 5){
            return;
        }
        let l = {transform: transform, type: type, value: value, location: location }
        if(l.transform === "Reflect"){
            if(this.state.axis === "xAxis"){
                l.location = [0,1,0]
            }
            if(this.state.axis === "yAxis"){
                l.location = [1,0,0]
            }
            if(this.state.axis === "x"){
                l.location = [1,0,-this.state.xynum]
            }
            if(this.state.axis === "y"){
                l.location = [0,1,-this.state.xynum]
            }
            
        }
        this.queue.push(l)

    }
    remove = (index) => {
        this.queue.splice(index, 1);
    }
    validate = (coordinate) => {
        for (let b of coordinate) {
          if (b[0] < this.validCoordinates[0] || b[0] > this.validCoordinates[1]) {
            return false;
          }
          if (b[1] < this.validCoordinates[2] || b[1] > this.validCoordinates[3]) {
            return false;
          }
        }
        return true;
    }
    execute = () => {
        let copyPoints = this.points
        for(let i = 0; i<this.queue.length; i++){
            if(this.queue[i].transform === 'Translate' && this.queue[i].type === 'Up'){
                translation(copyPoints, Number(this.queue[i].value), 'y')
            }
            if(this.queue[i].transform === 'Translate' && this.queue[i].type === 'Down'){
                translation(copyPoints, -Number(this.state.queue[i].value), 'y')
            }
            if(this.queue[i].transform === 'Translate' && this.queue[i].type === 'Right'){
                translation(copyPoints, Number(this.queue[i].value), 'x')
            }
            if(this.queue[i].transform === 'Translate' && this.queue[i].type === 'Left'){
                translation(copyPoints, -Number(this.queue[i].value), 'x')
            }
            if(this.queue[i].transform === 'Rotate' && this.queue[i].type === 'Clockwise'){
                rotation(copyPoints, -Number(this.queue[i].value), this.queue[i].location)
            }
            if(this.queue[i].transform === 'Rotate' && this.queue[i].type === 'Counter-Clock'){
                rotation(copyPoints, Number(this.queue[i].value), this.queue[i].location)
            }
            if(this.queue[i].transform === 'Reflect'){
                reflection(copyPoints, this.queue[i].location)
            }
            if(this.validate(copyPoints)){
                this.state.changePoints(copyPoints);
            }else{
                
                break
            }
            
            
        }
        this.points = copyPoints;
        
    }

}

export default LevelQueue;