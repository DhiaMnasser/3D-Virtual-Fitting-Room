import React, { useState, useEffect } from 'react'
import {faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import './product.css'
import { deleteProduct } from '../../../redux/slices/products'
import { useDispatch } from 'react-redux';
import { addItemToCart, getCurrentBasket } from '../../../redux/slices/orders';

function Home(props) {

    return (
        <p>Home</p>
    )
}

export default Home