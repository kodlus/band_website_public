/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SubNav from "../components/navigation/SubNav.jsx";
import Preloader from "../components/Preloader.jsx";

/*=====================================================
UserLayout
=====================================================*/
const UserLayout = () => {
  /*=============================
  State
  ==============================*/
  const [isLoading, setIsLoading] = useState(false);

  /*=============================
  Link paths
  ==============================*/
  // Regarding the "end" key, read about the end prop for more info:
  // https://reactrouter.com/en/main/components/nav-link
  const linkPaths = [
    {name: `${localStorage.getItem("username")}'s information`, path: ".", end: true},
    {name: "Order History", path: "orders", end: false},
  ];

  /*=============================
  JSX
  ==============================*/
  return (
    <>
      {isLoading && <Preloader />}
      
      <main className="user-layout site__content page-padding">
        <SubNav 
          linkPaths={linkPaths}
        />
        {<Outlet context={[setIsLoading]}/>}
      </main>
    </>
  );
};

export default UserLayout;