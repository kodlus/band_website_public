/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ShoppingCart from "../components/shoppingCart/ShoppingCart.jsx";
import Preloader from '../components/Preloader.jsx';
import { ToastContainer } from 'react-toastify';
import AudioPlayer from '../components/audioPlayer/AudioPlayer.jsx';

/*=====================================================
Global Layout
=====================================================*/
const GlobalLayout = ({ children }) => {
  /*=============================
  States
  ==============================*/
  const [isLoading, setIsLoading] = useState(false);
  const [endOfPage, setEndOfPage] = useState(false);

  const { pathname } = useLocation();

  /*=============================
  Detecting if scrolled to end
  of the page (for styling purposes)
  ==============================*/
  useEffect(() => {
    function handleScroll() {
      // [28]
      if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
        setEndOfPage(true);
      } else {
        setEndOfPage(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Removing the audio-player-boost class from elements. It is a fallback solution
  // since setEndOfPage(false) does not always trigger when changing pages,
  // even though going from one page to another causes the window 
  // to scroll to the top.
  // E.g., Going from HomePage to ShopPage does not turn endOfPage false, but 
  // going from ShopPage to HomePage does... 
  useEffect(()=> {
    const boostedFooter = document.querySelectorAll(".audio-player-boost");
    boostedFooter.forEach(element => element.classList.remove("audio-player-boost"))
  }, [pathname]);


  /*=============================
  JSX
  ==============================*/
  return (
    <>
      {isLoading && <Preloader />} 
      
      <ShoppingCart />
      <Header />
      <Outlet context={[setIsLoading]}>
        {children}
      </Outlet>

      <AudioPlayer {...{endOfPage}}/>
      

      <Footer {...{endOfPage}}/>
      {/*Notifications (toasts) can be edited in api.js. */}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
      />
    </>
  );
};

export default GlobalLayout;