/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React from 'react';
import UserOrderHistory from '../../components/UserOrderHistory';
import { useOutletContext } from 'react-router-dom';

/*=====================================================
UserOrderHistoryPage [18]
=====================================================*/
const UserOrderHistoryPage = () => {
  /*=============================
  State
  ==============================*/
  const [setIsLoading] = useOutletContext();


  /*=============================
  Data
  ==============================*/
  const mockData = [
  {
    orders: [
      {
        product: "De vilda CD",
        price: 180,
        quantity: 1,
      },
      {
        product: "När världen faller LP",
        price: 250,
        quantity: 1,
      }
    ],
    order_date: "2023-11-28",
    order_id: "#4454218",
  }, 
  {
    orders: [
      {
        product: "Blåräv Patch #1",
        price: 50,
        quantity: 3,
      },
    ],
    order_date: "2023-09-13",
    order_id: "#4253259",
  }
];

  /*=============================
  Order elements
  ==============================*/
  const orderElements = mockData.map((order, index) => {  
    // Get the array of ordered items per order
    const orderIndex = mockData[index].orders

    // If there are more than one item per order,
    // add a br element at the end of the fragment. 
    // If the order only has one item, do not add the br element.
    // This is purely for styling purposes
    const orders = order.orders.map((order, index) => {
      if(index !== orderIndex.length - 1) {
        return  (
          <>
            <p key={index}>
              {order.quantity}x {order.product},
              
              <br />
              
               á {order.price} SEK
            </p>
  
            <br />
          </>
        )
      } else {
        return (
          <>
            <p key={index}>
              {order.quantity}x {order.product},
              
              <br />
              
              á {order.price} SEK
            </p>
          </>
        )}
    });

    let total = 0;
    for (let sum of order.orders) {
      total += sum.price * sum.quantity
    }

    return (
      <tr key={index}>
        <td>{orders}</td>
        <td>{total}</td>
        <td>{order.order_date}</td>
        <td>{order.order_id}</td>
      </tr>
    )
  });

  /*=============================
  JSX
  ==============================*/
  return (
/*     <section className='user-order-history-page'>
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
          {orderElements}
        </tbody>

      </table>
    </section> */
    <UserOrderHistory setIsLoading={setIsLoading}/>
  );
};

export default UserOrderHistoryPage;