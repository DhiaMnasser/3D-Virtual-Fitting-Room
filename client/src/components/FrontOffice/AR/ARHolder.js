import React from 'react'
import AR from './AR'
import './ARHolder.css'
import shirt from "./models/shirt1.png";
import sleeve from "./models/sleeve1.png";
import sleeve2 from "./models/sleeve2.png";
import jean from "./models/jean.png";
import upperR from "./models/upperRightLeg.png";
import lowerR from "./models/lowerRightLeg.png";
import upperL from "./models/upperLeftLeg.png";
import lowerL from "./models/lowerLeftLeg.png";
function ARHolder() {

    return (
       <div className="milk"> <AR rh={sleeve2} lh={sleeve} body={shirt} hip={jean} ull={upperL} lll={lowerL} url={upperR} lrl={lowerR}></AR></div>
    )
}

export default ARHolder
