import React from "react";
// import { textField, Button, Typoghraphy, Paper } from '@material-ui/core';
import { useFormik, Formik } from "formik";
import { Validation } from "./Validations/validation";

import { useDispatch } from "react-redux";
import { updateReview } from "../../../../redux/slices/reviews";
import styled from "styled-components";

const Formup = ({review}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      message: review.message,
      productId: review.productId,
    
      
    },
    validationSchema: Validation,
    onSubmit: async values => {
      // e.preventDefault();
      dispatch(updateReview(review._id, values));
      console.log("vals" + JSON.stringify(values, null, 4));
    }
  });

  return (
    <>
      <div className="col-lg-6">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Update Review</h6>
          </div>
          <div className="card-body ">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  className="my-2"
                  name="message"
                  type="text"
                  placeholder={review.message}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                />
                {formik.errors.message&& formik.touched.message&& (
                  <FormError>{formik.errors.message}</FormError>
                )}
              </div>
              <div>
                <input
                  className="my-2"
                  name="productId"
                  type="text"
                  placeholder={review.productId}
                  value={formik.values.ProductId}
                  onChange={formik.handleChange}
                />
                {formik.errors.productId && formik.touched.productId && (
                  <FormError>{formik.errors.productId}</FormError>
                )}
              </div>
              
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
    </>
  );
};

const FormError = styled.p`
  color: #f74b1b;
`;

export default Formup;
