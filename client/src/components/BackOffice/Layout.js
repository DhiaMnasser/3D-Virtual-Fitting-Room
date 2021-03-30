import React, { Component, Suspense } from 'react';
import Leftside from './Leftside/Leftside';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import './Layout.css';
import { Route, Switch, Redirect } from 'react-router-dom';

export default ({children}) => {

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