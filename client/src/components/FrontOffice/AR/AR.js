import * as p5 from "p5";
import React from "react";
import ml5 from "ml5";
import shirt from "./models/shirt1.png";
import sleeve from "./models/sleeve1.png";
import sleeve2 from "./models/sleeve2.png";
import jean from "./models/jean.png";
import upperR from "./models/upperRightLeg.png";
import lowerR from "./models/lowerRightLeg.png";
import upperL from "./models/upperLeftLeg.png";
import lowerL from "./models/lowerLeftLeg.png";



class AR extends React.Component {
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
      img = p.loadImage(shirt);
      slv = p.loadImage(sleeve);
      slv2 = p.loadImage(sleeve2);
      hzem = p.loadImage(jean);
      ul = p.loadImage(upperL);
      ur = p.loadImage(upperR);
      ll = p.loadImage(lowerL);
      lr = p.loadImage(lowerR);
    };
    //###########################SETUP##########################\\
    p.setup = () => {
      p.createCanvas(1200, 800, p.WEBGL).position(-100, -100);
      console.log(p.VIDEO);
      video = p.createCapture(p.VIDEO);

      video.hide();
      poseNet = ml5.poseNet(video, modelLoaded);
      poseNet.on("pose", gotPoses);
    };
    //###########################DRAW##########################\\
    p.draw = () => {
      p.image(video, 0, 0);

      if (pose) {
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let d = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        /*     p.fill(255, 0, 0);
    p.ellipse(pose.nose.x, pose.nose.y, d);
    p.fill(0, 0, 255);
    p.ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    p.ellipse(pose.leftWrist.x, pose.leftWrist.y, 32); */
        //kerch couleur
        /*  p.quad(pose.rightShoulder.x - d,pose.rightShoulder.y - d,
      pose.leftShoulder.x+ d,pose.leftShoulder.y- d  ,
     
      pose.leftHip.x+ d, pose.leftHip.y+ d,
       pose.rightHip.x- d, pose.rightHip.y+ d, 
      );
    
      //yed lisar couleur
      p.quad(pose.leftShoulder.x+d/1.75 ,pose.leftShoulder.y-d/1.75 ,
      pose.leftShoulder.x-d/1.75,pose.leftShoulder.y+d/1.75  ,
     
      pose.leftElbow.x-d/2, pose.leftElbow.y+d/2,
       pose.leftElbow.x+d/2, pose.leftElbow.y-d/2, 
      );*/

        //hip couleur
        // p.quad(
        //   pose.rightHip.x - 1.25 * d,
        //   pose.rightHip.y - 1.25 * d,
        //   pose.rightHip.x + 1.25 * d,
        //   pose.rightHip.y - 1.25 * d,

        //   pose.rightKnee.x + d,
        //   pose.rightKnee.y + d,
        //   pose.rightKnee.x - d,
        //   pose.rightKnee.y + d
        // );

        //yed
        // left slv
        let width=p.dist(pose.rightHip.x - 1.25 * d, pose.rightHip.y - 1.25 * d,pose.leftHip.x + 1.25 * d, pose.leftHip.y - 1.25 * d)/d *6
      let height=((p.dist(pose.rightShoulder.y - 1.25 * d, pose.rightShoulder.y - 1.25 * d,pose.rightHip.x - d, pose.rightHip.y) )+
      (p.dist(pose.rightHip.x,pose.rightHip.y,pose.rightAnkle.x,pose.rightAnkle.y))+p.dist(pose.rightShoulder.x,pose.rightShoulder.y,pose.rightEye.x,pose.rightEye.y))/d*6.5
      console.log(height)
      console.log(width)
        p.texture(slv);
        p.textureMode(p.NORMAL);
        p.beginShape();
        p.vertex(pose.leftShoulder.x + d / 1.75,pose.leftShoulder.y - d /1.5 ,0,0);
        p.vertex(pose.leftShoulder.x - d / 1.75,pose.leftShoulder.y + d /1.5 ,1,0);
        p.vertex(pose.leftElbow.x - d / 1.75, pose.leftElbow.y + d / 1.75, 1, 1);
        p.vertex(pose.leftElbow.x + d / 1.75, pose.leftElbow.y - d / 1.75, 0, 1);
        p.endShape();
        // right slv
        p.texture(slv2);
        p.textureMode(p.NORMAL);
        p.beginShape();
        p.vertex(pose.rightShoulder.x - d / 1.75,pose.rightShoulder.y - d / 1.5,0,0);
        p.vertex(pose.rightShoulder.x + d / 1.75,pose.rightShoulder.y + d / 1.5,1,0);
        p.vertex(pose.rightElbow.x + d / 1.75, pose.rightElbow.y + d / 1.75, 1, 1);
        p.vertex(pose.rightElbow.x - d / 1.75, pose.rightElbow.y - d / 1.75, 0, 1);
        p.endShape();

        //se9 lootania limin
        p.texture(lr);
        p.textureMode(p.NORMAL);
        p.beginShape();
        p.vertex(pose.rightKnee.x - 1.25 * d/1.5,pose.rightKnee.y - 1.25 * d/2,0,0);
        p.vertex(pose.rightKnee.x + 1.25 * d/1.5,pose.rightKnee.y - 1.25 * d/2,1,0);
        p.vertex(pose.rightAnkle.x + d, pose.rightAnkle.y + d, 1, 1);
        p.vertex(pose.rightAnkle.x - d, pose.rightAnkle.y + d, 0, 1);
        p.endShape();

        //se9 lootania lisar
        p.texture(ll);
        p.textureMode(p.NORMAL);
        p.beginShape();
        p.vertex(pose.leftKnee.x - 1.25 * d, pose.leftKnee.y - 1.25 * d/2, 0, 0);
        p.vertex(pose.leftKnee.x + 1.25 * d, pose.leftKnee.y - 1.25 * d/2, 1, 0);
        p.vertex(pose.leftAnkle.x + d, pose.leftAnkle.y + d, 1, 1);
        p.vertex(pose.leftAnkle.x - d, pose.leftAnkle.y + d, 0, 1);
        p.endShape();
        //se9 foo9ania limin
        p.texture(ur);
        p.textureMode(p.NORMAL);
        p.beginShape();
        p.vertex(pose.rightHip.x - 1.25 * d, pose.rightHip.y - 1.25 * d, 0, 0);
        p.vertex(pose.rightHip.x + 1.25 * d, pose.rightHip.y - 1.25 * d, 1, 0);
        p.vertex(pose.rightKnee.x + d, pose.rightKnee.y + d, 1, 1);
        p.vertex(pose.rightKnee.x - d, pose.rightKnee.y + d, 0, 1);
        p.endShape();
        //se9 foo9ania lisar
        p.texture(ul);
        p.textureMode(p.NORMAL);
        p.beginShape();
        p.vertex(pose.leftHip.x - 1.25 * d, pose.leftHip.y - 1.25 * d, 0, 0);
        p.vertex(pose.leftHip.x + 1.25 * d, pose.leftHip.y - 1.25 * d, 1, 0);
        p.vertex(pose.leftKnee.x + d, pose.leftKnee.y + d, 1, 1);
        p.vertex(pose.leftKnee.x - d, pose.leftKnee.y + d, 0, 1);
        p.endShape();
        //7zem
        p.texture(hzem);
        p.textureMode(p.NORMAL);
        p.beginShape();
        p.vertex(pose.rightHip.x - 1.25 * d, pose.rightHip.y - 1.25 * d, 0, 0);
        p.vertex(pose.leftHip.x + 1.25 * d, pose.leftHip.y - 1.25 * d, 1, 0);
        p.vertex(pose.leftHip.x + d, pose.leftHip.y + d, 1, 1);
        p.vertex(pose.rightHip.x - d, pose.rightHip.y + d, 0, 1);
        p.endShape();
        //kerch img
        p.texture(img);
        p.textureMode(p.NORMAL);
        p.beginShape();
        p.vertex(
          pose.rightShoulder.x - 1.25 * d/1.5,
          pose.rightShoulder.y - 1.25 * d,
          0,
          0
        );
        p.vertex(pose.leftShoulder.x + 1.25 * d/1.5,pose.leftShoulder.y - 1.25 * d, 1,0);
        p.vertex(pose.leftHip.x + d, pose.leftHip.y + d /1.25, 1, 1);
        p.vertex(pose.rightHip.x - d, pose.rightHip.y + d/1.25, 0, 1);
        p.endShape();

        // for (let i = 0; i < pose.keypoints.length; i++) {
        //   let x = pose.keypoints[i].position.x;
        //   let y = pose.keypoints[i].position.y;
        //   p.fill(0, 255, 0);
        //   p.ellipse(x, y, 16, 16);
        // }

        // for (let i = 0; i < skeleton.length; i++) {
        //   let a = skeleton[i][0];
        //   let b = skeleton[i][1];
        //   p.strokeWeight(2);
        //   p.stroke(255);
        //   p.line(a.position.x, a.position.y, b.position.x, b.position.y);
        // }
      }
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return <div class="vid"><div ref={this.myRef}></div></div>;
    
  }
}
export default AR;