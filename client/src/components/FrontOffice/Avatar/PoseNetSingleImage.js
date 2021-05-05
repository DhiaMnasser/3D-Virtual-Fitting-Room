import * as p5 from "p5";
import React from "react";
import ml5 from "ml5";
import man from "./models/humanFigure.jpg";
// import sleeve from "./models/sleeve1.png";
// import sleeve2 from "./models/sleeve2.png";
// import jean from "./models/jean.png";
// import upperR from "./models/upperRightLeg.png";
// import lowerR from "./models/lowerRightLeg.png";
// import upperL from "./models/upperLeftLeg.png";
// import lowerL from "./models/lowerLeftLeg.png";

// import "./AR.css";

class PoseNetSingleImage extends React.Component {
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
    let poses= [];
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

    function modelLoaded() {
      console.log("poseNet ready");
    }

    //###########################PRELOAD##########################\\
    p.preload = () => {
      img = p.loadImage(man);
      // slv = p.loadImage(sleeve);
      // slv2 = p.loadImage(sleeve2);
      // hzem = p.loadImage(jean);
      // ul = p.loadImage(upperL);
      // ur = p.loadImage(upperR);
      // ll = p.loadImage(lowerL);
      // lr = p.loadImage(lowerR);
    };

    //###########################SETUP##########################\\
    p.setup = () => {
      p.createCanvas(640, 360);

      // create an image using the p5 dom library
      // call modelReady() when it is loaded
      img = p.createImg(man, imageReady);
      // set the image size to the size of the canvas
      img.size(p.width, p.height);
  
      // img.hide(); // hide the image in the browser
      p.frameRate(1); // set the frameRate to 1 since we don't need it to be running quickly in this case
  };


  function imageReady(){
    // set some options
    let options = {
        imageScaleFactor: 1,
        minConfidence: 0.1
    }
    
    // assign poseNet
    poseNet = ml5.poseNet(modelReady, options);
    // This sets up an event that listens to 'pose' events
    poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelReady() {
 
   
  // When the model is ready, run the singlePose() function...
  // If/When a pose is detected, poseNet.on('pose', ...) will be listening for the detection results 
  // in the draw() loop, if there are any poses, then carry out the draw commands
  poseNet.singlePose(img)
}

function draw() {
  if (poses.length > 0) {
      p.image(img, 0, 0, img.width, img.height);
      p.drawSkeleton(poses);
      p.drawKeypoints(poses);
      p.noLoop(); // stop looping when the poses are estimated
  }
}


  // ################################################
  



    //###########################DRAW##########################\\
    p.draw = () => {
      
      p.image(video, 0,0);
      // p.image(shirt,0,0);

      if (pose) {
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let d = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);



       
        //kerch img


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
      <div style={{position:"relative"}} >
        <div style={{position:"relative"}} ref={this.myRef}></div>
      </div>
    );
  }
}

export default PoseNetSingleImage;
