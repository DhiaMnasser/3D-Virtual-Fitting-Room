import React from "react";
// import { textField, Button, Typoghraphy, Paper } from '@material-ui/core';
import { useFormik } from "formik";
import { Validation } from "./Validations/validation";
import FileBase from "react-file-base64";
import { useDispatch } from 'react-redux';
import { createProduct } from '../../../../redux/slices/products'
import * as api from "../../api/index";

const Form = () => {


  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      categoryId: "",
      price: "0",
      size: "M",
      stockQuantity: "0",
      // image: "",
      // ArModel: ""
    },
    validationSchema: Validation,
    onSubmit: async (values) => {
      // e.preventDefault();
         const data = await api.createFile(values.image);
  
      dispatch(createProduct(values))
      console.dir("vals"+ JSON.stringify(values, null, 4));
    }
  });

  return (
    <>
      <div className="col-lg-6">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Add Product</h6>
          </div>
          <div className="card-body ">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  className="my-2"
                  name="productName"
                  type="text"
                  placeholder="productName"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <input
                  className="my-2"
                  name="description"
                  type="text"
                  placeholder="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <input
                  className="my-2"
                  name="categoryId"
                  type="text"
                  placeholder="categoryId"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <input
                  className="my-2"
                  name="price"
                  type="number"
                  placeholder="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <input
                  className="my-2"
                  name="size"
                  type="text"
                  placeholder="size"
                  value={formik.values.size}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <input
                  className="my-2"
                  name="stockQuantity"
                  type="number"
                  placeholder="stockQuantity"
                  value={formik.values.stockQuantity}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
              <span className="text">Image: </span>

                <input
                  name="image"
                  type="file"
                  placeholder="image"
                  onChange={event => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
              </div>
              <div>
                <span className="text">ArModel: </span>

                <input
                  // type="file"
                  // multiple={false}
                  // onDone={({base64}) => setPro}
                  name="ArModel"
                  type="file"
                  placeholder="ArModel"
                  onChange={event => {
                    formik.setFieldValue("file", event.currentTarget.files[1]);
                  }}
                />
              </div>
              <div className="mb-4"></div>

              <button className="btn btn-primary btn-icon-split btn-sm" type="submit" >
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

export default Form;
