import React from "react";
// import { textField, Button, Typoghraphy, Paper } from '@material-ui/core';
import { useFormik, Formik } from "formik";
import { Validation } from "./Validations/validation";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from 'axios';

import { createClaim } from "../../../../redux/slices/claims";

const Form = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const formik = useFormik({
    initialValues: {
     message: "",
     creator_id :user?.result?._id,
     creator :user?.result?.name


    },
    validationSchema: Validation,
    onSubmit: async values => {
      // e.preventDefault();

      dispatch(createClaim (values));
      console.log("vals" + JSON.stringify(values, null, 4));
    }
  });

  return (
      <div className="col-lg-6">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Add Claim</h6>
          </div>
          <div className="card-body ">
            <form onSubmit={formik.handleSubmit}>
              <div>
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

export default Form;

