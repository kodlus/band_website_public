/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext.jsx";

/*=====================================================
ProductCard
=====================================================*/
const ProductCard = ({ 
  product_id, 
  searchParams, 
  img, 
  alt, 
  name, 
  desc, 
  price, 
  item,
  stock }) => {
  /*=============================
  Context
  ==============================*/
  const { addToCart } = useContext(ShopContext);

  /*=============================
  JSX
  ==============================*/
  return (
    <div 
      className={`product-card ${stock > 0 && !undefined ? "" : "sold-out"}`}
    >
      <Link 
        className="product-card__link"
        to={`/shop/product/${product_id}`}
        // Pass searchParams data (if it exists) to the next route
        state={{ search: `${searchParams?.toString()}` }}
      >
        <img src={img} alt={alt} className="product-card__img"/>
      </Link>

      <div className="product-card__details">
        {stock === 0 && 
            <span className="product-card__img-banner">Sold out</span>
          }
        
        <h3 /* Change font-size if the title is longer than 15 characters */
          className={`product-card__title ${name.length > 15 ? "shorten" : ""}`}
        >
          {name}
        </h3>
        
        <p 
          className={`product-card__desc ${desc.length > 21 ? "shorten" : ""}`}
        >
          {desc}
        </p>
        
        <span className="product-card__price">Kr {price}</span>
      
              {/* TODO: Add aria-label */}
        <button 
          className="btn product-card__btn" 
          onClick={() => addToCart(item)}
          disabled={stock > 0 && !undefined ? false: true}
        >
          Add
        </button>
      
      </div>
    </div>
  );
};

export default ProductCard;