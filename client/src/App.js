import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout  from './components/BackOffice/Layout'  
// import Login from "./Login";
import { HashRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="App">  
      <Layout/>   
     </div> 
  );
}

export default App;
