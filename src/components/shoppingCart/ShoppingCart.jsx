/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useContext, useEffect, useRef, useState } from "react";
import CartItem from "./CartItem.jsx";
import { ShopContext } from "../../contexts/ShopContext.jsx";

/*=====================================================
ShoppingCart
=====================================================*/
const ShoppingCart = () => {
  /*==================================
  Context & states
  ==================================*/
  const {
    setCartIsOpen,
    cartItems,
    cartQuantity,
    setCartQuantity,
    uniqueItems,
    setUniqueItems,
    duplicates,
    setDuplicates,
    cartIsOpen,
    toggleShoppingCart } = useContext(ShopContext);
    
  const [ totalPrice, setTotalPrice ] = useState(0);
    

  /*==================================
  Ref
  ==================================*/
  const ref = useRef(null);

  /*==================================
  UseEffects
  ==================================*/
  // Clicking outside the shopping cart closes it
  useEffect(() => {
    const handleClickOutside = (event) => {  
      if(!ref.current.contains(event.target)) {
        setCartIsOpen(false)
      }
    }

    window.addEventListener("click", handleClickOutside)

    // remove onclick
    return () => window.removeEventListener("click", handleClickOutside)
  }, []);
    
  // Update the cart every time new items are added to cart cartItems
  useEffect(() => {
    // Reduce the cartItems to only its unique items [9]
    const unique = 
      cartItems.reduce((acc, x) =>
      acc.concat(acc.find(y => y.name === x.name) ? [] : [x])
      , []);

    setUniqueItems(unique);

  
    // Count duplicate items [10]
    const counts = {};
    cartItems.forEach( (x) => {
      counts[x.name] = (counts[x.name] || 0) + 1
    });
    setDuplicates(counts);

    // The total of cart items is the same as the array's length
    setCartQuantity(cartItems.length);

    // Calculating the total price, using reduce on an array with object [11]
    setTotalPrice(
      cartItems.reduce(
        (accumulator, object) => {
          return accumulator + object.price}, 0
      )
    );

  },[cartItems]);

  /*==================================
  Cart elements
  ==================================*/
  // map over unique items array
  const cartElements = uniqueItems.map(( item, index) => {
    // Check for duplicates.
    // If no duplicates are found, set the item quantity to 1.
    // If duplicates are found, set the item quantity to the number
    // of duplicates.
    let itemQuantity = 
      duplicates === 0 ? 1 : Object.values(duplicates)[index];
    return (
      <CartItem 
        item={item}
        key={index} 
        itemQuantity ={itemQuantity}
      />
    );
  });

  /*==================================
  Functions
  ==================================*/
  function handleClick() {
    alert("If this site was real, you would have been redirected to the checkout page")
  }
  
  /*==================================
  JSX
  ==================================*/
  return (
    <div ref={ref} className={`shopping-cart ${cartIsOpen ? "" : "hidden"}`}>
      <div className="shopping-cart__header ">
        <h3>Shopping Cart </h3>
        <button className="btn btn--close" onClick={toggleShoppingCart}>
          X
        </button>
      </div>

      <div className="shopping-cart__items">
        { cartQuantity === 0 && 
          <>
            <img className="cart-item__empty-cart-image" src="/src/backend/media/images/copy/sad_icon_1-removebg.png" alt="Sad arctic cartoon fox"/> 
            <p className="cart-item__empty-cart-text">
              Your cart is empty
            </p> 
          </>
        }
        { cartQuantity > 0 && cartElements }
      </div>

      <div className="shopping-cart__summary">
        <span className="shopping-cart__total">Total: </span>
        <span className="shopping-cart__sum">{ totalPrice } kr</span>
        <button 
          className="shopping-cart__order btn btn--order" 
          onClick={handleClick}
        >
          To Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;