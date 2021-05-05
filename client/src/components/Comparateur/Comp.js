import React, { Component, useEffect, useState } from 'react'
import tiger from "./shirt2.png";
// Importing ml5.js as ml5
import * as ml5 from "ml5";
import axios from "axios"
import './Comp.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Comp (props) {
    
const [predictions, setPredictions] = useState([]) 

const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4
    };


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
    <div>
        <h1>upload the image of the item you want to compare</h1>
        <img src={ props.img } id="image" width="400" alt="" />
 {predictions}
 <div className="espace"></div>
   <Slider {...settings}>
{predictions.includes("T-shirt") && exist.filter(ex=>ex.category==="PULLS & POLOS").map((ex)=>{
     return <><img key={ex.title} src={ex.image} className="image"></img> <div className="price">{ex.prix}</div></>
     })}
     
     <div className="espace"></div>
   
{predictions.includes("T-shirt") && ha.filter(h=>h.category.includes("Sweat","pull")).map((ex)=>{
    return <><img key={ex.title} src={ex.image} className="image"></img> <div className="price">{ex.prix}</div></>
    })}
    </Slider>
    <div className="espace"></div>
    <Slider {...settings}>
 {predictions.includes("jean") && exist.filter(ex=>ex.title.includes("JEAN","PANTALON")).map((ex)=>{
     return <><img key={ex.title} src={ex.image} className="image"></img> <div className="price">{ex.prix}</div></>
     })}
 
     <div className="espace"></div>
     
{predictions.includes("jean") && ha.filter(h=>h.category.includes("Jeans","Pantalon")).map((ex)=>{
    return <><img key={ex.title} src={ex.image} className="image"></img> <div className="price">{ex.prix}</div></>
    })}
    </Slider>
    <div className="espace"></div>
    <Slider {...settings}>
{predictions.includes("sweatshirt") && exist.filter(ex=>ex.title.includes("CHEMISE")).map((ex)=>{
     return <><img key={ex.title} src={ex.image} className="image"></img> <div className="price">{ex.prix}</div></>
     })}
    
{predictions.includes("sweatshirt") && ha.filter(h=>h.category.includes("Chemise")).map((ex)=>{
    return <><img key={ex.title} src={ex.image} className="image"></img> <div className="price">{ex.prix}</div></>
    })}
    </Slider>
     </div>
    );
 
}

export default Comp
