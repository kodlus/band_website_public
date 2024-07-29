/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../contexts/ShopContext";
import { TfiTrash } from "react-icons/tfi";
import useWindowDimensions from "../../customHooks/useWindowDimensions";

/*=====================================================
CartItem
=====================================================*/
const CartItem = ({ item, itemQuantity }) => {
  /*==================================
  Context
  ==================================*/
  const { addToCart, deleteFromCart, subtractFromCart } =
    useContext(ShopContext);

  const {width} = useWindowDimensions();

  /*==================================
  Functions
  ==================================*/
  function handleChange(event, item) {
    // Values from input:number are strings,
    // therefore, they must be converted to integers
    // before they can be used for calculations.
    
    // The change in value happens before itemQuantity is updated,
    // that is why the conditionals are written the way they are.
    if (parseInt(event.target.value) === itemQuantity + 1) {
      addToCart(item);
    }

    if (parseInt(event.target.value) === itemQuantity - 1) {
      subtractFromCart(item);
    }
  }

  /*==================================
  JSX
  ==================================*/
  return (
    <div className="cart-item">
      <img src={item.img_url} alt={item.alt} className="cart-item__img" />
      
      <div className="cart-item__details">
        <Link to={`/shop/product/${item.id}`} className="cart-item__link">
          {item.name}
        </Link>

        <span className="cart-item__price">{item.price} kr</span>

        <button
          className="cart-item__btn cart-item__btn--delete"
          onClick={() => deleteFromCart(item)}
        >
         <TfiTrash />
          
        </button>

        {/* Item quantity */}
        {/* Regular view */}
        {width >= 1200 ? (
          <input
            type="number"
            className="cart-item__quantity"
            value={itemQuantity}
            onChange={(event) => handleChange(event, item)}
          />

        ) : (
          /* Tablet/Mobile view */
          <div className="cart-item__quantity--mobile"> 
            <div className="quantity">
              {itemQuantity}
            </div>
            <button 
              className="cart-item__btn cart-item__add" 
              onClick={()=>addToCart(item)}
            >
             +
            </button>

            <button 
              className="cart-item__btn cart-item__subtract" 
              onClick={()=> subtractFromCart(item)}
            >
              -
            </button>
          </div>
        )
      }


      </div>
    </div>
  );
};

export default CartItem;
