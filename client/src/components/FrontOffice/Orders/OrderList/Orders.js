import React, { useState } from "react";
// import Product from "../Product/Product";
import { useSelector, useDispatch } from "react-redux";
import { fa, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateOrder } from "../../../../redux/slices/orders";

import { Link } from 'react-router-dom';

const Orders = () => {
  // const [currOrder, setCurrOrder] = useState({});
  const orders = useSelector(state =>
     
      state.orders.orders.filter(order => !order.isValid)
    
     );
  const dispatch = useDispatch();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("profile")).result
  );
  console.log("orders");
  console.log(orders);

  const validateOrder = order => {
    const currOrder = JSON.parse(JSON.stringify(order));

    try {
      //   product.stockQuantity++;
      console.log("currOrder" + JSON.stringify(currOrder));
      // const indexOrder = orders.findIndex(o => o._id === order._id);

      currOrder.isShipped = true;
      // currOrder.totalPrice = currOrder.totalPrice + product.price;
      // setCurrOrder(orderList);
      dispatch(updateOrder(currOrder?._id, currOrder));

      // dispatch(updateOrder(currOrder._id, currOrder));
    } catch (error) {
      console.log(error);
    }
  };
  const rejectOrder = order => {
    const currOrder = JSON.parse(JSON.stringify(order));

    try {
      //   product.stockQuantity++;
      console.log("currOrder" + JSON.stringify(currOrder));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Orders list</h1>

      <div className="container justify-content-md-center">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop__cart__table">
              <table>
                <thead>
                  <tr>
                    <th>Ref</th>
                    <th>Client</th>
                    {/* <th>isValid</th> */}
                    <th>State</th>
                    <th>totalPrice</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {orders?.map(order => (
                    <tr>
                      <td>
                      
                      <Link
              to={{
                pathname: "/order/" + order._id,
                order: order
              }}

            >
            {order.ref}

            </Link>
                      </td>
                      <td className="cart__price">{order.clientName} </td>
                      {/* <td className="cart__price">{order.dateShipped} </td> */}
                      <td className="cart__price">
                        {order.isShipped ? "shipped" : "waiting"}{" "}
                      </td>
                      <td className="cart__price">{order.totalPrice} DT</td>
                      {user.role === 1 && (
                        <>
                        <td className="cart__close">
                          <button type="submit" class="site-btn" onClick={() => {
                                validateOrder(order);
                              }}>Validate
                            
                              </button>
                          </td>
                        <td className="cart__close">
                          <button type="submit" class="site-btn" onClick={() => {
                                rejectOrder(order);
                              }}>Reject
                              </button>
                          </td>
                          </>
                        
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
