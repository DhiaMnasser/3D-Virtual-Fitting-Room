import * as p5 from "p5";
import React from "react";
// import ml5 from "ml5";
import shirt from "./models/man.png";
import man from "./models/humanFigure.jpg";
// import sleeve from "./models/sleeve1.png";
// import sleeve2 from "./models/sleeve2.png";
// import jean from "./models/jean.png";
// import upperR from "./models/upperRightLeg.png";
// import lowerR from "./models/lowerRightLeg.png";
// import upperL from "./models/upperLeftLeg.png";
// import lowerL from "./models/lowerLeftLeg.png";

// import "./AR.css";

class TakePicture extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  Sketch = p => {
    let a = 0;
    let b = 0;
    let speed = 3;
    let video;
    let poseNet;
    let pose;
    let skeleton;
    let img;
    let slv;
    let snap;
    let slv2;
    let hzem;
    let ul;
    let ur;
    let ll;
    let lr;
    let sizes;
    function modelLoaded() {
      console.log("poseNet ready");
    }

    function gotPoses(poses) {
      //console.log(poses);
      if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
      }
    }


    //###########################PRELOAD##########################\\
    p.preload = () => {
      img = p.loadImage(shirt);

    };

    //###########################SETUP##########################\\
    p.setup = () => {
      sizes = { height: 800, width: 1200 };
      p.pixelDensity(1)
      let canvas = p
        .createCanvas(1200, 800, p.WEBGL)
        // .position(400,-400);
        .position(sizes.width / 4, -sizes.width / 2);
      canvas.style("display", "block");

      //  canvas.style('position', 'absolute');
      //  canvas.style('margin-top', '150px');

      canvas.style("z-index", "-1");
      canvas.style("width", sizes.width*1.25 + "px");
      canvas.style("height", sizes.height*1.5 + "px");

      canvas.style("position", "relative");
      canvas.style("margin", "0 auto");

      console.log(p.VIDEO);
      video = p.createCapture(p.VIDEO);
      video.hide();
      // poseNet = ml5.poseNet(video, modelLoaded);
      poseNet.on("pose", gotPoses);
    };

    // ################################################

    //###########################DRAW##########################\\
    p.draw = () => {
      // p.translate(video.width,0);
      p.scale(-1,1);
      p.image(video, 0, 0);
      // p.image(shirt,0,0);

      if (pose) {
        let footR = pose.rightAnkle;
        let eyeL = pose.leftEye;
        let d = p.dist(footR.x, footR.y, eyeL.x, eyeL.y);
        console.log("distsnce d : " + d);

        //man overlay img
        p.texture(img);
        p.textureMode(p.NORMAL);
        p.beginShape();
        p.vertex(0, 0, 0, 0);
        p.vertex(600, 0, 1, 0);
        p.vertex(600, 400, 1, 1);
        p.vertex(0, 400, 0, 1);
        p.endShape();

        for (let i = 0; i < pose.keypoints.length; i++) {
          let x = pose.keypoints[i].position.x;
          let y = pose.keypoints[i].position.y;
          p.fill(0, 255, 0);
          p.ellipse(x, y, 16, 16);
        }

        for (let i = 0; i < skeleton.length; i++) {
          let a = skeleton[i][0];
          let b = skeleton[i][1];
          p.strokeWeight(2);
          p.stroke(255);
          p.line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
      }
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <div ref={this.myRef}></div>
      </div>
    );
  }
}

export default TakePicture;
