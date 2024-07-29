/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from 'react';
import ProductListCard from '../../components/ProductListCard';
import Sidebar from '../../components/Sidebar';
import { useOutletContext } from 'react-router-dom';
import { getAllProducts } from '../../API/api';

/*=====================================================
AdminMerchandisePage
=====================================================*/
const AdminMerchandisePage = () => {
  /*===========================================
  States 
  ============================================*/
  const [merchandise, setMerchandise] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading] = useOutletContext();

  /*===========================================
  Loading merchandise
  ============================================*/
  useEffect(()=> {
    loadMerchandise();
  }, []);

 async function loadMerchandise() {
    isLoading(true);

    try {
      const data = await getAllProducts();
      setMerchandise(data);
    } catch (error) {
      console.log(error)
    } finally {
      isLoading(false);
    }
  }

  /*===========================================
  Register merch
  ============================================*/
  //TODO: Make this work
  function registerMerch() {
    alert("If I had spent more time on this project, which has already grown beyond my imagination, you would have been redirected to another page")
  }

  /*===========================================
  Merchandise elements
  ============================================*/
  const merchandiseElements = merchandise?.map((merch, index) => {
    return (
      <ProductListCard data={merch} key={index}/>
    );
  });

  /*===========================================
  JSX
  ============================================*/
  return (
    <section className='admin-merchandise-page'>
      <Sidebar 
        btnAction={registerMerch}
        btnText={"Register merch"}
        additionalClassNames = {"sidebar--small"}
      />

      <div className="merchandise__products">
        {merchandiseElements}
      </div>
    </section>
  );
};

export default AdminMerchandisePage;