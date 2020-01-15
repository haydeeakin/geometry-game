import React, { Component } from "react";
import { translation, rotation, reflection } from "./game";
class MindFuel extends Component {
  constructor() {
    super();
    this.canvasHeight = 800;
    this.canvasWidth = 800;
    this.squareCount = 20;
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
    ctx.fillStyle = "#000000";
    let lineWidth = 2;
    //horiz
    for (let i = 0; i <= this.canvasHeight; i += this.widthPerSquare) {
      ctx.lineWidth = lineWidth;
      if (i === this.canvasHeight / 2) {
        ctx.lineWidth = 5;
      }
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(this.canvasWidth, i);
      ctx.stroke();
    }
    //vertical
    for (let i = 0; i <= this.canvasWidth; i += this.heightPerSquare) {
      ctx.lineWidth = lineWidth;
      if (i === this.canvasWidth / 2) {
        ctx.lineWidth = 5;
      }
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.canvasHeight);
      ctx.stroke();
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
      if (pixelB[0] > this.canvasWidth || pixelB[0] < 0) {
        return false;
      }
      if (pixelB[1] > this.canvasHeight || pixelB[1] < 0) {
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
          <button
            onClick={() => {
              this.translate("up");
            }}
          >
            UP
          </button>
          <button
            onClick={() => {
              this.translate("down");
            }}
          >
            DOWN
          </button>
          <button
            onClick={() => {
              this.translate("left");
            }}
          >
            LEFT
          </button>
          <button
            onClick={() => {
              this.translate("right");
            }}
          >
            RIGHT
          </button>
          
        </div>
        <div>
          <button
            onClick={() => {
              this.rotation("clockwise");
            }}
          >
            COUNTER CLOCKWISE
          </button>
          <button
            onClick={() => {
              this.rotation("counterClockwise");
            }}
          >
            CLOCKWISE
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
          <canvas
            className="Canvas"
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
