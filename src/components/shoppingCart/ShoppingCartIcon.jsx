/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useContext } from 'react';
import { ShopContext } from '../../contexts/ShopContext.jsx';
import { MdOutlineShoppingCart } from "react-icons/md";

/*=====================================================
ShoppingCartIcon
=====================================================*/
const ShoppingCartIcon = () => {
  /*=============================
  Context
  ==============================*/
  const { toggleShoppingCart, cartQuantity } = useContext(ShopContext);
  
  /*=============================
  JSX
  ==============================*/
  return (
    /* TODO: add aria-label */
    <div 
      className='shopping-cart-icon' 
      onClick={toggleShoppingCart} tabIndex={0}
    >
      <MdOutlineShoppingCart className='icon icon--set'/>
      <span className='shopping-cart-icon__indicator'>{ cartQuantity }</span>
    </div>
  );
};

export default ShoppingCartIcon;