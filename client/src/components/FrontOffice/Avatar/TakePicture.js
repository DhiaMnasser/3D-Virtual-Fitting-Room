import P5Wrapper from "react-p5-wrapper";
import React, { useEffect, useState, useRef } from "react";
import ml5 from "ml5";
import manOK from "./models/poseOK.png";
import manError from "./models/poseError.png";
import {
  RemoveBgResult,
  RemoveBgError,
  removeBackgroundFromImageBase64
} from "remove.bg";

function TakePicture() {
  let [globalTimer, setTimer] = useState(1);
  let myP5;

  const Sketch = p5 => {
    let video;
    let frame;
    let tryAgainButton;
    let canvas;
    let snapShot;
    let poseNet;
    let skeleton;
    let pose;
    let imgManError;
    let imgManOK;
    let takingSnap = true;
    let timer = globalTimer;
    let isVideoLoaded = false;

    function modelLoaded() {
      console.log("modelLoaded");
    }

    function gotPoses(poses) {
      if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
      }
    }

    //###########################PRELOAD##########################\\
    p5.preload = () => {
      imgManError = p5.loadImage(manError);
      imgManOK = p5.loadImage(manOK);
    };

    //###########################SETUP##########################\\
    p5.setup = () => {
      ml5.p5Utils.setP5Instance(p5);
      p5.pixelDensity(1);
      canvas = p5.createCanvas(1200, 800);
      canvas.style("display", "block");
      canvas.style("z-index", "-1");
      canvas.style("position", "relative");
      canvas.style("margin", "0 auto");
      video = p5.createCapture(p5.VIDEO);
      video.size(1200, 800);
      tryAgainButton = p5.createButton("try again");
      tryAgainButton.mousePressed(resetSnapping);
      video.hide();
      poseNet = ml5.poseNet(video, modelLoaded);
      poseNet.on("pose", gotPoses);
    };

    // ################################################
    const takeSnap = () => {
      console.log("snap taken");

      // p5.background(0);
      snapShot = video.get();
      snapShot.filter(p5.BLUR, 3);

      p5.image(snapShot, -canvas.width, 0, canvas.width, canvas.height);

      // removeBackground();
    };

    const resetSnapping = () => {
      p5.background(255);
      p5.image(p5, -canvas.width, 0, canvas.width, canvas.height);
      takingSnap = true;
      timer = 1;
      setTimer(1);
      console.log("new timer" + globalTimer);

      p5.loop();
    };

    const updateTimer = () => {
      p5.image(frame, -canvas.width, 0, canvas.width, canvas.height);
      p5.image(imgManOK, -canvas.width, 0, canvas.width, canvas.height);
      setText("Stand Still");
      if (p5.frameCount % 60 == 0 && timer > 0) {
        // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer--;
      }
      if (timer == 0) {
        takingSnap = false;
        takeSnap();
        p5.noLoop();
      }
    };

    const setText = message => {
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.push();
      p5.scale(-1, 1);
      p5.stroke(p5.color(0, 0, 150));
      p5.strokeWeight(4);
      p5.fill(255);
      p5.textSize(canvas.width / 10);
      p5.text(message, canvas.width / 2, canvas.height / 2);
      p5.pop();
    };

    const removeBackground = () => {
      const base64img = snapShot.canvas.toDataURL();

      removeBackgroundFromImageBase64({
        base64img,
        apiKey: "6JxGJj28ZRnesH2Hejxr9WUp",
        size: "regular",
        type: "person"
      })
        .then(result => {
          let Clientimage = p5.loadImage(
            result.base64img.canvas.toDataURL(),
            img => {
              p5.image(img, -canvas.width, 0, canvas.width, canvas.height);
            }
          );
        })
        .catch(errors => {
          console.log(JSON.stringify(errors));
        });
    };

    //###########################DRAW##########################\\
    p5.draw = () => {
      p5.scale(-1, 1);

      if (takingSnap) {
        if (pose) {
          let dEyes = p5.dist(
            pose.rightEye.x,
            pose.rightEye.y,
            pose.leftEye.x,
            pose.leftEye.y
          );
          let dFeets = p5.dist(
            pose.rightAnkle.x,
            pose.rightAnkle.y,
            pose.leftAnkle.x,
            pose.leftAnkle.y
          );
          let dHands = p5.dist(
            pose.rightWrist.x,
            pose.rightWrist.y,
            pose.leftWrist.x,
            pose.leftWrist.y
          );
          let middleFeet = {
            x: (pose.rightAnkle.x + pose.leftAnkle.x) / 2,
            y: (pose.rightAnkle.y + pose.leftAnkle.y) / 2
          };
          let height = p5.dist(
            middleFeet.x,
            middleFeet.y,
            pose.nose.x,
            pose.nose.y
          );
          let distance = height / dEyes;

          // console.log("height "+height);
          // console.log("dEyes "+dEyes);
          // console.log("distance "+distance);
          // console.log("dFeets "+dFeets);
          // console.log("dHands "+dHands);

          frame = video.get();

          if (distance < 19 && distance > 16) {
            if (dFeets < 24 && dFeets > 20 && dHands < 24 && dHands > 20) {
              updateTimer();
            }

            if (dHands > 420 || dHands < 390) {
              // distance Hands

              if (dHands > 420) {
                p5.image(frame, -canvas.width, 0, canvas.width, canvas.height);
                p5.image(
                  imgManError,
                  -canvas.width,
                  0,
                  canvas.width,
                  canvas.height
                );
                setText("Get Hands Closer");
              }
              if (dHands < 390) {
                p5.image(frame, -canvas.width, 0, canvas.width, canvas.height);
                p5.image(
                  imgManError,
                  -canvas.width,
                  0,
                  canvas.width,
                  canvas.height
                );
                setText("Get Hands Farther");
              }
            } else {
              // distance Feet
              if (dFeets > 150 && dFeets < 200) {
                updateTimer();
              }
              if (dFeets > 200) {
                p5.image(frame, -canvas.width, 0, canvas.width, canvas.height);
                p5.image(
                  imgManError,
                  -canvas.width,
                  0,
                  canvas.width,
                  canvas.height
                );
                setText("Get Feet Closer");
              }
              if (dFeets < 150) {
                p5.image(frame, -canvas.width, 0, canvas.width, canvas.height);
                p5.image(
                  imgManError,
                  -canvas.width,
                  0,
                  canvas.width,
                  canvas.height
                );
                setText("Get Feet Farther");
              }
            }
          }

          // distance human - camera
          if (dEyes>40 || distance > 19) {
            p5.image(frame, -canvas.width, 0, canvas.width, canvas.height);
            p5.image(
              imgManError,
              -canvas.width,
              0,
              canvas.width,
              canvas.height
            );
            setText("Get Farther");
          }else

          if ( distance < 16) {
            p5.image(frame, -canvas.width, 0, canvas.width, canvas.height);
            p5.image(
              imgManError,
              -canvas.width,
              0,
              canvas.width,
              canvas.height
            );
            setText("Get Closer");
          }

          console.log(timer);

          // // hands and feet ponits
          //   p5.fill(0, 255, 0);
          //   p5.ellipse(pose.rightWrist.x-canvas.width, pose.rightWrist.y, 16, 16);
          //   p5.ellipse(pose.leftWrist.x-canvas.width, pose.leftWrist.y, 16, 16);
          //   p5.ellipse(pose.rightAnkle.x-canvas.width, pose.rightAnkle.y, 16, 16);
          //   p5.ellipse(pose.leftAnkle.x-canvas.width, pose.leftAnkle.y, 16, 16);

          //   // pose expected positions
          //   p5.fill(0, 0, 150);
          //   p5.ellipse(360-canvas.width, 350, 50, 50);
          //   p5.ellipse(840-canvas.width, 350, 50, 50);
        }
      }
    };
  };

  useEffect(() => {
    return
  }, []);

  return (
    <>
      <div style={{ position: "relative" }}>
      <P5Wrapper sketch={Sketch} />
      </div>
    </>
  );
}

export default TakePicture;
