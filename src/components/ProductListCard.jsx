/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React from "react";

/*=====================================================
ProductListCard
(Used in the AdminMerchandisePage.jsx)
=====================================================*/
const ProductListCard = ({ data }) => {
  return (
    <div className='product-list-card'>
      <div className="product-list-card__header">
        <h3>{data?.name}</h3>
        {/* Optional chaining as debug: stock property has not yet been added to the server */}
        <p>Number in stock: {data?.stock}</p>
      </div>

      <div className="product-list-card__info">
        <h4>Description</h4>
        <p>{data?.desc}</p>
      </div>

      <div className="product-list-card__info">
        <h4>Short description</h4>
        <p>{data?.short_desc}</p>
      </div>

      <div className="product-list-card__info">
        <h4>Additional information</h4>
        <p>{data?.additional_info}</p>
      </div>

      <div className="product-list-card__info">
        <h4 className="center">Preview</h4>
        <img src={data?.img_url} alt={data?.alt} className="product-list-card__img"/>
      </div>

      <div className="product-list-card__options">
        <button className="btn">Delete</button>
        <button className="btn">Update</button>
      </div>
    </div>
  );
};

export default ProductListCard;