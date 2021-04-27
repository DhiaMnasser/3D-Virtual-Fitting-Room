import React from "react";
// import { textField, Button, Typoghraphy, Paper } from '@material-ui/core';
import { useFormik, Formik } from "formik";
import { Validation } from "./Validations/validation";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../../redux/slices/products";
import styled from "styled-components";

const Form = ({product}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      productName: product.productName,
      description: product.description,
      categoryId: product.categoryId,
      gender: product.gender,
      price: product.price,
      size: product.size,
      stockQuantity: product.stockQuantity,
      image: product.image,
      arModel: product.arModel,
      theeDModel: product.theeDModel,
      rating: product.rating,
      likes: product.likes,
      dlikes: product.dlikes,
      nbrating: product.nbrating
    },
    validationSchema: Validation,
    onSubmit: async values => {
      // e.preventDefault();
      dispatch(updateProduct(product._id, values));
      console.log("vals" + JSON.stringify(values, null, 4));
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
                  placeholder={product.productName}
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                />
                {formik.errors.productName && formik.touched.productName && (
                  <FormError>{formik.errors.productName}</FormError>
                )}
              </div>
              <div>
                <input
                  className="my-2"
                  name="description"
                  type="text"
                  placeholder={product.description}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.errors.description && formik.touched.description && (
                  <FormError>{formik.errors.description}</FormError>
                )}
              </div>
              <div>
                <input
                  className="my-2"
                  name="categoryId"
                  type="text"
                  placeholder={product.categoryId}
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                />
                {formik.errors.categoryId && formik.touched.categoryId && (
                  <FormError>{formik.errors.categoryId}</FormError>
                )}
              </div>
              <div>
              <span className="text">gender: </span>

                <input
                  class="my-2"
                  name="gender"
                  type="text"
                  placeholder="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                />
                {formik.errors.gender && formik.touched.gender && (
                  <FormError>{formik.errors.gender}</FormError>
                )}
              </div>
              <div>
                <input
                  className="my-2"
                  name="price"
                  type="number"
                  placeholder={product.price}
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                {formik.errors.price && formik.touched.price && (
                  <FormError>{formik.errors.price}</FormError>
                )}
              </div>
              <div>
                <input
                  className="my-2"
                  name="size"
                  type="text"
                  placeholder={product.size}
                  value={formik.values.size}
                  onChange={formik.handleChange}
                />
                {formik.errors.size && formik.touched.size && (
                  <FormError>{formik.errors.size}</FormError>
                )}
              </div>
              <div>
                <input
                  className="my-2"
                  name="stockQuantity"
                  type="number"
                  placeholder={product.stockQuantity}
                  value={formik.values.stockQuantity}
                  onChange={formik.handleChange}
                />
                {formik.errors.stockQuantity &&
                  formik.touched.stockQuantity && (
                    <FormError>{formik.errors.stockQuantity}</FormError>
                  )}
              </div>
              <div>
                <span className="text">Image: </span>

                <FileBase
                  type="file"
                  id="image"
                  name="image"
                  multiple={false}
                  onDone={({ base64 }) => {
                    formik.setFieldValue("image", base64);
                  }}
                />
                {formik.errors.image && formik.touched.image && (
                  <FormError>{formik.errors.image}</FormError>
                )}
              </div>
              <div>
                <span className="text">arModel: </span>
                <FileBase
                  type="file"
                  id="arModel"
                  name="arModel"
                  multiple={false}
                  onDone={({ base64 }) => {
                    formik.setFieldValue("image", base64);
                  }}
                />
                {formik.errors.arModel && formik.touched.arModel && (
                  <FormError>{formik.errors.arModel}</FormError>
                )}
              </div>
              <div>
              <span className="text">rating: </span>

                <input
                  class="my-2"
                  name="rating"
                  type="number"
                  placeholder="rating"
                  value={formik.values.rating}
                  onChange={formik.handleChange}
                />
                {formik.errors.rating && formik.touched.rating && (
                  <FormError>{formik.errors.rating}</FormError>
                )}
              </div>
              <div>
              <span className="text">nbrating: </span>

                <input
                  class="my-2"
                  name="nbrating"
                  type="number"
                  placeholder="nbrating"
                  value={formik.values.nbrating}
                  onChange={formik.handleChange}
                />
                {formik.errors.nbrating && formik.touched.nbrating && (
                  <FormError>{formik.errors.nbrating}</FormError>
                )}
              </div>
              <div>
              <span className="text">dlikes: </span>

                <input
                  class="my-2"
                  name="dlikes"
                  type="number"
                  placeholder="dlikes"
                  value={formik.values.dlikes}
                  onChange={formik.handleChange}
                />
                {formik.errors.dlikes && formik.touched.dlikes && (
                  <FormError>{formik.errors.dlikes}</FormError>
                )}
              </div>
              <div>
              <span className="text">likes: </span>

                <input
                  class="my-2"
                  name="likes"
                  type="number"
                  placeholder="likes"
                  value={formik.values.likes}
                  onChange={formik.handleChange}
                />
                {formik.errors.likes && formik.touched.likes && (
                  <FormError>{formik.errors.likes}</FormError>
                )}
              </div>
              <div>
                <span className="text">theeDModel: </span>

                <FileBase
                  type="file"
                  id="theeDModel"
                  name="theeDModel"
                  multiple={false}
                  onDone={({ base64 }) => {
                    formik.setFieldValue("image", base64);
                  }}
                />
                {formik.errors.theeDModel && formik.touched.theeDModel && (
                  <FormError>{formik.errors.theeDModel}</FormError>
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

export default Form;
