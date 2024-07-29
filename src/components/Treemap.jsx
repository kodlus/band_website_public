/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, {useEffect, useMemo, useState} from "react";
import * as d3 from "d3";

/*=====================================================
Treemap [4] (read for comprehensive explanation)
=====================================================*/
// Filtering options
const options = [
  {value: "high-to-low", text: "High to low"},
  {value: "low-to-high", text: "Low to high"},
];

const Treemap = ({dataSet, width, height }) => {
  /*=============================
  States & useEffect
  ==============================*/
  const [data, setData] = useState({});
  const [selected, setSelected] = useState("");
  const [leafText, setLeafText] = useState("");
  const [leafValue, setLeafValue] = useState(0);

  // Arrange the data highToLow on mount
  useEffect(() => {
    setData(highToLow(dataSet));
  }, [])

  // Rearrange the data when filtering
  useEffect(() => {
    if (selected === "low-to-high") {
      setData(lowToHigh(dataSet))
    } else if (selected === "high-to-low") {
      setData(highToLow(dataSet)); 
    }
  }, [selected])
  

  /*=============================
  Functions
  ==============================*/
  // For Filtering the data set
  function highToLow(data) {
    const highToLow = data.children.sort(function(a, b){return b.value-a.value});
    
    const treeMapDataHighToLow = {
      ...data,
      children: highToLow,
    }

    return treeMapDataHighToLow
  }

  // For Filtering the data set
  function lowToHigh(data) {
    const lowToHigh = data.children.sort(function(a, b){return a.value-b.value});

    const treeMapDatalowToHigh = {
      ...data,
      children: lowToHigh,
    }

    return treeMapDatalowToHigh
  }
  
  function handleChange(event) {
    setSelected(event.target.value);
  }

  function showLeafData(text, value) {
    setLeafText(text);
    setLeafValue(value)

    if(text === leafText) {
      setLeafText("");
      setLeafValue(0);
    }
  }

  /*=============================
  Creating the tree map
  ==============================*/
  const hierarchy = useMemo(() => {
    return d3.hierarchy(data).sum((d) => d.value);
  }, [data]);

  const root = useMemo(() => {
    const treeGenerator = d3.treemap().size([width, height]).padding(2);
    return treeGenerator(hierarchy);
  }, [hierarchy, width, height]);

  const allShapes = root.leaves().map((leaf, index) => {
    return (
      <g 
        key={index} 
        onClick={()=> showLeafData(leaf.data.name, leaf.data.value)} 


        className="leaf">
        
        {/* Shape */}
        <rect
          x={leaf.x0}
          y={leaf.y0}
          width={leaf.x1 - leaf.x0}
          height={leaf.y1 - leaf.y0}
          stroke="transparent"
          fill= {leafText === leaf.data.name ? "#000000": "#69b3a2"}
          //className={"opacity-80 hover:opacity-100"}
        />
        
        {/* Name */}
        <text
          x={leaf.x0 + 5}
          y={leaf.y0 + 15}
          fontSize={12}
          textAnchor="start"
          alignmentBaseline="hanging"
          fill="white"
          className="font-bold"
        >
          {leaf.data.name}
        </text>
        
        {/* Numbers */}
        <text
          x={leaf.x0 + 5}
          y={leaf.y0 + 28}
          fontSize={12}
          textAnchor="start"
          alignmentBaseline="hanging"
          fill="white"
          className="font-light"
        >
          {leaf.data.value}
        </text>
      </g>
    );
  });



  /*=============================
  JSX
  ==============================*/
  return (
    <div className="treemap">
      <div className="treemap__header">
        {/* The filter */}
        <select onChange={handleChange} >  
          {options.map((option, index) => {
            return(
            <option key={index} value={option?.value}>
              {option.text}
            </option>)
          })}
        </select>
        
        {/* The leaf name */}
        <div>
          { leafText && <p>{leafText}: {leafValue}</p> }
        </div>
      </div>
      
      {/* The treemap */}
      <svg width={width} height={height} className="treemap__content">
        {allShapes}
      </svg>
    </div>
  );
};

export default Treemap;