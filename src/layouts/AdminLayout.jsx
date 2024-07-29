/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SubNav from "../components/navigation/SubNav";
import Preloader from "../components/Preloader";

/*=====================================================
AdminLayout
=====================================================*/
const AdminLayout = () => { 
  /*=============================
  State
  ==============================*/
  const [isLoading, setIsLoading] = useState(false);

  /*=============================
  Link paths
  ==============================*/
  // Regarding the "end" key, read about the end prop:
  // https://reactrouter.com/en/main/components/nav-link
  const linkPaths = [
    {name: "Dashboard", path: ".", end: true},
    {name: "Blog posts", path: "blog-posts", end: false},
    {name: "Merchandise", path: "merchandise", end: false}
  ];
  
  /*=============================
  JSX
  ==============================*/
  return (
    <>
      {isLoading  && <Preloader />}    
      
      <main className="admin-layout site__content page-padding">
        <h1 className="title title--dark title--nmb">Admin</h1>
        
        <SubNav linkPaths={linkPaths} />

        {<Outlet context={[setIsLoading]}/>}
      </main>
    </>
  );
};

export default AdminLayout;