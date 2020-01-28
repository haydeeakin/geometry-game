import React from 'react'
import "./queue.css"
import ListItem from "./listItem"

class Queue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: [],
            interface: '',
            reflectionBox: true,     //disable number box for reflection
            translate: "Up",
            num: 1
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
    handleAddTranslation = (type, value, location) => {
        let queueCopy = this.state.queue;
        let l = { type: type, value: value, location: location }
        queueCopy.push(l)
        this.setState({
            queue: queueCopy
        })

    }
    newActionSelector = () => {
        if (this.state.interface === "translation") {
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
                    <button className="widthHeight" disabled={this.props.disableOnBuild} onClick={() => this.handleAddTranslation(this.state.translate, this.state.num)}>Add</button>
                </div>
            )
        }
        if (this.state.interface === "rotation") {
            return (
                <div>
                    <select className="widthHeight" disabled={this.props.disableOnBuild}>
                        <option value="clockwise">Clockwise</option>
                        <option value="counterClockwise">Counter Clockwise</option>
                    </select>
                    <select className="widthHeight" disabled={this.props.disableOnBuild}>
                        <option value="90">90&deg;</option>
                        <option value="180">180&deg;</option>
                        <option value="270">270&deg;</option>
                    </select>
                    <button className="widthHeight" disabled={this.props.disableOnBuild}>Add</button>
                </div>
            )
        }
        if (this.state.interface === "reflection") {
            return (
                <div>
                    <select className="widthHeight" style={{width: "10vh"}} onChange={this.reflectionBoxUpdate} disabled={this.props.disableOnBuild}>
                        <option value="xAxis">X Axis</option>
                        <option value="yAxis">Y Axis</option>
                        <option value="x">X=</option>
                        <option value="y">Y=</option>
                    </select>
                    <select disabled={this.props.disableOnBuild} value={this.state.upnum} hidden={this.state.reflectionBox}>
                        {this.buildOptions("relection")}
                    </select>
                    {/* <input className="widthHeight" type="number" name="x/yValue" min="-20" max="20" defaultValue="0" hidden={this.state.reflectionBox}></input> */}
                    <button className="widthHeight" disabled={this.props.disableOnBuild}>Add</button>
                </div>
            )
        }
    }
    render() {
        console.log(this.state.queue)
        return (
            <div className="buildStrategy" >
                <div style={{ textAlign: "center", color: this.props.headerFontColor }}>
                    <h1 style={{ marginBottom: 10, color: this.props.headerFontColor }}>Build your Strategy</h1><br />

                    {/* <input type="button" className="buttons btnCancel" value=" " disabled={this.props.disableOnBuild}></input>
                    <input type="button" className="buttons btnExecute" value=" " disabled={this.props.disableOnBuild}></input>
                    <br/> */}
                    <select className="dropdownStrategy" style={{ color: this.props.headerFontColor }} onChange={this.interfaceUpdate} disabled={this.props.disableOnBuild}>
                        <option>Select Transformation</option>
                        <option value="translation">Translation</option>
                        <option value="rotation">Rotation</option>
                        <option value="reflection">Reflection</option>
                    </select>
                    <div style={{ height: 40 }} >
                        {this.newActionSelector()}
                    </div>
                    {/* <div className="actionList" style={{ marginLeft:"1fr"}}> */}
                    <div className="actionList" style={{ backgroundColor: this.props.headerFontColor }}>
                        {this.state.queue.map((current, index) => {
                            return <ListItem key={index} type={current.type} value={current.value} location={current.location} />
                        })}
                    </div>
                    <br />
                    <input style={{ filter: `grayscale(${this.props.greyScaleButton})` }} type="button" className="buttons btnCancel" value=" " disabled={this.props.disableOnBuild}></input>
                    <input style={{ filter: `grayscale(${this.props.greyScaleButton})` }} type="button" className="buttons btnExecute" value=" " disabled={this.props.disableOnBuild}></input>
                    <input style={{ filter: `grayscale(${this.props.greyScaleButton})` }} type="button" className="buttons btnUndo" value=" " disabled={this.props.disableOnBuild}></input>
                    <br />
                </div>
            </div>
        )
    }
}
export default Queue;