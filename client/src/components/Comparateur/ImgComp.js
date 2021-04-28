import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './comparateur.css'
import ml5 from 'ml5'
import empty from './Empty.png'
import Comp from './Comp'
import FileBase from "react-file-base64";
function ImgComp() {
const [IMG, setIMG] = useState(empty)
    return (
        <div>
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

           
              </div>
            <Comp img={IMG} ></Comp>
        </div>
    )
}

export default ImgComp
