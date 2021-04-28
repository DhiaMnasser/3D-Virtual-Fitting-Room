import React, { useState, useEffect } from "react";
// import { textField, Button, Typoghraphy, Paper } from '@material-ui/core';
import { useFormik, Formik } from "formik";
import { Validation } from "./Validations/validation";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../../redux/slices/products";
import styled from "styled-components";
import { createMessage } from "../../../../redux/slices/messages";

const Form = () => {

 
 
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      site: "",
      message: "",
    },
    validationSchema: Validation,
    onSubmit: async values => {
      // e.preventDefault();
      dispatch(createMessage(values));
    }
  });
  

  
  return ( 
    <>
    {/* <div id="preloder">
        <div class="loader"></div>
    </div>   */}

    
                    <div>
                        <h5>SEND MESSAGE</h5>
                        <div>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                            <input type="text" 
                            name="name"
                            placeholder="Name" 
                            value={formik.values.name}
                            onChange={formik.handleChange} />
                            {formik.errors.name && formik.touched.name && (
                            <FormError>{formik.errors.name}</FormError>
                             )}
                             </div>
                             <div>
                            <input type="text"
                            name="email" 
                            placeholder="Email" 
                            value={formik.values.email}
                            onChange={formik.handleChange} />
                            {formik.errors.email && formik.touched.email && (
                            <FormError>{formik.errors.email}</FormError>
                             )}
                             </div>
                             <div>
                            <input type="text" 
                            name="site"
                            placeholder="Website" 
                            value={formik.values.site}
                            onChange={formik.handleChange} />
                            {formik.errors.site && formik.touched.site && (
                            <FormError>{formik.errors.site}</FormError>
                             )}
                             </div>
                             <div>
                            <textarea 
                            name="message"
                            placeholder="Message" 
                            value={formik.values.message} 
                            onChange={formik.handleChange} />
                            {formik.errors.message && formik.touched.messsage && (
                            <FormError>{formik.errors.message}</FormError>
                             )}
                             </div>
                            <button type="submit" class="site-btn" >Send Message</button>
                        </form>
                    </div>
                </div>
            
</>
  );
};

const FormError = styled.p`
  color: #f74b1b;
`;


export default Form;
