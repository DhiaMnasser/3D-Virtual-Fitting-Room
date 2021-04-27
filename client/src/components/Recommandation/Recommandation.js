import React, { useEffect, useState } from 'react'
import { prominent } from 'color.js'
import shirt from "./shirt2.png"
import FileBase from "react-file-base64";
import empty from "./Empty.png"
import axios from 'axios';
import "./Recommandation.css"
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/slices/products';
function Recommandation() {
    
    const dispatch = useDispatch()

      useEffect(() => {
       
    dispatch(getProducts());
  
  }, []);
 async function isGrey(color){
      try{
const {data} = await axios.get("https://api.color.pizza/v1/"+color.slice(1))
console.log(data)
if((data.colors[0].hsl.s<=4)&&((data.colors[0].hsl.l<=90)&&(data.colors[0].hsl.l>=30))){
return "grey"
}
else if((data.colors[0].hsl.l<=5)){
return "black"
}
else if((data.colors[0].hsl.l >=95)){
    return"white"
}
else if((data.colors[0].hsl.h<320)&&(data.colors[0].hsl.h>300)){
    return "pink"
}
else if ((data.colors[0].hsl.h<200)&&(data.colors[0].hsl.h>180)){
    return "bbblue"
}
else if ((data.colors[0].hsl.h<50)&&(data.colors[0].hsl.h>30)){
    return "khaki"
}
else if ((data.colors[0].hsl.h<60)&&(data.colors[0].hsl.h>50)){
    return "beige"
}
else if ((data.colors[0].hsl.h<360)&&(data.colors[0].hsl.h>340)){
    return "burgundy"
}
else if ((data.colors[0].hsl.h<230)&&(data.colors[0].hsl.h>210)){
    return "navy"
}
else if ((data.colors[0].hsl.h<260)&&(data.colors[0].hsl.h>230)){
    return "rblue"
}
else if ((data.colors[0].hsl.h<30)&&(data.colors[0].hsl.h>0)){
    return "brown"
}
else if ((data.colors[0].hsl.h<100)&&(data.colors[0].hsl.h>80)){
    return "pastel"
}
      }catch(error){

      }
  }
const products = useSelector((state) => state.products.products)
const grey = products.filter(prod=> isGrey(prod.color)==="grey" )
const black = products.filter(prod=>isGrey(prod.color)==="black" )
const white = products.filter(prod=>isGrey(prod.color)==="white" )
const pink = products.filter(prod=>isGrey(prod.color)==="pink" )
const bbblue = products.filter(prod=>isGrey(prod.color)==="bbblue" )
const khaki = products.filter(prod=>isGrey(prod.color)==="khaki" )
const navy = products.filter(prod=>isGrey(prod.color)==="navy" )   
const rblue = products.filter(prod=>isGrey(prod.color)==="rblue" ) 
const brown = products.filter(prod=>isGrey(prod.color)==="brown" )   
const beige = products.filter(prod=>isGrey(prod.color)==="beige" )  
const burgundy = products.filter(prod=>isGrey(prod.color)==="burgundy" )     
const pastel = products.filter(prod=>isGrey(prod.color)==="pastel" )   
console.log(products)
console.log(white,black,pink,bbblue,khaki,navy,rblue,brown,beige,burgundy,pastel)
 function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return  componentToHex(r) + componentToHex(g) + componentToHex(b);
}   
const [couleur, setCouleur]= useState("")
const [HSL, setHSL]= useState("")
const [lumi, setLumi]= useState("")
const [IMG, setIMG] = useState("")
const [color, setColor]= useState("")
useEffect(() => {
     prominent(IMG, { amount: 1 }).then(color => {
  console.log(color) // [241, 221, 63]
  axios.get("https://api.color.pizza/v1/"+rgbToHex(color[0],color[1],color[2])).then(response => {
  console.log(response)
  setCouleur(rgbToHex(color[0],color[1],color[2]))
  setHSL(response.data.colors[0].hsl)
  setColor(response.data.colors[0].name)
  setLumi(response.data.colors[0].luminance)});

  console.log(grey)
})

}, [IMG])

    return (
        <div>
                <span className="text">Image: </span>
                <FileBase
                  type="file"
                  id="image"
                  name="image"
                  multiple={false}
                  onDone={({ base64 }) => {
                    setIMG(base64);
                  }}
                />
       
                {((Number(HSL.h) <= 60)&&(Number(HSL.h) >= 0)||((Number(HSL.h) <= 360)&&(Number(HSL.h) >= 300)))&&
                <div>{((Number(lumi) < 56)&&(Number(lumi) > 0)) && <>
                <h1>your skin tone is dark:</h1>
                 <div className="circle" style={{backgroundColor: "#"+couleur }}></div>
                <h1>recommended colors for your skin tone are :</h1>
                <div className="circle" style={{backgroundColor: "#6d6e72" }}></div>grey
                 {grey.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <div className="circle" style={{backgroundColor: "#ED207B" }}></div> pink
                  {pink.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <div className="circle" style={{backgroundColor: "#FFFFFF"}}></div> white
                  {white.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <div className="circle" style={{backgroundColor: "#C7AB86" }}></div>khaki
                   {khaki.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <div className="circle" style={{backgroundColor: "#25aae2" }}></div>baby blue
                {bbblue.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <h1> colors to avoid are :</h1>
                <div className="circle" style={{backgroundColor: "#010000" }}></div>black
                <div className="circle" style={{backgroundColor: "#3a2313" }}></div>dark brown
                <div className="circle" style={{backgroundColor: "#17a887" }}></div>turquoise 
                <div className="circle" style={{backgroundColor: "#3ab54a" }}></div>spring green
                <div className="circle" style={{backgroundColor: "#d91b5b" }}></div>magenta              
                </>}
                {((Number(lumi) < 120)&&(Number(lumi) > 56)) && <>
                <h1>your skin tone is medium:</h1>
                 <div className="circle" style={{backgroundColor: "#"+couleur }}></div>
                <h1>recommended colors for your skin tone are :</h1>
                <div className="circle" style={{backgroundColor: "#e2e1a4" }}></div>beige
                {beige.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <div className="circle" style={{backgroundColor: "#901823" }}></div> burgundy
                {burgundy.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <div className="circle" style={{backgroundColor: "#2a3a96"}}></div> royal blue
                {rblue.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <div className="circle" style={{backgroundColor: "#262262" }}></div>navy
                {navy.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <h1> colors to avoid are :</h1>
                <div className="circle" style={{backgroundColor: "#99c875" }}></div>pistachio
                <div className="circle" style={{backgroundColor: "#5f7d37" }}></div>olive
                <div className="circle" style={{backgroundColor: "#92606f" }}></div>mauve 
                <div className="circle" style={{backgroundColor: "#3b2313" }}></div>dark brown
                <div className="circle" style={{backgroundColor: "#ed1c24" }}></div>red              
                </>}
                {((Number(lumi) < 170.4)&&(Number(lumi) > 120)) && <>
                <h1>your skin tone is fair:</h1>
                 <div className="circle" style={{backgroundColor: "#"+couleur }}></div>
                  <h1>recommended colors for your skin tone are :</h1>
                <div className="circle" style={{backgroundColor: "#8acbdf" }}></div>light blue
                {bbblue.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <div className="circle" style={{backgroundColor: "#623714" }}></div> brown
                {brown.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <div className="circle" style={{backgroundColor: "#dde2a8"}}></div> beige
                {beige.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <div className="circle" style={{backgroundColor: "#d8eee2" }}></div>pastel
                {pastel.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <div className="circle" style={{backgroundColor: "#2e3094" }}></div>bald blue
            {navy.map((prod)=>{return <> <img src={prod.image}></img></>})}
                <h1> colors to avoid are :</h1>
                <div className="circle" style={{backgroundColor: "#f01722" }}></div>red
                <div className="circle" style={{backgroundColor: "#ee227b" }}></div>pink
                <div className="circle" style={{backgroundColor: "#e86a1e" }}></div>orange
                <div className="circle" style={{backgroundColor: "#fbf103" }}></div>yellow
                <div className="circle" style={{backgroundColor: "#95268f" }}></div>purple             
                </>}</div>}
                {((Number(HSL.h) <= 60)&&(Number(HSL.h) >= 0)||((Number(HSL.h) <= 360)&&(Number(HSL.h) >= 300)))||
                <h1>please enter a valid skin tone</h1>}
        </div>
    )}


export default Recommandation
