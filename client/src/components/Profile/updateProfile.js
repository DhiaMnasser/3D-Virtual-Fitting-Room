import React, { useState } from "react";
// import { textField, Button, Typoghraphy, Paper } from '@material-ui/core';
import { useFormik, Formik } from "formik";
import { Validation } from "./Validations/validation";

import { useDispatch , useSelector } from "react-redux";
import updateUser from "../../redux/slices/auth";
import styled from "styled-components";

const Formuser = (props) => {
   
    const user1 = JSON.parse(localStorage.getItem('profile'));
    const u = useSelector(state => state.users.users.find(u => u._id === user1?.result?._id));


  const  [user ,SetUser]= useState(u);
  console.log('user'+JSON.stringify(user));
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
        name:"",
        email :""
     
      
    },
    validationSchema: Validation,
    onSubmit: async values => {
      // e.preventDefault();
      dispatch(updateUser(user1?.result?._id, values));
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
                  name="name"
                  type="text"
                  placeholder={user.name}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
               
              </div>
              <div>
                <input
                  className="my-2"
                  name="email"
                  type="text"
                  placeholder={user.email}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
               </div>
             
              <div className="mb-4"></div>

              <button
                className="btn btn-primary btn-icon-split btn-sm"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};



export default Formuser;
