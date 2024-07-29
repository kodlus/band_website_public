/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useRef, useState } from "react";
import Treemap from "../../components/Treemap.jsx";
import { useOutletContext } from "react-router-dom";
import { getAllDashboardMetrics } from "../../API/api.js";

/*=====================================================
AdminDashboard
=====================================================*/
const AdminDashboardPage = () => {
  /*=============================
  State
  ==============================*/
  const [metrics, setMetrics] = useState([]);
  const [error, setError] = useState(false);
  const [setIsLoading] = useOutletContext();

  /*=============================
  Load dashboard data
  ==============================*/
  useEffect(() => {
    loadDashboardMetrics();
  }, [])

  async function loadDashboardMetrics() {
    setIsLoading(true);
    try {
      const metrics = await getAllDashboardMetrics();
      setMetrics(metrics.data);
    } catch(error) {
      setError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  /*=============================
  Calculating the visual's
  dimensions
  ==============================*/
  const [visualDimensions, setVisualDimensions] = useState(0);

  // Referencing the visual
  let visualRef = useRef();

  function getVisualDimensions() {
    const width = visualRef.current.offsetWidth;
    const height = visualRef.current.offsetHeight;

    return { width, height }
  }

  useEffect(()=> {
    setVisualDimensions(getVisualDimensions());
  }, [])


console.log(visualDimensions.width)



  useEffect(() => {
    function handleResize() {
      setVisualDimensions(getVisualDimensions())
    }

    window.addEventListener("resize", handleResize);
  
    // Clean-up
    return () => window.removeEventListener("resize", handleResize);
  }, [])


  /*=============================
  Data [4]
  ==============================*/
  const treeMapData = {
    type: 'node',
    name: "boss",
    value: 0,
    children: [
      {type: 'leaf', name:"T-shirts", value: 90},
      {type: 'leaf', name:"CDs", value: 12},
      {type: 'leaf', name:"LPs", value: 34},
      {type: 'leaf', name:"Misc", value: 53},
      {type: 'leaf', name:"Hats", value: 98},
      {type: 'leaf', name:"Prints", value: 22},
      {type: 'leaf', name:"Digital music", value: 12},]
    }

  /*=============================
  Social media metrics elements
  ==============================*/
  const socialMediaMetricsElements = metrics
    .filter(metric => metric.type === "social_media")
    .map((metric, index) => {
      // Get each metric for each social media platform
      const metricValues = metric.values.map((value, index) => {
        return <p key={value.title}>{value.title}: {value.value}{value.prefix}</p>
      });
      
      return (
        <div key={index} className="social-medium">
          <p className="dashboard__data-title">{metric.title}</p>
          {metricValues}
        </div>
      )
    });
/* 
  /*=============================
  Key metrics elements
  ==============================*/
  const keyMetricsElements = metrics
    .filter(metric => metric.type === "key_value")
    .map((metric, index) => {
      // Get each value for each key metric
      const metricValues = metric.values.map((value, index) => {
        return <p key={index}>{value.value}{value.prefix}</p>
      });
      
      return (
        <div key={index} className="key-value">
          <p className="dashboard__data-title">{metric.title}</p>
          {metricValues}
        </div>
      );
    });

  /*=============================
  JSX
  ==============================*/
  return (
    <section className="admin-dashboard-page">  
      children    
      <div className="dashboard">
        <select name="" id="" className="dashboard__filter">
          <option value="this-year" >This year</option>
        </select>
        <div className="social-media">
          {socialMediaMetricsElements}
        </div>

        <div className="key-values">
          {keyMetricsElements}
        </div>

       
        <div className="visual" id="visual" ref={visualRef}>
          <p className="dashboard__data-title">Quantity of Merchandise sold</p>
          <Treemap 
            title={"Quantity of Merchandise sold"} 
            dataSet={treeMapData} 
            height={300} 
            width={visualDimensions.width} 
          />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;