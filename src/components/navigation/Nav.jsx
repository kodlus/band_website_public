/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

/*=====================================================
Nav
=====================================================*/
const Nav = () => {
  /*=============================
  Variables
  ==============================*/
  // For matching URL paths and link paths
  const path = useLocation().pathname.slice(1);

  const links = [
    {
      title: "Tour Dates",
      path: "tour-dates"
     },
    {
      title: "Blog",
      path: "blog"
     },
     {
      title: "About",
      path: "about"
     },
     {
      title: "Contact",
      path: "contact"
     },
     
     {
      title: "Shop",
      path: "shop"
     }
  ];

/*=============================
Link elements
==============================*/
const linkElements = links.map((link, index) => {
  return (
    <li key={index} className=' list--reset'>
      <NavLink 
        to={link.path} 
        className={`
            link--reset link link--nav 
            ${link.path === path ? "link--active" : ""}
          `}
      >
        {link.title}
      </NavLink>
    </li>
    );
  });

  /*=============================
  JSX
  ==============================*/
  return (
    <nav className='nav'>
      <ul className='nav__list'>
        { linkElements }
      </ul>
    </nav>
  );
};

export default Nav;