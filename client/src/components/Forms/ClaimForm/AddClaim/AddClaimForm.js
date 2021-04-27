import React from "react";
// import { textField, Button, Typoghraphy, Paper } from '@material-ui/core';
import { useFormik, Formik } from "formik";
import { Validation } from "./Validations/validation";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from 'axios';
import {  Typography, Paper } from '@material-ui/core';
import useStyles from '../styles';
import CustomSelect from "./CustomSelect";
import { createClaim } from "../../../../redux/slices/claims";
let types = ["Size","Color","Fabric","Other"];
types= types.map((x)=>x={value:x, label :x})
let types2 = ["Delay","Missing item ","Other"];
types2= types2.map((x)=>x={value:x, label :x})
let selecteds = ["product","Order"];
selecteds= selecteds.map((x)=>x={value:x, label :x})
const Form = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
     message: "",
     creator_id :user?.result?._id,
     creator :user?.result?.name,
     status :"In Progress",
     type :"",
     selectValue :"",
     product :"Order",
     Réf :""
    },
    validationSchema: Validation,
    onSubmit: async values => {
      // e.preventDefault();

      dispatch(createClaim (values));
      console.log("vals" + JSON.stringify(values, null, 4));
    }
  });
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own claim
        </Typography>
      </Paper>
    );
  }

  return (
    <div class="container">
    <div class="row">
        <div class="col-lg-6 col-md-6">
            <div class="contact__content">
    <div class="contact__form">
                        <h2>SEND CLAIM</h2>
                        <div>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                            <input type="text" 
                            name="Message"
                            placeholder="Name" 
                            value={formik.values.name}
                            onChange={formik.handleChange} />
                            {formik.errors.name && formik.touched.name && (
                            <FormError>{formik.errors.name}</FormError>
                             )}
                             </div>
                             <div>
                             <label> <h4>Choose your object</h4> </label>
                             <CustomSelect
                             value={formik.values.selectValue}
                             onChange={value=>formik.setFieldValue('selectValue',value.value)}
                             options={selecteds}
                             />
                             </div>
                             <div>
                      
                          {formik.values.selectValue === formik.values.product ? (  <div>
                          <label> <h4>Choose your type of claim:</h4></label>
                           <CustomSelect
                          value={formik.values.type}
                          onChange={value=>formik.setFieldValue('type',value.value)}
                          options={types2}
                          />
                         {formik.errors.type && formik.touched.type && (
                         <FormError>{formik.errors.type}</FormError>
                          )}
                          </div> ):(<div> <label><h4> Choose your type of claim: </h4></label>
                          <CustomSelect
                          value={formik.values.type}
                          onChange={value=>formik.setFieldValue('type',value.value)}
                          options={types}
                          />
                          {formik.errors.type && formik.touched.type && (
                          <FormError>{formik.errors.type}</FormError>
                          )}
                          </div>  ) }
                             </div>
                             <label><h4> Your message and Code: </h4></label>
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
                             <div>
                             <input
                             className="my-2"
                             name="Réf"
                             type="text"
                             placeholder="AEJXZ.."
                             value={formik.values.Réf}
                             onChange={formik.handleChange}
                             />
                            {formik.errors.Réf && formik.touched.Réf && (
                            <FormError>{formik.errors.Réf}</FormError>
                            )}
                             </div>
                            <button type="submit" class="site-btn" >Send Claim</button>
                        </form>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                
  );
};    
       // <div className="col-lg-6">
      //   <div className="card shadow mb-4">
      //     <div className="card-header py-3">
      //       <h6 className="m-0 font-weight-bold text-primary">Add Claim</h6>
      //     </div>
      //     <div className="card-body ">
      //       <form onSubmit={formik.handleSubmit}>
      //         <div>
      //         <label> Message           
      //           <br/>
      //           <input */}
      {/* //             className="my-2"
      //             name="message"
      //             type="text"
      //             placeholder="type your message"
      //             value={formik.values.message}
      //             onChange={formik.handleChange}
      //           />
      //           {formik.errors.message && formik.touched.message && ( */}
      {/* //             <FormError>{formik.errors.message}</FormError>
      //           )}
      //           </label>
      //         </div> */}
              
      {/* //         <div>
      //            <label> Choose your object </label>
      //           <CustomSelect */}
      {/* //           value={formik.values.selectValue}
      //           onChange={value=>formik.setFieldValue('selectValue',value.value)}
      //           options={selecteds}
      //           />
                
      //         </div>
              <div>
               {formik.values.selectValue === formik.values.product ? (  <div>
                 <label> Choose your type of claim:</label>
                <CustomSelect
                value={formik.values.type}
                onChange={value=>formik.setFieldValue('type',value.value)}
                options={types2}
                />
                {formik.errors.type && formik.touched.type && (
                  <FormError>{formik.errors.type}</FormError>
                )}
              </div> ):(<div> <label> Choose your type of claim:</label>
                <CustomSelect
                value={formik.values.type}
                onChange={value=>formik.setFieldValue('type',value.value)}
                options={types}
                />
                {formik.errors.type && formik.touched.type && (
                  <FormError>{formik.errors.type}</FormError>
                )}
              </div>  ) }
              
              </div>
              
              <div>
                <label> Reference
                
                <br/>
                <input
                  className="my-2"
                  name="Réf"
                  type="text"
                  placeholder="AEJXZ.."
                  value={formik.values.Réf}
                  onChange={formik.handleChange}
                />
                {formik.errors.Réf && formik.touched.Réf && (
                  <FormError>{formik.errors.Réf}</FormError>
                )}
                </label>
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
      </div> */}


const FormError = styled.p`
  color: #f74b1b;
`;

export default Form;

