/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useWindowDimensions from '../../customHooks/useWindowDimensions';
import { toast } from 'react-toastify';

/*=====================================================
SubNav
(Used in AdminLayout & UserLayout)
=====================================================*/
const SubNav = ({ linkPaths }) => {
  /*=============================
  States and variables
  ==============================*/  
  // An attempt to keep the navLinks' className less cluttered,
  // since there is some conditional rendering with the 
  // navLinkElements' class names going on
  const classNames = ["link", "link--sub-nav", "link--reset"];
  const isLoggedIn = localStorage.getItem("loggedin");
  const [link, setLink] = useState("");
  const { width } = useWindowDimensions();

  /*=============================
  Navigation
  ==============================*/  
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${link}`)
  }, [link]);

  /*=============================
  Logging out user
  ==============================*/
  function logOut() {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    toast.success("Logging out")

    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  /*=============================
  Handle changing page
  ==============================*/
  function handleChange(event) {
    setLink(event.target.value);
  }

  /*=============================
  NavLink elements
  ==============================*/
  const navLinkElements = linkPaths.map((link, index) => {
    // Checks if the link should have an end prop.
    // For more information, read:
    // https://reactrouter.com/en/main/components/nav-link
    if(link.end) {
      return (
          <NavLink 
            key={index}
            to={link.path}
            end
            className={({isActive}) => isActive ? `link--active-sub-nav ${classNames.join(" ")}`: classNames.join(" ")}
          >
            {link.name}
          </NavLink>
      )
    } else {
      return (
          <NavLink 
            key={index}
            to={link.path}
            className={({isActive}) => isActive ? `link--active-sub-nav ${classNames.join(" ")}`: classNames.join(" ")}
          >
            {link.name}
          </NavLink>
      );
    }
  });

  const navLinkElementsMobile = linkPaths.map((link, index) => {
    return (
      <option key={index} value={link.path} name={link.name}>
        {link.name}
      </option>
    );
  });

  /*=============================
  JSX
  ==============================*/
  return (
    <>
      {width > 600 ? (
        <nav className="sub-nav">
          {navLinkElements}
          {isLoggedIn && 
          <button className="btn btn--rounded btn--sub-nav" onClick={logOut}>
            Log out
          </button>
          }
        </nav> 
        ) : (
          <nav className="sub-nav sub-nav--mobile" >
            <select name="" id="" onChange={handleChange}>
              {navLinkElementsMobile}
            </select>

          {isLoggedIn && 
          <button className="btn btn--rounded btn--sub-nav" onClick={logOut}>
            Log out
          </button>
          }
          </nav> 
        )}
    </>
  );
};

export default SubNav;