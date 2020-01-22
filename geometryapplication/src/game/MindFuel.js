import React, { Component } from "react";
import { translation, rotation, reflection } from "./game";
import Queue from "./queue";
import "./MindFuel.css";

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
    ]
  };

  drawPoints = () => {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawCanvasTemplate();
    ctx.fillStyle = "red";
    //draw point
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

    //draw line
    let pixelPoint0 = this.translatePointToPixel(this.state.points[0]);
    let pixelPoint1 = this.translatePointToPixel(this.state.points[1]);
    let pixelPoint2 = this.translatePointToPixel(this.state.points[2]);
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(pixelPoint0[0], pixelPoint0[1]);
    ctx.lineTo(pixelPoint1[0], pixelPoint1[1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pixelPoint0[0], pixelPoint0[1]);
    ctx.lineTo(pixelPoint2[0], pixelPoint2[1]);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pixelPoint2[0], pixelPoint2[1]);
    ctx.lineTo(pixelPoint1[0], pixelPoint1[1]);
    ctx.stroke();
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
    ctx.fillStyle = "red";
    ctx.font = "15px Arial";
    let lineWidth = 0.7;
    
    // draw horizontal line 
    for (let i = 0; i <= this.canvasHeight; i += this.widthPerSquare) {
      ctx.lineWidth = lineWidth;
      if (i === this.canvasHeight / 2) {
        ctx.lineWidth = 3;
      }
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(this.canvasWidth, i);
      ctx.stroke();
      
      // add x axis label
      let labelX;
      for (let u=-10; u<=10;u++){
        labelX = this.translatePointToPixel([u,-0.3]);
        if (u===0) {
          u=""
        }
        ctx.fillText(u, labelX[0], labelX[1]);
        
        // ctx.textAlign="right";
      
      }
    }

    // draw vertical line
    for (let i = 0; i <= this.canvasWidth; i += this.heightPerSquare) {
      ctx.lineWidth = lineWidth;
      if (i === this.canvasWidth / 2) {
      
        ctx.lineWidth = 3;
        
      }

      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.canvasHeight);
      ctx.stroke();

      // add y axis label
      let labelY;
      for (let u=-10; u<=10 ;u++){
        labelY = this.translatePointToPixel([u,0]);
     
        ctx.fillText((u*-1), labelY[1], labelY[0]);
        
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
        translation(copy.points, 1, "y");
        break;
      case "down":
        translation(copy.points, -1, "y");
        break;
      case "right":
        translation(copy.points, 1, "x");
        break;
      case "left":
        translation(copy.points, -1, "x");
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
      case "clockwise":
        rotation(copy.points, 90, [0, 0]);
        break;
      case "counterClockwise":
        rotation(copy.points, -90, [0, 0]);
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
      if (pixelB[0] > this.canvasWidth-40 || pixelB[0] < 40) {
        return false;
      }
      if (pixelB[1] > this.canvasHeight-40 || pixelB[1] < 40) {
        return false;
      }
    }
    return true;
  };

  render() {
    return (
      <div>
        <h2>Welcome to Transformation Game</h2>
        <div>
        <button className="buttons btnUp"
            onClick={() => {
              this.translate("up");
            }}
          >
            
          </button>
          {/* <button
            onClick={() => {
              this.translate("up");
            }}
          >
            UP
          </button> */}
          {/* <button 
            onClick={() => {
              this.translate("down");
            }}
          >
            DOWN
          </button> */}
          <button className="buttons btnDown"
            onClick={() => {
              this.translate("down");
            }}
          >
          
          </button>
          {/* <button
            onClick={() => {
              this.translate("left");
            }}
          >
            LEFT
          </button> */}
          <button className="buttons btnLeft"
            onClick={() => {
              this.translate("left");
            }}
          >
         
          </button>
          <button className="buttons btnRight"
            onClick={() => {
              this.translate("right");
            }}
          >
           
          </button>
          {/* <button
            onClick={() => {
              this.translate("right");
            }}
          >
            RIGHT
          </button> */}
          
        {/* </div> */}
        {/* <div> */}
          {/* <button
            onClick={() => {
              this.rotation("clockwise");
            }}
          >
            COUNTER CLOCKWISE
          </button> */}
           <button className="buttons btnCounterClock"
            onClick={() => {
              this.rotation("clockwise");
            }}
          >
    
          </button>
          {/* <button
            onClick={() => {
              this.rotation("counterClockwise");
            }}
          >
            CLOCKWISE
          </button> */}
          <button className="buttons btnClock"
            onClick={() => {
              this.rotation("counterClockwise");
            }}
          >
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              this.reflection("x");
            }}
          >
            REFLECTION X
          </button>
          <button
            onClick={() => {
              this.reflection("y");
            }}
          >
            REFLECTION Y
          </button>
        </div>
        
        <div className="GameArea">
          <Queue id="queue"/>
          <canvas
            className="Canvas"
            id="canvas"
            //ref means js-getElement by ID or others
            ref={canvas => {
              this.canvas = canvas;
            }}
            width={this.canvasWidth}
            height={this.canvasHeight}
          />
        </div>
        
      </div>
    );
  }
}

export default MindFuel;
