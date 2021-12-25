import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Route/App.js';
import {BrowserRouter} from 'react-router-dom'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthContextProvider from './Context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
     <AuthContextProvider>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
