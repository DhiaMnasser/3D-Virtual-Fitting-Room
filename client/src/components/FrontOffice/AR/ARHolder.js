import React, { useEffect, useState } from 'react'
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
import empty from "./models/Empty.png"
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/slices/products';
function ARHolder() {
const [update, setUpdate] = useState(false)
const [pull, setPull] = useState({rh:empty,lh:empty,body:empty})
const [pants, setPants] = useState({hip:empty,ull:empty,lll:empty,url:empty,lrl:empty})

const products = useSelector((state) => state.products.products)
const dispatch = useDispatch()

      useEffect(() => {
       
    dispatch(getProducts());
  
  }, [dispatch]);
console.log(products)
    return (
        
       <div className="milk"> 
{update || <AR rh={pull.rh} lh={pull.lh} body={pull.body} hip={pants.hip} ull={pants.ull} lll={pants.lll} url={pants.url} lrl={pants.lrl}></AR>}
{update && <AR rh={pull.rh} lh={pull.lh} body={pull.body} hip={pants.hip} ull={pants.ull} lll={pants.lll} url={pants.url} lrl={pants.lrl}></AR>}
    
       <div>
           <button onClick={()=>{setPull({rh:sleeve2,lh:sleeve,body:shirt});setUpdate(!update)}}>put shirt</button>
           <button onClick={()=>{setPull({rh:empty,lh:empty,body:empty});setUpdate(!update)}}>remove shirt</button>
             <button onClick={()=>{setPants({hip:jean,ull:upperL,lll:lowerL,url:upperR,lrl:lowerR});setUpdate(!update)}}>put pants</button>
           <button onClick={()=>{setPants({hip:empty,ull:empty,lll:empty,url:empty,lrl:empty});setUpdate(!update)}}>remove pants</button>
           {products.map((prod)=>{return   <button onClick={()=>{setPull({rh:prod.image,lh:prod.image,body:prod.image});setUpdate(!update)}}>put product</button>})}
       </div>
       
       </div>
    )
}

export default ARHolder
