import React from 'react'
import p1 from './img/product-1.jpg';
import Product from '../../components/product/Product'
import './products.css'
function Products() {
    return (

<section className="product spad">
    <div className="container">
        <div className="row">
            <div className="col-lg-4 col-md-4">
                <div className="section-title">
                    <h4>New product</h4>
                </div>
            </div>
            <div className="col-lg-8 col-md-8">
                <ul className="filter__controls">
                    <li className="active" data-filter="*">All</li>
                    <li data-filter=".women">Women’s</li>
                    <li data-filter=".men">Men’s</li>
                    <li data-filter=".kid">Kid’s</li>
                    <li data-filter=".accessories">Accessories</li>
                    <li data-filter=".cosmetic">Cosmetics</li>
                </ul>
            </div>
        </div>
        <div className="row property__gallery">
          <Product name="shirt" stars="5" img={p1} price="45.2"  class="col-lg-3 col-md-4 col-sm-6 mix cosmetic"></Product>
          <Product name="shirt" stars="5" img={p1} price="45.2" class="col-lg-3 col-md-4 col-sm-6 mix cosmetic"></Product>
          <Product name="shirt" stars="5" img={p1} price="45.2" class="col-lg-3 col-md-4 col-sm-6 mix cosmetic"></Product>
            </div>
        </div>
 
</section>

     
    )
}

export default Products
