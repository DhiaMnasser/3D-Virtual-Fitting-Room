import React from "react";
// import { textField, Button, Typoghraphy, Paper } from '@material-ui/core';
import { useFormik, Formik } from "formik";
import { Validation } from "./Validations/validation";
import { useDispatch ,useSelector} from "react-redux";
import styled from "styled-components";
import axios from 'axios';

import products from "../../../../redux/slices/products";
import CustomSelect from "./CustomSelect";
import {  createReview } from "../../../../redux/slices/reviews";

const Formrev = (props) => {
  
  const user = JSON.parse(localStorage.getItem('profile'));
  const products = useSelector(state => state.products.products)
const options=products.map((x)=>x={value:x._id, label :x.productName})
const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
     message: "",
     creator_id :user?.result?._id,
     creator :user?.result?.name,
     productId: props.product._id,
   





    },
    validationSchema: Validation,
    onSubmit: async values => {
      // e.preventDefault();

      dispatch(createReview (values));
      console.log("vals" + JSON.stringify(values, null, 4));
    }
  });

  return (
      <div className="col-lg-6">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Add Review</h6>
          </div>
          <div className="card-body ">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label> Message</label>
                <br/>
                <input
                  className="my-2"
                  name="message"
                  type="text"
                  placeholder="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                />
                {formik.errors.message && formik.touched.message && (
                  <FormError>{formik.errors.message}</FormError>
                )}
              </div>
           
              {/* <div>
              <label>Product</label>
                <CustomSelect
                value={formik.values.productId}
                onChange={value=>formik.setFieldValue('productId',value.value)}
                options={options}
                />
                {formik.errors.productId && formik.touched.productId && (
                  <FormError>{formik.errors.productId}</FormError>
                )}
              </div> */}
              
              
              <div className="mb-4"></div>

              <button
                className="btn btn-primary btn-icon-split btn-sm"
                type="submit"
              >
                <span className="icon text-white-50">
                  <i className="fas fa-check"></i>
                </span>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    
  );
};

const FormError = styled.p`
  color: #f74b1b;
`;

export default Formrev;

