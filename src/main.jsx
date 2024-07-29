/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*=====================================================
Import
=====================================================*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style.scss';
import {BrowserRouter} from "react-router-dom";
import ShopContextProvider from './contexts/ShopContext.jsx';
import ScrollToTop from './customHooks/ScrollToTop.jsx';
import { makeServer } from "./backend/server.js";
import { AuthProvider } from './contexts/AuthProvider.jsx';


if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development"})
}

/*=====================================================
Main
=====================================================*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <ScrollToTop />
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
