/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from "react";
import useWindowDimensions from "../customHooks/useWindowDimensions";

/*=====================================================
Sidebar
=====================================================*/
const Sidebar = ({ btnAction, btnText }) => {
  /*=============================
  useWindowDimensions 
  (see customHooks folder)
  ==============================*/
  const { width } = useWindowDimensions();
  
  /*=============================
  JSX
  ==============================*/
  return (
    <div className={`sidebar ${width >= 1325 ? "": "sidebar--small"}`}>
    <button 
      className={`btn btn--rounded`}
      onClick={btnAction}
    >
      {btnText}
    </button>

    <select name="" id="" className="sidebar__filter">
      <option value="">Sort by: Latest</option>
    </select>

    <div className="sidebar__search"> 
      <input type="search" name="" id="" placeholder="Out of order"/>
      <button className="btn btn--rounded">Search</button>
    </div>
  </div>
  );
};

export default Sidebar;