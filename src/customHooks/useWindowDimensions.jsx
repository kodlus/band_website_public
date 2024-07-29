/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from "react";

/*=====================================================
useWindowDimensions [14]
=====================================================*/
/*=============================
Helper function
==============================*/
function getWindowDimensions() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width, 
    height
  };
}

/*=============================
The hook
==============================*/
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions());

    // Keeps track of the current window size on mount and resize
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener("resize", handleResize);
  
      // Clean-up
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return windowDimensions;
}