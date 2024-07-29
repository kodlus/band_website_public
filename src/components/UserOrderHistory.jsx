/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from "react";
//import { getUser } from '../backend/api.js';
import { useParams } from 'react-router-dom';
import { getOneUser } from "../API/api";

/*=====================================================
UserOrderHistory
=====================================================*/
const UserOrderHistory = ({ setIsLoading }) => {
    /*=============================
    States
    ==============================*/
    const [user, setUser] = useState({});
    const [orderHistory, setOrderHistory] = useState([]);
    const [error, setError] = useState(false);
    const params = useParams();
    const id = params.id;
    
    /*=============================
    Load user data
    ==============================*/
    useEffect(() => {
      loadUser();
    }, []);

    async function loadUser() {
      setIsLoading(true);
      try {
        const user = await getOneUser(id);
        setOrderHistory(user?.data.order_history);
      } catch (error){
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

  /*=============================
  Order elements
  ==============================*/
  // The orderHistory data is fairly nested
  const orderHistoryElements =  orderHistory?.map((order, index) => {
    // So, the first step is to access the array of products for each order
    const orderedProductsArray = order.orders;

    // The second step is to return a td-element with the ordered products in it
    const orderedProducts = orderedProductsArray.map((order, index) => {
        return (
          <p key={index}>
            {order.quantity}x {order.product},
            
            <br />
            
            á {order.price} SEK
          </p>
        )
      });

      // The third step is to calculate the total cost
      let total = 0;
      for (let product of order.orders) {
        total += product.price * product.quantity
      }
      
      // The final step is to return everything as a td-element
      return (
        <tr key={index}>
          <td>{orderedProducts}</td>
          <td>{total}</td>
          <td>{order.order_date}</td>
          <td>{order.order_id}</td>
        </tr>
      );
  });
  
  /*=============================
  JSX
  ==============================*/
  return (
    <section className='user-order-history-page'>
      {orderHistory?.length > 0 ? 
        (
          <table className='user-order-history'>
          <thead>
            <tr>
              <th>Order</th>
              <th>Total (SEK)</th>
              <th>Date </th>
              <th>ID</th>
            </tr>
          </thead>
          
          <tbody>
            {orderHistoryElements}
          </tbody>
  
        </table>
        ): (
          <div>
            <p>Your order history goes here.</p>
          </div>
        )
      }
    </section>
  );
};

export default UserOrderHistory;
