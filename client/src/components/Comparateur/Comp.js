import React, { Component, useEffect, useState } from 'react'
import tiger from "./shirt2.png";
// Importing ml5.js as ml5
import * as ml5 from "ml5";
import axios from "axios"
import './Comp.css'
function Comp (props) {
    
const [predictions, setPredictions] = useState([]) 




  const classifyImg = () => {
    // Initialize the Image Classifier method with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
    // When the model is loaded
    function modelLoaded() {
      console.log('Model Loaded!');
    }
    // Put the image to classify inside a variable
    const image = document.getElementById('image');
    // Make a prediction with a selected image
    classifier.predict(image, 1, function(err, results) {
      // Return the results
      return results;
    })
      .then((results) => {
        // Set the predictions in the state
        console.log(results)
        setPredictions(results[0].label)
      })
  }

 useEffect(() => {
    // once the component has mount, start the classification
  classifyImg();

  },[])
   useEffect(() => {
    // once the component has mount, start the classification
  classifyImg();

  },[props.img])
console.log(props.img)


  const [exist, setExist] = useState([])
    useEffect(() => {
     function fetchExist(){ 
     axios.get('http://localhost:5000/exist')
        .then(response => setExist(response.data));
   console.log(exist)}
fetchExist()
    }, [])
    console.log(exist)
       const [ha, setHa] = useState([])
    useEffect(() => {
     function fetchHa(){ 
     axios.get('http://localhost:5000/ha')
        .then(response => setHa(response.data));
   console.log(ha)}
fetchHa()
    }, [])
    console.log(ha)
    return (
      <div className="App">
        <h1>Image classification with ML5.js</h1>
        <img src={ props.img } id="image" width="400" alt="" />
 {predictions}
 <div className="espace"></div>
 <div className="yep">{predictions.includes("T-shirt") && exist.filter(ex=>ex.category==="PULLS & POLOS").map((ex)=>{
     return <><div className="container"><img key={ex.title} src={ex.image} className="image"></img> <div className="price">{ex.prix}</div></div></>
     })}
{predictions.includes("T-shirt") && ha.filter(h=>h.category.includes("Sweat","pull")).map((ex)=>{
    return <><div className="container"><img key={ex.title} src={ex.image} className="image"></img> <div className="price">{ex.prix}</div></div></>
    })}</div>
 <div className="yep">{predictions.includes("jean") && exist.filter(ex=>ex.title.includes("JEAN","PANTALON")).map((ex)=>{
     return <><div className="container"><img key={ex.title} src={ex.image} className="image"></img> <div className="price">{ex.prix}</div></div></>
     })}</div>
{predictions.includes("jean") && ha.filter(h=>h.category.includes("Jeans","Pantalon")).map((ex)=>{
    return <><div className="container"><img key={ex.title} src={ex.image} className="image"></img> <div className="price">{ex.prix}</div></div></>
    })}
<div className="yep">{predictions.includes("sweatshirt") && exist.filter(ex=>ex.title.includes("CHEMISE")).map((ex)=>{
     return <><div className="container"><img key={ex.title} src={ex.image} className="image"></img> <div className="price">{ex.prix}</div></div></>
     })}
     {predictions.includes("sweatshirt") && ha.filter(h=>h.category.includes("Chemise")).map((ex)=>{
    return <><div className="container"><img key={ex.title} src={ex.image} className="image"></img> <div className="price">{ex.prix}</div></div></>
    })}</div>
      </div>
    );
 
}

export default Comp
