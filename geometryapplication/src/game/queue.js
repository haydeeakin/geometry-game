import React from 'react'
import "./queue.css"
import ListItem from "./listItem"
import { translation, rotation, reflection } from "./game";

class Queue extends React.Component {
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
            points: props.points,
            changePoints: props.changePoints
        }
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
    handleAdd = (transform, type = null, value = null, location = [0,0]) => {
        let queueCopy = this.state.queue;
        let l = {transform: transform, type: type, value: value, location: location }
        queueCopy.push(l)
        this.setState({
            queue: queueCopy
        })

    }
    handleExecute = () => {
        let copyPoints = this.state.points
        if(this.state.queue[0].transform === 'Translate' && this.state.queue[0].type === 'Up'){
            translation(copyPoints, Number(this.state.queue[0].value), 'y')
        }
        if(this.state.queue[0].transform === 'Translate' && this.state.queue[0].type === 'Down'){
            translation(copyPoints, -Number(this.state.queue[0].value), 'y')
        }
        if(this.state.queue[0].transform === 'Translate' && this.state.queue[0].type === 'Right'){
            translation(copyPoints, Number(this.state.queue[0].value), 'x')
        }
        if(this.state.queue[0].transform === 'Translate' && this.state.queue[0].type === 'Left'){
            translation(copyPoints, -Number(this.state.queue[0].value), 'x')
        }
        if(this.state.queue[0].transform === 'Rotate' && this.state.queue[0].type === 'Clockwise'){
            rotation(copyPoints, -Number(this.state.queue[0].value), this.state.queue[0].location)
        }
        if(this.state.queue[0].transform === 'Rotate' && this.state.queue[0].type === 'Counter-Clock'){
            rotation(copyPoints, Number(this.state.queue[0].value), this.state.queue[0].location)
        }
        if(this.state.queue[0].transform === 'Reflection' && this.state.queue[0].type === 'y'){
            reflection(copyPoints, )
        }
        this.state.changePoints(copyPoints);
    }
    newActionSelector = () => {
        if (this.state.interface === "Translation") {
            return (
                <div>
                    <select onChange={this.handleChangeTranslate} value={this.state.translate} className="widthHeight" disabled={this.props.disableOnBuild} >
                        <option value="Up">Up</option>
                        <option value="Down">Down</option>
                        <option value="Left">Left</option>
                        <option value="Right">Right</option>
                    </select>
                    {/* <input className="widthHeight" disabled={this.props.disableOnBuild} type="number" name="x/yValue" min="-20" max="20" defaultValue="0"></input> */}
                    <select className="widthHeight" onChange={this.handleChangeNum} value={this.state.num} disabled={this.props.disableOnBuild}>
                        {this.buildOptions("translate")}
                    </select>
                    <button className="widthHeight" disabled={this.props.disableOnBuild} onClick={() => this.handleAdd("Translate",this.state.translate, this.state.num)}>Add</button>
                </div>
            )
        }
        if (this.state.interface === "Rotation") {
            return (
                <div>
                    <select className="widthHeight" disabled={this.props.disableOnBuild} onChange={this.handleChangeRotate}>
                        <option value="Clockwise">Clockwise</option>
                        <option value="Counter-Clock">Counter-Clock</option>
                    </select>
                    <select className="widthHeight" disabled={this.props.disableOnBuild} onChange={this.handleChangeDegree}>
                        <option value="90">90&deg;</option>
                        <option value="180">180&deg;</option>
                        <option value="270">270&deg;</option>
                    </select>
                    <button className="widthHeight" disabled={this.props.disableOnBuild} onClick={() => this.handleAdd("Rotate",this.state.rotate, this.state.degree)}>Add</button>
                </div>
            )
        }
        if (this.state.interface === "Reflection") {
            return (
                <div>
                    <select className="widthHeight" style={{width: "10vh"}} onChange={this.reflectionBoxUpdate} disabled={this.props.disableOnBuild}>
                        <option value="xAxis">X Axis</option>
                        <option value="yAxis">Y Axis</option>
                        <option value="x">X=</option>
                        <option value="y">Y=</option>
                    </select>
                    <select disabled={this.props.disableOnBuild} value={this.state.xynum} hidden={this.state.reflectionBox} onChange={this.handleChangeXynum}>
                        {this.buildOptions("relection")}
                    </select>
                    {/* <input className="widthHeight" type="number" name="x/yValue" min="-20" max="20" defaultValue="0" hidden={this.state.reflectionBox}></input> */}
                    <button className="widthHeight" disabled={this.props.disableOnBuild} onClick={() => this.handleAdd("Reflect", null, null, [this.state.reflectionBox, this.state.xynum])}>Add</button>
                </div>
            )
        }
    }
    render() {
        return (
            <div className="buildStrategy" >
                <div style={{ textAlign: "center", color: this.props.headerFontColor }}>
                    <h1 style={{ marginBottom: 10, color: this.props.headerFontColor }}>Build your Strategy</h1><br />

                    {/* <input type="button" className="buttons btnCancel" value=" " disabled={this.props.disableOnBuild}></input>
                    <input type="button" className="buttons btnExecute" value=" " disabled={this.props.disableOnBuild}></input>
                    <br/> */}
                    <select className="dropdownStrategy" style={{ color: this.props.headerFontColor }} onChange={this.interfaceUpdate} disabled={this.props.disableOnBuild}>
                        <option>Select Transformation</option>
                        <option value="Translation">Translation</option>
                        <option value="Rotation">Rotation</option>
                        <option value="Reflection">Reflection</option>
                    </select>
                    <div style={{ height: 40 }} >
                        {this.newActionSelector()}
                    </div>
                    {/* <div className="actionList" style={{ marginLeft:"1fr"}}> */}
                    <div className="actionList" style={{ backgroundColor: this.props.headerFontColor }}>
                        {this.state.queue.map((current, index) => {
                            return <ListItem key={index} typeTransform={current.transform} type={current.type} value={current.value} location={current.location} /> 
                        })}
                    </div>
                    <br />
                    <input style={{ filter: `grayscale(${this.props.greyScaleButton})` }} type="button" className="buttons btnCancel" value=" " disabled={this.props.disableOnBuild}></input>
                    <input style={{ filter: `grayscale(${this.props.greyScaleButton})` }} type="button" className="buttons btnExecute" value=" " onClick={this.handleExecute} disabled={this.props.disableOnBuild}></input>
                    <input style={{ filter: `grayscale(${this.props.greyScaleButton})` }} type="button" className="buttons btnUndo" value=" " disabled={this.props.disableOnBuild}></input>
                    <br />
                </div>
            </div>
        )
    }
}
export default Queue;