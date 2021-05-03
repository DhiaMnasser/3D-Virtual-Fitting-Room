import React ,{Component } from 'react';
import ml5 from "ml5";
import * as p5 from "p5";
import profil from "./ashley.jpg";

import { dimensions } from './dimensions.js';
import ChildComponent from './RecommendationSize';
import { RgbColorPicker } from 'react-colorful';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
let img; let poseNet; let poses= [];    let skeleton;
let pose;
const divStyle = {
    width : "50%"
  };
  
class Sketch extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
 
  } 
  Sketch = p => {
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(user);
   // const x = localStorage.getItem('x');
    //const y = localStorage.getItem('y');
    const x = dimensions(profil).width;
    const y = dimensions(profil).height;
   // localStorage.setItem('x', x);
  //  localStorage.setItem('y', y);
  console.log( "My name", user?.result?.name);
  console.log("ena" ,user?.result?.gender);
    function gotPoses(poses) {
        console.log(poses);
        if (poses.length > 0) {
          pose = poses[0].pose;
          skeleton = poses[0].skeleton;
          if (pose) {
            console.log( "h", pose)
            let eyeR = pose.rightEye;
          
            let eyeL = pose.leftEye;
            let d = p.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
            console.log(d);
            let rightHip = pose.rightHip;
        let leftHip = pose.leftHip;
        let rightShoulder = pose.rightShoulder;
        let rightwrist = pose.rightWrist;
        let rightelbow= pose.rightElbow;
        let leftShoulder = pose.leftShoulder;
        let rightAnkle = pose.rightAnkle;
        let leftAnkle = pose.leftAnkle;
        let width=p.dist(rightHip.x - 1.25 * d, rightHip.y - 1.25 * d,leftHip.x + 1.25 * d, leftHip.y - 1.25 * d)/d *6.2
        console.log( "size",width)
        //let wrist=Distance(wristright.x - 1.25 * d, wristright.y - 1.25 * d,wristleft.x + 1.25 * d, wristleft.y - 1.25 * d)/d *6
        //console.log( "wrist",wrist)
        let height=((p.dist(rightShoulder.y - 1.25 * d, rightShoulder.y - 1.25 * d,rightHip.x - d, rightHip.y) )+
     (p.dist(rightHip.x,rightHip.y,rightAnkle.x,rightAnkle.y))+p.dist(rightShoulder.x,rightShoulder.y,eyeR.x,eyeR.y))/d*6.6
        console.log( "toul " , height);
        const heigh = Math.round(height);
        const widt = Math.round(width)
        document.getElementById("sum").innerHTML=heigh;
        document.getElementById("size").innerHTML=widt;
        let shouldersize =p.dist(rightShoulder.x - 1.25 * d, rightShoulder.y - 1.25 * d,leftShoulder.x + 1.25 * d, leftShoulder.y - 1.25 * d)/d *5.2
        console.log ( "shoulder size " ,shouldersize);
        const shoulder = Math.round(shouldersize);
        document.getElementById("shoulder").innerHTML=shoulder;
        let forme =  width / shouldersize ;
        console.log("forme" ,forme);
        let forme2 =  shouldersize/ width ;
        console.log('forme2',forme2)
        let shape =""
    if ( forme2 > 0.97 && forme2 < 1.10)
    shape ="inverted triangle"

    else if ( forme2 > 1.10 && shouldersize > 45 )
        shape ="oval"
        else     if ( forme  > 1.002)
        shape ="pear";
         else if ( forme  > 0.77)
         
         shape = "rectangle";
        
         else if (forme < 0.77)
         {
            shape ="Hourglass";
         }
        

        
console.log(shape );
localStorage.setItem('myshape', shape);
document.getElementById("shape").innerHTML=shape;
let random = Math.round(width);
let jeans ;
let top ;
console.log(random);
if (user?.result?.gender !== "F")
{
        if (random  === 35)
        jeans =28  ;
       
        else if  (random === 36)
         jeans =29 ;
         
        else if (random === 37)
        jeans =30 ;

        else if  (random === 38)
        jeans =31 ;
        else if (random === 39)
        jeans  =32 ;
        else if (random === 40)
       jeans =33 ;
        else if (random === 41)
        jeans  =34 ;
        else if (random === 42)
        jeans  =35 ;
        else if (random === 43)
        jeans  =36 ;
        else if (random === 44)
        jeans  =37 ;
        else if (random > 44)
        jeans  =38 ;
         console.log(jeans);
         document.getElementById("jeans").innerHTML=jeans;
}
else {
         console.log(random);
        if (random  <33)
        jeans =23  ;
       
        else if  (random === 33)
         jeans =24 ;
         
        else if (random === 34)
        jeans =25 ;

        else if  (random === 36)
        jeans =26 ;
        else if (random === 37)
        jeans  =27 ;
        else if (random === 38)
       jeans =28 ;
        else if (random === 39)
        jeans  =29 ;
        else if (random === 40)
        jeans  =30 ;
        else if (random === 41)
        jeans  =31 ;
         console.log(jeans);
         document.getElementById("jeans").innerHTML=jeans;
}
        if (user?.result?.gender !== "F")
        {
        if ( random === 31 ||  random === 32  )
        top = "XS";
        else if ( random === 33 )
        top ="S";
        else if ( random === 34 || random === 35 )
        top ="M";
        else if ( random === 36)
        top ="L";
        else if ( random === 37 || random === 38)
        top ="XL";
        else if ( random === 39 )
        top ="XXL";
        else if (random === 40 || random === 41)
        top = "XXXL";
        else if (random === 42 ) 
        top ="4Xl";
        else if (random === 43 || random ===44 || random ===45 ) 
        top ="5Xl";
        console.log(top);
        document.getElementById("top").innerHTML=top;
        let R ;
        if (top === "XS")
        R = "S";
        else if ( top ==="S")
        R="M";
        else if ( top ==="M")
        R="L";
        else if (top === "L")
        R= "Xl"
        else if ( top ==="XL")
        R ="XXL"
        document.getElementById("R").innerHTML=R;
        let S;
        if (R ==="S")
        S="M"
        else if (R === "M")
        S="L"
        else if (R=== "L")
        S="XL"
        else if (R === "XL")
        S ="XXL"
        else if (R === "XXL")
        S ="3XL"
        document.getElementById("S").innerHTML=S;
        document.getElementById("C").innerHTML=top;
        let Rp;
        if ( top ==="XS")

          Rp ="M";
        else if ( top === "S")
        Rp ="L";
        else if (top === "M")
        Rp ="XL";
        else if ( top ==="L")
        Rp ="XXL";
else if (top ==="XL")
Rp="3XL";
let sp;
if (Rp ==="M")
sp ="L"
if (Rp ==="L")
sp ="XL"
if (Rp ==="XL")
sp ="XXL"
if (Rp ==="XXL")
sp ="3XL"
if (Rp ==="3XL")
sp ="4XL"


document.getElementById("sp").innerHTML=sp;
document.getElementById("Rp").innerHTML=Rp;
document.getElementById("P").innerHTML=top;

        }
        else {
let shoud = Math.round(shouldersize);
console.log( "she",shoud);

        if (shoud === 33 || shoud === 34 )
        top ="XS";
        if (shoud === 36||  shoud === 35 )
        top ="S";
        if (shoud === 37 || shoud === 38)
        top ="M";
        if (shoud === 39 || shoud === 40)
        top ="L";
        if (shoud > 40)
        top ="XL";
        document.getElementById("top").innerHTML=top;
        let R ;
        if (top === "XS")
        R = "S";
        else if ( top ==="S")
        R="M";
        else if ( top ==="M")
        R="L";
        else if (top === "L")
        R= "XL"
        else if ( top ==="XL")
        R ="XXL"
        document.getElementById("R").innerHTML=R;
        let S;
        if (R ==="S")
        S="M"
        else if (R === "M")
        S="L"
        else if (R=== "L")
        S="XL"
        else if (R === "XL")
        S ="XXL"
        else if (R === "XXL")
        S ="3XL"
        document.getElementById("S").innerHTML=S;
        document.getElementById("C").innerHTML=top;
        let Rp;
        if ( top ==="XS")
          Rp ="M";
        else if ( top === "S")
        Rp ="L";
        else if (top === "M")
        Rp ="XL";
        else if ( top ==="L")
        Rp ="XXL";
else if (top ==="XL")
Rp="3XL";
let sp;
if (Rp ==="M")
sp ="L"
if (Rp ==="L")
sp ="XL"
if (Rp ==="XL")
sp ="XXL"
if (Rp ==="XXL")
sp ="3XL"
if (Rp ==="3XL")
sp ="4XL"


document.getElementById("sp").innerHTML=sp;
document.getElementById("Rp").innerHTML=Rp;
document.getElementById("P").innerHTML=top;


        }

    }
    }
      }
  p.setup = () => {
    //console.log("dim",dimensions(profil));
    //const x = dimensions(profil).width;
     //const y = dimensions(profil).height;
    p.createCanvas(x, y);
     img = p.createImg(profil, p.imageReady);
    img.size(p.width, p.height);

  }
  p.imageReady = () =>{
    // set some options
    let options = {
        imageScaleFactor: 1,
        minConfidence: 0.1
    }
   // assign poseNet
   poseNet = ml5.poseNet(modelReady, options);

   // This sets up an event that listens to 'pose' events
  /* poseNet.on('pose', function (results) {
      poses= results;
      console.log(poses);
      let pose = poses.pose;
      console.log(pose);
   
   });*/
   poseNet.on('pose',function(results) {
    poses = results;
    gotPoses(poses);
  });
}
   
   
   function modelReady() {
    console.log('Model Loaded');
    
    // When the model is ready, run the singlePose() function...
    // If/When a pose is detected, poseNet.on('pose', ...) will be listening for the detection results 
    // in the draw() loop, if there are any poses, then carry out the draw commands
    poseNet.singlePose(img)

}
  
   /*p.draw = () =>{
    if (poses.length > 0) {
        //p.image(img, 0, 0, p.width, p.height);
        p.drawSkeleton(poses);
        p.drawKeypoints(poses);
        p.noLoop(); // stop looping when the poses are estimated
    }
}*/

  

  p.drawKeypoints = () =>{
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {
                p.fill(255);
                p.stroke(20);
                p.strokeWeight(4);
                p.ellipse(p.round(keypoint.position.x), p.round(keypoint.position.y), 8, 8);
            }
        }
    }
}
// A function to draw the skeletons
p.drawSkeleton = () => {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
        let skeleton = poses[i].skeleton;
        // For every skeleton, loop through all body connections
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            p.stroke(255);
            p.strokeWeight(1);
            p.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}
  };
componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }
  render() {

    return <div class="vid">
      <h1> What Is My Body Type ? </h1>
      
      <div class="row"> <div class ="col"> <img src={profil} alt="" width="500px"></img>  </div> 
     <div class ="col"> 
        <table class="table" style = {divStyle}>
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Body measurements</th>
   
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Height</th>
      <td><span id="sum"></span></td>
      
    </tr>
    <tr>
      <th scope="row">Waist </th>
      <td><span id="size"></span></td>
      
      
    </tr>
    <tr>
      <th scope="row">Shoulder Lenghth </th>
      <td><span id="shoulder"></span></td>
      
      
    </tr>

    <tr>
      <th scope="row">Body shape </th>
      <td><span id="shape"></span></td>
      
      
    </tr>
    <tr>
      <th scope="row">TOPS SIZE </th>
      <td><span id="top"></span></td>
      
      
    </tr>
    <tr>
      <th scope="row">JEANS SIZE </th>
      <td><span id="jeans"></span> US</td>
      
      
    </tr>
   
  </tbody>

  <br></br>
</table>
<table class="table table-striped" style={divStyle}>
  <thead class ="thead-dark">
    <tr>
      <th scope="col"> POLO SIZES</th>
      <th scope="col">CLASSIC FIT</th>
      <th scope="col">REGULAR FIT</th>
      <th scope="col">SLIM FIT
</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td><span id="C"></span></td>
      <td> <span id="R"></span> </td>
      <td><span id="S"> </span></td>
    </tr>
    </tbody>
    <thead>
    <tr>
      <th scope="col"> SWEATER SIZES</th>
      <th scope="col">CLASSIC FIT</th>
      <th scope="col">REGULAR FIT</th>
      <th scope="col">SLIM FIT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">2</th>
      <td><span id="P"></span></td>
      <td> <span id="Rp"></span> </td>
      <td><span id="sp"> </span></td>
    </tr>
    </tbody>
    </table>
   
    <Link to='/recom'>
    <Button variant="contained" color="secondary">
         Show Recommendations
    </Button>
</Link>
    </div>
</div>
</div>
  }
  
  }
 export default Sketch ;

