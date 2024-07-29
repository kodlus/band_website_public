/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*==============================================================================
Import
==============================================================================*/
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from './navigation/Nav.jsx';
import ShoppingCartIcon from './shoppingCart/ShoppingCartIcon.jsx';
import { FaUser } from "react-icons/fa6";
import { CiMenuBurger } from "react-icons/ci";

/*=====================================================
Gallery
=====================================================*/
const Header = () => {
  /*==================================
  States & ref
  ==================================*/
  // Represents the number of pixels that constitutes a small screen.
  // Is used for checking if the screen is small or not.
  // Cut-off value is based on...
  const smallScreen = 900;
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth >= smallScreen ? false : true);

  // Represents the header's position on the y-axis.
  // Is used for checking if the header should be full size or slim.
  const [y, setY] = useState(
    window.scrollY || document.documentElement.scrollTop);
  
  // Represents the coordinate on the y-axis which determines if the header is 
  // full size or slim.
  let breakPoint = 300;
    
  // The navigation's visibility. On smaller screens the 
  // nav turns into a burger menu.
  const [isNavVisible, setIsNavVisible] = useState(
    window.innerWidth >= smallScreen ? true : false);
  
  // The dropdown menu's visibility status. 
  // It is only relevant if the screen is small.
  const [dropdown, setDropdown] = useState(false);
  
  // Login related variables.
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("loggedin");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  
  let headerRef = useRef();

  /*==================================
  Media queries
  (the reference to this solution 
   is missing)
  ==================================*/
  function handleMediaQueryChange(mediaQuery) {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
      setIsNavVisible(false);
    } else {
      setIsSmallScreen(false);
    }
  }

  useEffect(()=> {
    // Media query matching the corresponding CSS query limit in __header.scss
    const mediaQuery = window.matchMedia(`(max-width: ${smallScreen}px)`);
    mediaQuery.addEventListener("change", () => handleMediaQueryChange(mediaQuery));
    
    // Clean-up
    return () => {
      mediaQuery.removeEventListener("change", ()=> {
        handleMediaQueryChange(mediaQuery);
      });
    }
  }, []);

  /*==================================
  Closing the dropdown
  ==================================*/
  function toggleNav() {
    setIsNavVisible(!isNavVisible);
    setDropdown(!dropdown)
  }

  // Closes dropdown when the user goes to another page
  useEffect(()=> {
    if (smallScreen) {
      setIsNavVisible(false);
    }
  }, [location]);

  // Closes dropdown when the user clicks outside of it
  useEffect(()=> {
    const handler = (event) => {
      if (dropdown && headerRef.current && !headerRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    // Add eventlistener to the DOM
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    // Clean up the event listeners
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler)
    }
  }, [dropdown]);


  /*==================================
  Calculate header's position
  ==================================*/
  // On mount, scroll to the top of the page. Otherwise, update 
  // the header's position on the y-axis.
  function getPosition() {
    // Cross browser compatibility solution because Safari don't support scrollY
    const y = window.scrollY || document.documentElement.scrollTop;
    setY(y);
  }

  // On mount, scroll to the top of the page
  useEffect(()=>{
    getPosition();
  }, []);

  // Keeping track of the header's position
  useEffect(()=> {
    window.addEventListener("scroll", getPosition);
    
    // Clean-up
    return () => {
      document.removeEventListener("resize", getPosition);
    }
  }, [y])

  
  /*==================================
  Redirecting the user
  when clicking on the user icon
  ==================================*/
  function toPath() {
    // If the admin is logged in, redirect to the admin page
    if(isLoggedIn && username === "admin") {
      return "admin";
    } else if (isLoggedIn) {
      // If a user is logged in, redirect to the user page
      return `users/${localStorage?.getItem("id")}`;
    } else {
      // If the user is not logged in, redirect to the login page
      return "login";
    }
  }

  /*==================================
  JSX
  ==================================*/
  return (
    <header 
      className={`header page-padding ${y < breakPoint ? "" : "header--small"}`}  
    > 
      <Link className='logo' to={"/"}>
       <img src='/src/assets/_logo.png' alt='Band logo'/>
        <span className='icon'>Blåräv</span>
      </Link>
      
      {(!isSmallScreen || isNavVisible) && (
        <Nav />
      )}

      {/* TODO: ARIA-label */}
      <button className='icon--burger' onClick={toggleNav}><CiMenuBurger /></button>
        
        <div className="header__user">
          <Link className='link--reset' to={toPath()}>
            {/* Change the icon's color if the user/admin is logged in */}
            <FaUser className={`icon ${isLoggedIn ? "icon--logged-in" : ""}`}/>
          </Link>
          <ShoppingCartIcon />
        </div>
    </header>
  );
};

export default Header;