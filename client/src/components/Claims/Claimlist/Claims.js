import React from "react";
// import Product from "../Product/Product";
import { useSelector } from "react-redux";
import { fa, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Claims = () => {

  const claims = useSelector(state => state.claims.claims);

  console.log(claims);

  return (
    <>
      <h1>Claims list</h1>

      <div className="container justify-content-md-center">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop__cart__table">
              <table>
                <thead>
                  <tr>
                    <th>Message</th>
                    <th>Creator</th>
                    
                    <th></th>
                  </tr>
                </thead>
                <tbody>

                {claims.map((claims)=>(
          

        
                  <tr>
                    <td className="cart__product__item">
                      
                      <div className="cart__product__item__title">
                        <h6>{claims.creator}</h6>
                        
                      </div>
                      
                    </td>
               <td> <h6>{claims.message}</h6> </td>

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

export default Claims;
