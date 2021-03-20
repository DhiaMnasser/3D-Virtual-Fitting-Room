import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout  from './components/BackOffice/Layout'  
// import Login from "./Login";
import { HashRouter, Route, Switch,BrowserRouter, } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Home from './components/BackOffice/Home';


    const App = () => (
      <BrowserRouter>
    
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
     </BrowserRouter>
  );


export default App;
