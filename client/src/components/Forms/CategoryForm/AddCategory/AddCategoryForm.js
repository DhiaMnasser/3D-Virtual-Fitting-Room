import React from "react";
// import { textField, Button, Typoghraphy, Paper } from '@material-ui/core';
import { useFormik } from "formik";
import { Validation } from "./Validations/validation";
import FileBase from "react-file-base64";
import { useDispatch } from 'react-redux';
import { createCategory } from '../../../../redux/slices/categories'

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
  
    }
  });

  return (
    <>
      <div className="col-lg-6">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Add Category</h6>
          </div>
          <div className="card-body ">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  className="my-2"
                  name="categoryName"
                  type="text"
                  placeholder="category Name"
                  value={formik.values.categoryName}
                  onChange={formik.handleChange}
                />
              
              <div className="mb-4"></div>

              <button className="btn btn-primary btn-icon-split btn-sm" type="submit" >
                <span className="icon text-white-50">
                  <i className="fas fa-check"></i>
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
