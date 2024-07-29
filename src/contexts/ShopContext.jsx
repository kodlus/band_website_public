/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
/*=====================================================
Import
=====================================================*/
import React, { createContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

/*=====================================================
ShopContext & ShopContextProvider
=====================================================*/
/*==================================
Initialize ShopContext
==================================*/
export const ShopContext = createContext(null);

/*==================================
ShopContextProvider
==================================*/
function ShopContextProvider({ children }) {
  /*=======================
  States
  =======================*/
  const [cartItems, setCartItems] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [uniqueItems, setUniqueItems] = useState([]);
  const [duplicates, setDuplicates] = useState({});
  const [cartIsOpen, setCartIsOpen] = useState(false);

  /*=======================
  location
  =======================*/
  const location = useLocation();

  /*=======================
  Functions
  =======================*/
  function addToCart(item) {
    let itemsArray = [];
    
    // Check if the item is an array or an object in an array
    if(Array.isArray(item)) {
      itemsArray = item;
    } else {
      itemsArray.push(item);
    }

    // Every new item gets an unique ID,
    // as a reference if the user wants to delete an item from the 
    // shopping cart [15]
    const newItems = itemsArray.map(item => {
      const newId =uuidv4();
      const newItem = {...item, unique_id: newId};
      return newItem
    });

    // Creates a shallow copy of cartItems,
    // which gets populated with the newest items
    let newCart = [...cartItems];
    for(let item of newItems) {
      newCart.push(item)
    }

    // Sorting the array to prevent the cartItems from jumping
    // if duplicates of an item have different positions in the array
    setCartItems(newCart.sort((a, b) => a.name.localeCompare(b.name)));
  }

  function subtractFromCart(item) {
    setCartItems(prev => 
      prev.filter(x => {
        return x.unique_id !== item.unique_id;})
        .sort((a, b) => a.name.localeCompare(b.name)));
  }

  // [15]
  function deleteFromCart(item) {
    setCartItems(cartItems.filter(x => x.name !== item.name));
  }

  function toggleShoppingCart(event) { 
    
    event.stopPropagation();
    setCartIsOpen(prev => !prev);
    
  }


  /*=======================
  Exports
  =======================*/
  const contextValue = { 
    cartItems,
    setCartItems, 
    cartQuantity,
    setCartQuantity,
    uniqueItems,
    setUniqueItems,
    addToCart, 
    subtractFromCart,
    deleteFromCart,
    duplicates,
    setDuplicates, 
    cartIsOpen,
    setCartIsOpen,
    toggleShoppingCart,
    location
  }

  /*=======================
  JSX
  =======================*/
  return(
    <ShopContext.Provider value ={ contextValue }> 
      { children }
    </ShopContext.Provider>
  )
}

export default ShopContextProvider;
