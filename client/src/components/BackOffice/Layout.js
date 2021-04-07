import React, { Component, Suspense, useEffect, useState } from 'react';
import Leftside from './Leftside/Leftside';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import './Layout.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getOrders } from '../../redux/slices/orders';
import { useDispatch, useSelector } from "react-redux";

export default ({children}) => {

const dispatch  = useDispatch();
  useEffect(() => {
    dispatch(getOrders())

  }, [dispatch])
  console.log('render Main Admin')

  return (
    <div id="page-top">
      <div id="wrapper">
          <Leftside/>
          <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
          <Header/>
          
          {children}
          </div>
          <Footer/>
          </div>
      </div>
    </div>
  )
}