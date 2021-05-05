import React, {useEffect,  useState } from 'react'
import { useSelector } from 'react-redux';
import { usersSlice } from '../../../redux/slices/auth';
import { useDispatch } from "react-redux";
import {filterProducts,get9Products} from "../../../redux/slices/products"
import Product from "../../Products/Product/Product";
import { useFormik } from 'formik';

const ChildComponent = (props) => {



   var shape = localStorage.getItem('myshape');

   const user = JSON.parse(localStorage.getItem('profile'));
   console.log(user?.result?.gender)
   console.log(shape);
   const divStyle = {
    width : "100%",
    
  };
  const mystyle = {
    textAlign: "center",
    marginLeft: '100px',
  };
  const sizes = ["XXS","XS","XS-S","S","M","M-L","L","XL"]
  const products = useSelector((state) => state.products.products)
      const pages = useSelector((state)=>state.products.nbpg)
      const categories = useSelector((state) => state.categories.categories)
     const dispatch = useDispatch()
     if (localStorage.getItem('page')===null) {
        localStorage.setItem('page',1)
     }
     if (localStorage.getItem('filter')===null) {
        localStorage.setItem('filter',sizes)
     }
        var page = {page: localStorage.getItem('page'),filter:localStorage.getItem('filter')}

      useEffect(() => {
       
    dispatch(get9Products(page));
  
  }, [dispatch]);



  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values) => {
        console.log(values)
 dispatch(get9Products({page: localStorage.getItem('page'),filter:localStorage.getItem('filter'),recherche:values.search}))
    }
  });
  console.log("p",products);
  const stylee ={
    marginLeft: '100px',
  }

let styles =[];


if (user?.result?.gender === "F")
{
if ( shape === "inverted triangle" )
   styles= [{category :'tops'} ,{category :'Vlong-sleeved'}, {category :'vertical strips'},{category :'Palazzo pants'},{category :'Dresses–maxi lengths'} ]
else if ( shape === "pear" )
   styles = [{category :'Boatneck tops'}, {category :'tops with horizontal stripes'} ,{category :'off-the-shoulder tops'} , {category :'Dresses: A-Line'} ]

else if (shape ==="Hourglass" )
   styles =[{category :'Wrap tops'},{category :'dresses'},{category :'pencil skirts'},{category :'leggings'}]
   
else if (shape === "rectangle" )
   styles =[{category :'structured clothes'},{category :'round necklines'},{category :'wider necklines'} ,{category :'wrap shirts'} ,{category :'wide troussers'}] 
   console.log(styles);
  }
 else {
   if ( shape === "inverted triangle")

    styles = [{category:'horizontal stripes'}, {category :'slim-fit shirts'},{category :'Slim cotton polo shirt'}, {category :'Regular V-neck T-shirts'},
    {category :'Skinny jeans'},{category :'Trousers with larger seat drop'}]

    else if ( shape ==="rectangle")
    styles =[{category :'Horizontal stripes'}, {category :'Structured tailoring'},{category :'Layered looks'}, {category :'Prints, color pops, and detailing'}]
   
   else if ( shape ==="oval")
   styles =[{category :'trim-fit shirt'}, {category :'henley t shirt'}, {category :'Jeans with wide leg patterns'} , {category :'darker tone tshirt'}]

   else if ( shape === "triangle")

   styles = [{category :'Tailored patterned blazers'},{category :'Vertical stripes'},{category :'Jackets with structured shoulders'}]
   else if ( shape === "pear" )
   styles = [{category :'Boatneck tops'}, {category :'tops with horizontal stripes'} ,{category :'off-the-shoulder tops'} , {category :'Dresses: A-Line'} ]

else if (shape ==="Hourglass" )
   styles =[{category :'Wrap tops'},{category :'dresses'},{category :'pencil skirts'},{category :'leggings'}]
   
   console.log(styles);
   console.log("test" ,);
}

   
   const listItems = styles.map((style) =>
  <li>{style.category}</li> );
  console.log(listItems);
console.log(styles[1].category)
 /* const iterator = styles.values();

  for (const value of iterator) {
    console.log(value)
  }*/
  
    return(
      <div syle={mystyle}>
     
      
<div class="row">


     <div class="col" style={stylee} >
  
     <h1> How To Dress For your Body Shape : </h1>
         
        <br></br>
        <div class="list-group" style = {divStyle}>
  <button type="button" class="list-group-item list-group-item-action active">
    <strong>
  Recommendations for {shape} are : </strong>
  </button>
    <li class="list-group-item">{styles.map(style => (
  <p> <b> {style.category}  </b></p>   ))}  </li>

</div> </div>

<div className="col">

  {products.filter(product =>product.productName=== styles[1].category).map((product )=>{ 
           return<Product key={product._id} product={product} class=".col-6 .col-sm-3" stars="5"/> 

        })}
                        <div className="col-lg-12 text-center">
                            <div className="pagination__option">
                               { Array.from({length: pages}, (_, i) => i + 1).map((page)=>{return<a className={page===localStorage.getItem('page')?'selected':'pagination__option'}  onClick={()=>{localStorage.setItem('page', page); dispatch(get9Products({page: localStorage.getItem('page'),filter:localStorage.getItem('filter')}))}}
                               key={page}>{page}</a>})}
                             current page: {localStorage.getItem('page')}
                            </div>
                        </div>    
                       
     




</div>
<div className="col">

  {products.filter(product =>product.productName=== styles[0].category).map((product )=>{ 
           return<Product key={product._id} product={product} class=".col-6 .col-sm-3" stars="5"/> 

        })}
                            
                       
     




</div>
<div className="col">

  {products.filter(product =>product.productName=== styles[2].category).map((product )=>{ 
           return<Product key={product._id} product={product} class=".col-6 .col-sm-3" stars="5"/> 

        })}
                            
                       
     




</div>
</div>
</div>
    );

    
}


export default ChildComponent;