import * as p5 from "p5";
import React from "react";
import ml5 from "ml5";
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
    let button;
    let tryAgainButton;
    let canvas;
    let snapShot;
    let poseNet;
    let bodyPix;
    let segmentation;
    let pose;
    let skeleton;
    let img;
    let takingSnap = true;
    let timer = 5;
    let isVideoLoaded = false;
    let options = {
      outputStride: 32, // 8, 16, or 32, default is 16
      segmentationThreshold: 0.1 // 0 - 1, defaults to 0.5
    };

    let sizes;
    function modelLoaded() {
      console.log("modelLoaded");
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
      ml5.p5Utils.setP5Instance(p);
      sizes = { height: 800, width: 1200 };
      p.pixelDensity(1);
      canvas = p.createCanvas(1200, 800, p.WEBGL);
      // .position(sizes.width / 4, -sizes.height / 2);
      canvas.style("display", "block");

      //  canvas.style('position', 'absolute');
      //  canvas.style('margin-top', '150px');

      canvas.style("z-index", "-1");
      // canvas.style("width", sizes.width * 1.25 + "px");
      // canvas.style("height", sizes.height * 1.5 + "px");

      canvas.style("position", "relative");
      canvas.style("margin", "0 auto");

      // console.log(canvas);
      video = p.createCapture(p.VIDEO);

      // video.size(1200,800);
      snapShot = video;
      // button = p.createButton('snap');
      // button.mousePressed(takeSnap);
      tryAgainButton = p.createButton("try again");
      tryAgainButton.mousePressed(resetSnapping);
      // video.hide();
      // poseNet = ml5.poseNet(video, modelLoaded);
      // poseNet.on("pose", gotPoses);
      bodyPix = ml5.bodyPix(snapShot, modelLoaded);
    };

    // ################################################
    const takeSnap = () => {
      console.log("snap taken");

      snapShot = video.get();
      // p.image(snapShot, 0, 0);

      videoReady();
      // video.delete();
      // console.log(snapShot);
    };

    const resetSnapping = () => {
      takingSnap = true;
      timer = 5;
      snapShot = video;
    };

    // ######################################

    const videoLoaded = () => {
      isVideoLoaded = true;
    };
    const videoReady = () => {
      console.log("videoReady");

      bodyPix.segment(gotResults, options);
    };

    const gotResults = (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      segmentation = result;



      p.background('white');
      console.log(segmentation.backgroundMask.canvas.toDataURL());

      p.image(segmentation.backgroundMask, -canvas.width/2, -canvas.height/2,canvas.width,canvas.height);
      console.log(segmentation);

    };

    //###########################DRAW##########################\\
    p.draw = () => {
      // p.translate(video.width,0);
      p.scale(-1, 1);
      // p.background(20);
      // p.image(
      //   snapShot,
      //   -canvas.width / 2,
      //   -canvas.height / 2,
      //   canvas.width,
      //   canvas.height
      // );

      // console.log(canvas.height);

      // -------  snap  -----------------
      // p.background(snapShot, [100]);


      if (takingSnap) {
        p.image(
          snapShot,
          -canvas.width / 2,
          -canvas.height / 2,
          canvas.width,
          canvas.height
        );

      p.image(img, -canvas.width/2, -canvas.height/2,canvas.width,canvas.height);



        // p.background(220);
        p.textAlign("center", "center");
        p.textSize(100);
        p.text(timer, p.width / 2, p.height / 2);
        if (p.frameCount % 60 == 0 && timer > 0) {
          // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
          timer--;
        }
        if (timer == 0) {
          p.text("GAME OVER", p.width / 2, p.height * 0.7);
          takeSnap();
          takingSnap = false;
          // p.noLoop();
        }
        console.log(timer);
      }

      // -----------  bodyPix -----------------
      // p.image(video, 0, 0);

      // if (segmentation) {
      //   p.image(segmentation.backgroundMask, 0, 0);
      // }
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
    // this.bodypix = ml5.bodyPix(options);
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
