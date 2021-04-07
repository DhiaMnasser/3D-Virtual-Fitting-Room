import React, {useState} from "react";
// import Product from "../Product/Product";
import { useSelector, useDispatch } from "react-redux";
import { fa, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateOrder } from "../../../../redux/slices/orders";
const Orders = () => {
  // const [currOrder, setCurrOrder] = useState({});
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  const validateOrder = (order) => {
    const currOrder = JSON.parse(JSON.stringify(order));

    try {
      //   product.stockQuantity++;
      console.log('currOrder'+JSON.stringify(currOrder));
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
                    <th>client</th>
                    {/* <th>Date Shipped</th> */}
                    {/* <th>isValid</th> */}
                    <th>State</th>
                    <th>totalPrice</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map(order => (
                    <tr>
                      <td className="cart__price">{order.clientId} </td>
                      {/* <td className="cart__price">{order.dateShipped} </td> */}
                      <td className="cart__price">
                        {order.isShipped ? "shipped" : "waiting"}{" "}
                      </td>
                      <td className="cart__price">{order.totalPrice} DT</td>
                      <td className="cart__close">
                        <span
                          className="icon_close"
                          onClick={() => {
                            validateOrder(order);
                          }}
                        ></span>
                      </td>
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
