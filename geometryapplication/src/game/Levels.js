import React, { Component } from "react";
import { translation, rotation, reflection } from "./game";
import LevelQueue from "./levelQueue";
import "./mindfuel.css"
// import {Login} from '../routes/Login'

class Levels extends Component {

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

    headerColor: "rgb(255, 250, 177)",
    strategyMessage: "Choose a level of challenges from the dropdown menu",
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
 
  render() {
    return (
      <div >
        <div className="banner">
          
          {/* <h2 className="banner header" ><span style={{ filter: "drop-shadow(0px 30px 2px yellow)" }}>Welcome to Transformation Game</span></h2> */}
          <h2 className="banner header" ><span style={{ filter: "drop-shadow(0px 30px 2px yellow)" }}>Welcome to Transformation Game</span></h2>
        </div>
        {/* <div>
          <Login />
        </div> */}
        <div style={{textAlign:"left"}} hidden>
          <button className="navbar">Experiment</button>
          <button className="navbar">Challenges</button>
          {/* <button className="navbar">Sign In</button> */}
          <button className="navbar">Sign Out</button>
        </div>
       
        <div className="GameArea" style={{backgroundColor:"black"}} >
          {/* <Queue id="queue"/> */}
          {/* <Transformation singleMove={true}/> */}
          <div id="transformation" style={{backgroundColor:"black"}} >
            <h1 style={{ color: "rgb(255, 250, 177)", marginBottom: 10 }}>Challenges</h1><br />
            <h3 style={{ color: "rgb(255, 250, 177)", height: 90, textAlign: "left", marginLeft: 20 }}>{this.state.strategyMessage}
            </h3><br />
            <select className="transformSelector levelSelector">
              <option value="level1">Level 1</option>
              <option value="level2">Level 2</option>
            </select>
            <br></br><br></br>
            
            {/* <div  style={{ marginTop: 20 }} hidden={this.state.hideTransform} >
          
              <br></br>
            </div> */}
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
          {/* <Action /> */}
          <LevelQueue levelChangePoints={this.changePointsStrategy} levelPoints={this.state.points} levelHeaderFontColor={this.state.headerColor} />
        </div>

      </div>
    );
  }
}

export default Levels;
