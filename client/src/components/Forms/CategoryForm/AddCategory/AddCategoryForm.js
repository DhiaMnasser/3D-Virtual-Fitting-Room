import React from "react";
// import { textField, Button, Typoghraphy, Paper } from '@material-ui/core';
import { useFormik } from "formik";
import { Validation } from "./Validations/validation";
import FileBase from "react-file-base64";
import { useDispatch } from 'react-redux';
import { createCategory } from '../../../../actions/categories'

const Form = () => {


  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: Validation,
    onSubmit: async (values) => {
      // e.preventDefault();
      dispatch(createCategory(values))
      console.dir("vals"+ JSON.stringify(values, null, 4));
    }
  });

  return (
    <>
      <div class="col-lg-6">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Add Category</h6>
          </div>
          <div class="card-body ">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  class="my-2"
                  name="categoryName"
                  type="text"
                  placeholder="category Name"
                  value={formik.values.categoryName}
                  onChange={formik.handleChange}
                />
              
              <div class="mb-4"></div>

              <button class="btn btn-primary btn-icon-split btn-sm" type="submit" >
                <span class="icon text-white-50">
                  <i class="fas fa-check"></i>
                </span>
                Submit
                </button>
            </div>

            </form>
           </div>
        </div>
      </div>
    </>
  );
};

export default Form;
