/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React from "react";

/*=====================================================
Gallery
=====================================================*/
const Gallery = ({ products }) => {
  return (
    <div className="gallery">
      {products}
    </div>
  );
};

export default Gallery;