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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function ARHolder() {
const [update, setUpdate] = useState(false)
const [pull, setPull] = useState({rh:empty,lh:empty,body:empty})
const [pants, setPants] = useState({hip:empty,ull:empty,lll:empty,url:empty,lrl:empty})
  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3
    };
const products = useSelector((state) => state.products.products)
var shirt=products.filter(prod=>prod.categoryId==="T-shirts")
var jean=products.filter(prod=>prod.categoryId==="Jeans")
console.log(jean)
const dispatch = useDispatch()

      useEffect(() => {
       
    dispatch(getProducts());
  
  }, [dispatch]);
console.log(products)
    return (
        <>
       <div className="milk"> 
{update || <AR rh={pull.rh} lh={pull.lh} body={pull.body} hip={pants.hip} ull={pants.ull} lll={pants.lll} url={pants.url} lrl={pants.lrl}></AR>}
{update && <AR rh={pull.rh} lh={pull.lh} body={pull.body} hip={pants.hip} ull={pants.ull} lll={pants.lll} url={pants.url} lrl={pants.lrl}></AR>}
    
      
       
       </div>
        <div>
            <Slider {...settings}>
                  {shirt.map((prod)=>{return<>      
          
        <img key={prod._id} className="image" src={prod.image } alt={prod.productName} onClick={()=>{setPull({rh:prod.arModel[2],lh:prod.arModel[1],body:prod.arModel[0]});setUpdate(!update)}}></img>
          
         </>})}
        </Slider>
        <div className="yo"></div>
          <Slider {...settings}>
                  {jean.map((prod)=>{return<>      
          
        <img key={prod._id} className="image" src={prod.image } alt={prod.productName} onClick={()=>{setPants({hip:prod.arModel[0],ull:prod.arModel[1],lll:prod.arModel[3],url:prod.arModel[2],lrl:prod.arModel[4]});setUpdate(!update)}}></img>
          <div>{prod.name} </div>
         </>})}
        </Slider>
           
            
       </div>
      </> 
    )
}

export default ARHolder
