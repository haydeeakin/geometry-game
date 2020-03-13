import React, { Component } from "react";
import { translation, rotation, reflection } from "./game";
// import Queue from "./queue";
import DisplayQueue from "./queue";
import "./mindfuel.css"
// import {Login} from '../routes/Login'

class MindFuel extends Component {

  constructor() {
    super();
    this.canvasHeight = 880;
    this.canvasWidth = 880;
    this.squareCount = 22;
    this.widthPerSquare = this.canvasWidth / this.squareCount;
    this.heightPerSquare = this.canvasHeight / this.squareCount;
    this.pointRadius = 8;
    
  }

  state = {
    points: [
      [2, 2], 
      [4, 2],
      [4, 5]
    ],
    hideTransform: false,
    disableBuild: true,
    // singleMove: true,
    greyScale: 100,
    headerColor: "lightgrey",
    strategyMessage: "For your experiment how Transformation works based on Selecting a value from dropdown list provided.",
    upnum: 1, downnum: 1, rightnum: 1, leftnum: 1, degreeCounter: 90, degreeClock: 90
  };
  changePointsStrategy = (points) => {
    this.setState({
      points: points
    })
  }
  drawPoints = () => {
   
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawCanvasTemplate();
    // ctx.fillStyle = "rgb(131, 131, 0)";
    ctx.fillStyle = "rgb(223, 182, 0)";
    // ctx.strokeStyle = "teal";
    // draw triangle point
    for (let b of this.state.points) {
      let pixelPoint = this.translatePointToPixel(b);
      ctx.beginPath();
      ctx.arc(
        pixelPoint[0],
        pixelPoint[1],
        this.pointRadius,
        0,
        2 * Math.PI,
        true
      );
      
      ctx.fill();
      
      
    }
    //ctx.font = "30px Courier";
    //draw line (triangle)
    let pixelPoint0 = this.translatePointToPixel(this.state.points[0]);
    let pixelPoint1 = this.translatePointToPixel(this.state.points[1]);
    let pixelPoint2 = this.translatePointToPixel(this.state.points[2]);
    ctx.lineWidth = 5;
    ctx.strokeStyle="teal";
    // new code to draw a triangle
    ctx.beginPath();
    ctx.moveTo(pixelPoint0[0], pixelPoint0[1]);
    ctx.lineTo(pixelPoint1[0], pixelPoint1[1]);
    ctx.lineTo(pixelPoint2[0], pixelPoint2[1]);
    ctx.closePath();
    
    let triangleGradient = ctx.createLinearGradient(this.canvasWidth  / 2, pixelPoint0[1], this.canvasWidth / 2, pixelPoint2[1]);
    triangleGradient.addColorStop(0, "rgb(255, 250, 177)");
    triangleGradient.addColorStop(1, "black");
    ctx.fillStyle = triangleGradient;
    ctx.fill();

  };

  translatePointToPixel = point => {
    let pixelX = this.canvasWidth / 2;
    if (point[0] > 0 || point[0] < 0) {
      pixelX = pixelX + point[0] * this.widthPerSquare;
    }
    let pixelY = this.canvasHeight / 2;
    if (point[1] > 0 || point[1] < 0) {
      pixelY = pixelY - point[1] * this.heightPerSquare;
    }
    return [pixelX, pixelY];
  };

  drawCanvasTemplate = () => {
    const ctx = this.canvas.getContext("2d");
    ctx.fillStyle = "rgb(255, 250, 177)";
    ctx.font = "17px Arial";
    let lineWidth = 1;
    ctx.textAlign = "center";
    ctx.strokeStyle = "teal";
    // draw horizontal line 
    for (let i = 40; i <= this.canvasHeight; i += this.widthPerSquare) {
      ctx.lineWidth = lineWidth;
      if (i === this.canvasHeight / 2) {
        ctx.lineWidth = 5;

      }
      ctx.beginPath();
      ctx.moveTo(38, i);
      ctx.lineTo(this.canvasWidth - 40, i);
      ctx.stroke();
      // add x axis label
      let labelX;
      for (let u = -10; u <= 10; u++) {
        labelX = this.translatePointToPixel([u, -0.5]);
        if (u === 0) { u = "" }
        ctx.fillText(u, labelX[0], labelX[1]);
        // ctx.textAlign="right"; 
      }
    }

    // draw vertical line
    for (let i = 40; i <= this.canvasWidth - 10; i += this.heightPerSquare) {
      ctx.lineWidth = lineWidth;
      if (i === this.canvasWidth / 2) {
        ctx.lineWidth = 5;

      }

      ctx.beginPath();
      ctx.moveTo(i, 38);
      ctx.lineTo(i, this.canvasHeight - 40);
      ctx.stroke();

      // add y axis label
      let labelY;
      for (let u = -10; u <= 10; u++) {
        labelY = this.translatePointToPixel([u, 0.4]);
        ctx.fillText((u * -1), labelY[1], labelY[0]);
      }
    }
  };

  componentDidMount = () => {
    this.drawPoints();
  };
  componentDidUpdate = () => {
    this.drawPoints();
  };
  translate = direction => {
    let copy = JSON.parse(JSON.stringify(this.state));
    switch (direction) {
      case "up":
        translation(copy.points, Number(this.state.upnum), "y");
        break;
      case "down":
        translation(copy.points, Number(this.state.downnum) * -1, "y");
        break;
      case "right":
        translation(copy.points, Number(this.state.rightnum), "x");
        break;
      case "left":
        translation(copy.points, Number(this.state.leftnum) * -1, "x");
        break;
      default:
        break;
    }
    if (this.pointsInbound(copy.points)) {
      this.setState({ points: copy.points });
    }
  };

  rotation = type => {
    let copy = JSON.parse(JSON.stringify(this.state));
    switch (type) {
      case "counterClockwise":
        rotation(copy.points, this.state.degreeCounter, [0, 0]);
        break;
      case "clockwise":
        rotation(copy.points, this.state.degreeClock * -1, [0, 0]);
        break;
      default:
        break;
    }
    if (this.pointsInbound(copy.points)) {
      this.setState({ points: copy.points });
    }
  };

  reflection = direction => {
    let copy = JSON.parse(JSON.stringify(this.state));
    switch (direction) {
      case "x":
        reflection(copy.points, [0, 1, 0]);
        break;
      case "y":
        reflection(copy.points, [1, 0, 0]);
        break;
      default:
        break;
    }
    if (this.pointsInbound(copy.points)) {
      this.setState({ points: copy.points });
    }
  };
  pointsInbound = coordinate => {
    for (let b of coordinate) {
      let pixelB = this.translatePointToPixel(b);
      if (pixelB[0] > this.canvasWidth - 40 || pixelB[0] < 40) {
        return false;
      }
      if (pixelB[1] > this.canvasHeight - 40 || pixelB[1] < 40) {
        return false;
      }
    }
    return true;
  };
  singletoMultiple = (event) => {
    if (event.target.value === "multiple") {
      this.setState({
        // singleMove: false,
        hideTransform: false,
        disableBuild: true,
        headerColor: "lightgrey",
        strategyMessage: "For your experiment how Transformation works based on Selecting a value from dropdown list provided.",
        greyScale: 100,
        points: [
          [2, 2],
          [4, 2],
          [4, 5]
        ],
        upnum: 1,
        downnum: 1,
        leftnum: 1,
        rightnum: 1,
      })
    } 
    else {
      this.setState({
        hideTransform: true,
        disableBuild: false,
        headerColor: "rgb(255, 250, 177)",
        strategyMessage: `Please proceed to the RIGHT to "Build Your Strategy". For example: You can select different types of transformation and EXECUTE them all at once.`,
        greyScale: 0,
        points: [
          [2, 2],
          [4, 2],
          [4, 5]
        ],
      })
    }

  }
  handleKeyDown = (event) => { // to prevent user enter a number
    event.preventDefault();
    return false;
  }

  handleRotationCounter = (event) => {
    this.setState({
      degreeCounter: event.target.value
    })
  }
  handleRotationClock = (event) => {
    this.setState({
      degreeClock: event.target.value
    })
  }

  handleUp = (event) => {
    this.setState({
      upnum: event.target.value
    })
  }
  handleDown = (event) => {
    this.setState({
      downnum: event.target.value
    })
  }
  handleLeft = (event) => {
    this.setState({
      leftnum: event.target.value
    })
  }
  handleRight = (event) => {
    this.setState({
      rightnum: event.target.value
    })
  }
  buildOptions() {
    let numList = [];

    for (let i = 1; i <= 20; i++) {
      numList.push(<option key={i} value={i} >{i}</option>)
    }

    return numList;
  }
  render() {
    return (
      <div >
        {/* <div className="banner">
          <h2 className="banner header" ><span style={{ filter: "drop-shadow(0px 30px 2px yellow)" }}>Welcome to Transformation Game</span></h2>
        </div> */}
      
        {/* <div style={{textAlign:"left"}} hidden>
          <button className="navbar">Experiment</button>
          <button className="navbar">Challenges</button>
          
          <button className="navbar">Sign Out</button>
        </div> */}
       
        <div className="GameArea" style={{backgroundColor:"black"}} >
          {/* <Queue id="queue"/> */}
          {/* <Transformation singleMove={true}/> */}
          <div id="transformation" style={{backgroundColor:"black"}} >
            <h1 style={{ color: "rgb(255, 250, 177)", marginBottom: 10 }}>Experiment Transformation</h1><br />
            <select className="transformSelector" onChange={this.singletoMultiple}>
              <option value="multiple">Multiple Moves</option>
              <option value="strategy">Strategy</option>
            </select>
            <br></br><br></br>
            <h3 style={{ color: "rgb(255, 250, 177)", height: 90, textAlign: "left", marginLeft: 20 }}>{this.state.strategyMessage}
            </h3><br />
            <div  style={{ marginTop: 20 }} hidden={this.state.hideTransform} >
              <input type="button" className="buttons btnUp" value=" " onClick={() => {
                this.translate("up");
              }}></input>
              {/* <input disabled={this.state.singleMove} onChange={this.handleChange} onKeyDown={this.handleKeyDown} min={0} max={20} type="number" className="numInput" name="upnum" value={this.state.upnum} /> */}
              <select className="degrees" disabled={this.state.singleMove} onChange={this.handleUp} value={this.state.upnum}>
                {this.buildOptions()}
              </select>
              <br></br>

              <input type="button" className="buttons btnDown" value=" " onClick={() => {
                this.translate("down");
              }}></input>
              {/* <input disabled={this.state.singleMove} onChange={this.handleChange} onKeyDown={this.handleKeyDown} min={0} max={20} type="number" className="numInput" name="downnum" value={this.state.downnum} /> */}
              <select className="degrees" disabled={this.state.singleMove} onChange={this.handleDown} value={this.state.downnum}>
                {this.buildOptions()}
              </select>
              <br></br>

              <input type="button" className="buttons btnLeft" value=" " onClick={() => {
                this.translate("left");
              }}></input>
              {/* <input disabled={this.state.singleMove} onChange={this.handleChange} onKeyDown={this.handleKeyDown} min={0} max={20} type="number" className="numInput" name="leftnum" value={this.state.leftnum} /> */}
              <select className="degrees" disabled={this.state.singleMove} onChange={this.handleLeft} value={this.state.leftnum}>
                {this.buildOptions()}
              </select>
              <br></br>

              <input type="button" className="buttons btnRight" value=" " onClick={() => {
                this.translate("right");
              }}></input>
              {/* <input disabled={this.state.singleMove} onChange={this.handleChange} onKeyDown={this.handleKeyDown} min={0} max={20} type="number" className="numInput" name="rightnum" value={this.state.rightnum} /> */}
              <select className="degrees" disabled={this.state.singleMove} onChange={this.handleRight} value={this.state.rightnum}>
                {this.buildOptions()}
              </select>
              <br></br>

              <input type="button" className="buttons btnCounterClock" value=" " onClick={() => {
                this.rotation("counterClockwise");
              }}></input>
              <select disabled={this.state.singleMove} value={this.state.degreeCounter} className="degrees" onChange={this.handleRotationCounter}>
                {/* <option value="0">0&deg;</option> */}
                <option value="90">90&deg;</option>
                <option value="180">180&deg;</option>
                <option value="270">270&deg;</option>
              </select>

              <br></br>
              <input type="button" className="buttons btnClock" value=" " onClick={() => {
                this.rotation("clockwise");
              }}></input>
              <select disabled={this.state.singleMove} value={this.state.degreeClock} className="degrees" onChange={this.handleRotationClock}>
                {/* <option value="0">0&deg;</option> */}
                <option value="90">90&deg;</option>
                <option value="180">180&deg;</option>
                <option value="270">270&deg;</option>
              </select>

              <br></br>

              <input type="button" className="buttons btnReflecX" value=" " onClick={() => {
                this.reflection("x");
              }}></input>
              {/* <input disabled style={{border:0}} type="text" className="numInput" name="numInput" defaultValue="Reflection-X" /> */}
              {/* <label className="numInput">Reflection-X</label> */}
              
              {/* <br></br> */}

              <input type="button" style={{marginLeft: '5vh'}} className="buttons btnReflecY" value=" " onClick={() => {
                this.reflection("y");
              }}></input>
              {/* <input disabled style={{border:0}} type="text" className="numInput" name="numInput" defaultValue="Reflection-Y" /> */}
              {/* <label className="numInput">Reflection-Y</label> */}
              {/* <br></br> */}
            </div>
          </div >
          <canvas style={{backgroundColor:"black"}}
            className="canvas"
            id="canvas"
            //ref means js-getElement by ID or others
            ref={canvas => {
              this.canvas = canvas;
            }}
            width={this.canvasWidth}
            height={this.canvasHeight}
          />
          
          <DisplayQueue changePoints={this.changePointsStrategy} points={this.state.points} disableOnBuild={this.state.disableBuild} headerFontColor={this.state.headerColor} greyScaleButton={this.state.greyScale} />
        </div>

      </div>
    );
  }
}

export default MindFuel;
