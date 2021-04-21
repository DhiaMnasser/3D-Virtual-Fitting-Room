import React, { useEffect, useState } from 'react'
import Product from "../Product/Product";
import './shop.css'
import {filterProducts,searchProducts,filterProductsBySize, addProduct,get9Products} from "../../../redux/slices/products"
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik';
import { Checkbox } from '@material-ui/core';
import Comparateur from '../../Comparateur/Comparateur';
import Stripe from '../../Stripe/Stripe';
import Weather from '../../Extras/Geo/Weather';






function Shop(props) {
  
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
   const [taille, setTaille] = useState(["XXS","XS","XS-S","S","M","M-L","L","XL"])

   const stormik = useFormik({
       initialValues: {
      tailles: localStorage.getItem('filter').split(",") ,
    },
    onSubmit: async (values) => {
       dispatch(filterProductsBySize(values))
    }
  })
  
let table=[]
  const handleChange=(event)=>{
      console.log(event.target.checked)
      if(event.target.checked){
        
 stormik.setFieldValue('tailles',([...stormik.values.tailles,event.target.value]));
 table = stormik.values.tailles
 console.log(event.target.value)
 if(table.indexOf(event.target.value)===-1){
 table.push(event.target.value)
localStorage.setItem('filter',table)
 dispatch(get9Products({page: localStorage.getItem('page'),filter:localStorage.getItem('filter')}))
console.log({page: localStorage.getItem('page'),filter:localStorage.getItem('filter')})
 console.log(stormik.values.tailles)}}
      else{
            var array = [...stormik.values.tailles]; // make a separate copy of the array
  var index = array.indexOf(event.target.value)
  if (index !== -1) {
    array.splice(index, 1);
stormik.setFieldValue('tailles',array)
  
 console.log(array)
    localStorage.setItem('filter',array)
    console.log({page: localStorage.getItem('page'),filter:localStorage.getItem('filter')})
 dispatch(get9Products({page: localStorage.getItem('page'),filter:localStorage.getItem('filter')}))
      }
     
  }}

    return (
        
        <div>
<Stripe name="yoyo" price={10}></Stripe>
    <section className="shop spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-3">
                    <div className="shop__sidebar">
                        <div className="sidebar__categories">
                            <div className="section-title">
                                <h4>Categories</h4>
                            </div>
                            <div className="categories__accordion">
                                <div className="accordion" id="accordionExample">
                                    <div className="card">
                                        
                                        <div on id="collapseFour" className="collapse show" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <ul>
                                                    {categories.map((cat)=>{return <li key={cat._id}><a key={cat._id}onClick={()=>{ dispatch(get9Products({page: localStorage.getItem('page'),filter:localStorage.getItem('filter'),category:cat.categoryName}))}}>{cat.categoryName}</a></li>})}
                                   
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="sidebar__filter">
                            <div className="section-title">
                                <h4>Shop by price</h4>
                            </div>
                            <div className="filter-range-wrap">
                                <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                                data-min="33" data-max="99"></div>
                                <div className="range-slider">
                                    <div className="price-input">
                                        <p>Price:</p>
                                        <input type="text" id="minamount"/>
                                        <input type="text" id="maxamount"/>
                                    </div>
                                </div>
                            </div>
                            <a href="#">Filter</a>
                        </div>
                        <div className="sidebar__sizes">
                            <div className="section-title">
                                <h4>Shop by size</h4>
                            </div>

                            <div className="size__list">
                                
                             
                             {sizes.map((size,index)=>{return<> 
                             <Checkbox key={index}
                              onChange={(event)=>handleChange(event)} 
                              checked={stormik.values.tailles.includes(size)} value={size} on="true"></Checkbox>{size}</>})}
                            </div>
                        </div>
                        <button class="btn" onClick={Weather}>Weather</button>
                    </div>
                </div>

                <div className="col-lg-9 col-md-9">
                
                <div>
                <form onSubmit={formik.handleSubmit }>
              
              <input
                name="search"
                type="text"
                placeholder="search..."
                value={formik.values.search}
                onChange={formik.handleChange}
              />

            <button  type="submit" >
              search
              </button>

          </form> 
                </div>
                     <br/>
                    <div className="row">
                            {products.map((product)=>{ 
           return<Product key={product._id} product={product} class="col-lg-4 col-md-4 col-sm-6 mix cosmetic" stars="5"/> 

        })}
                        <div className="col-lg-12 text-center">
                            <div className="pagination__option">
                               { Array.from({length: pages}, (_, i) => i + 1).map((page)=>{return<a className={page===localStorage.getItem('page')?'selected':'pagination__option'}  onClick={()=>{localStorage.setItem('page', page); dispatch(get9Products({page: localStorage.getItem('page'),filter:localStorage.getItem('filter')}))}}
                               key={page}>{page}</a>})}
                             current page: {localStorage.getItem('page')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </div>
    )
}

export default Shop
