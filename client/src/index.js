import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from  'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import {reducers} from './reducers';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// import store from './reducers/index';
import store from './redux/store';
// import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// serviceWorker.unregister();

