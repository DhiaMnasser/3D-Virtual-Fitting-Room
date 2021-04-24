import React, { useEffect, useState } from 'react'
import { prominent } from 'color.js'
import shirt from "./shirt2.png"
import FileBase from "react-file-base64";
import empty from "./Empty.png"
import axios from 'axios';
import "./Recommandation.css"
function Recommandation() {
    
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
                <div className="circle" style={{backgroundColor: "#ED207B" }}></div> pink
                <div className="circle" style={{backgroundColor: "#FFFFFF"}}></div> white
                <div className="circle" style={{backgroundColor: "#C7AB86" }}></div>khaki
                <div className="circle" style={{backgroundColor: "#25aae2" }}></div>baby blue
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
                <div className="circle" style={{backgroundColor: "#901823" }}></div> burgundy
                <div className="circle" style={{backgroundColor: "#2a3a96"}}></div> royal blue
                <div className="circle" style={{backgroundColor: "#262262" }}></div>navy
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
                <div className="circle" style={{backgroundColor: "#623714" }}></div> brown
                <div className="circle" style={{backgroundColor: "#dde2a8"}}></div> beige
                <div className="circle" style={{backgroundColor: "#d8eee2" }}></div>pastel
                <div className="circle" style={{backgroundColor: "#2e3094" }}></div>bald blue
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
