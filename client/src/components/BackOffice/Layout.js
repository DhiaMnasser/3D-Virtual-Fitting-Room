import React, { Component, Suspense } from 'react';
import Leftside from './Leftside/Leftside';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import { Route, Switch, Redirect } from 'react-router-dom';

export class Layout extends Component {

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  render() {
    return (
      <div className="App">
        <div id="wrapper">
          <Leftside></Leftside>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header />
              <Home />

            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
};

export default Layout;
