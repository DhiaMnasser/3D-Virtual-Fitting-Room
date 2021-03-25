import React, { useState, useEffect } from "react";
// import { textField, Button, Typoghraphy, Paper } from '@material-ui/core';
import { useFormik, Formik } from "formik";
import { Validation } from "./Validations/validation";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../../redux/slices/products";
import styled from "styled-components";
import axios from "axios";
import {uploadFile} from "../../../../api/index";

const Form = () => {
  const [uploadedArModelUrl, setUploadedArModelUrl] = useState("");
  const [uploadedArModel, setUploadedArModel] = useState({});
  const [uploadedThreeDModelUrl, setUploadedThreeDModelUrl] = useState("");
  const [uploadedThreeDModel, setUploadedThreeDModel] = useState({});

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      categoryId: "",
      price: "0",
      size: "M",
      stockQuantity: "1",
      image: "",
      arModel: "",
      threeDModel: ""
    },
    validationSchema: Validation,
    onSubmit: async values => {
      // e.preventDefault();
      console.log("vals:" + JSON.stringify(values, null, 4));
      dispatch(createProduct(values));
    }
  });

  useEffect(() => {
    // console.log("uploadedArModel" + JSON.stringify(uploadedArModel, null, 4));
    if (!uploadedArModel.name) {
      return alert("AR file is missing");
    }

    addFileToBd(uploadedArModel, "arModel");


  }, [uploadedArModel]);

  useEffect(() => {
    // console.log("uploadedThreeDModel" + JSON.stringify(uploadedThreeDModel, null, 4));
    if (!uploadedThreeDModel.name) {
      return alert("3D file is missing");
    }
    addFileToBd(uploadedThreeDModel, "threeDModel");
  }, [uploadedThreeDModel]);

  const addFileToBd = (selectedFile, selectedField) => {
    let formData = new FormData();
    // formData.append("caption", this.state.caption);
    formData.append("file", selectedFile);

    uploadFile(formData)
      .then(response => {
        response.data.success
          ? alert(
              "File successfully uploaded" +
                JSON.stringify(response.data.message, null, 4)
            )
          : alert("File already exists");
          formik.setFieldValue(
            selectedField,
            response.data.message.filename
          );
        // this.fetchRecent();
      })
      .catch(err => alert("Error useEffect: " + err));
  };

  return (
    <>
      <div class="col-lg-6">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Add Product</h6>
          </div>
          <div class="card-body ">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  class="my-2"
                  name="productName"
                  type="text"
                  placeholder="productName"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                />
                {formik.errors.productName && formik.touched.productName && (
                  <FormError>{formik.errors.productName}</FormError>
                )}
              </div>
              <div>
                <input
                  class="my-2"
                  name="description"
                  type="text"
                  placeholder="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
                {formik.errors.description && formik.touched.description && (
                  <FormError>{formik.errors.description}</FormError>
                )}
              </div>
              <div>
                <input
                  class="my-2"
                  name="categoryId"
                  type="text"
                  placeholder="categoryId"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                />
                {formik.errors.categoryId && formik.touched.categoryId && (
                  <FormError>{formik.errors.categoryId}</FormError>
                )}
              </div>
              <div>
                <input
                  class="my-2"
                  name="price"
                  type="number"
                  placeholder="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                {formik.errors.price && formik.touched.price && (
                  <FormError>{formik.errors.price}</FormError>
                )}
              </div>
              <div>
                <input
                  class="my-2"
                  name="size"
                  type="text"
                  placeholder="size"
                  value={formik.values.size}
                  onChange={formik.handleChange}
                />
                {formik.errors.size && formik.touched.size && (
                  <FormError>{formik.errors.size}</FormError>
                )}
              </div>
              <div>
                <input
                  class="my-2"
                  name="stockQuantity"
                  type="number"
                  placeholder="stockQuantity"
                  value={formik.values.stockQuantity}
                  onChange={formik.handleChange}
                />
                {formik.errors.stockQuantity &&
                  formik.touched.stockQuantity && (
                    <FormError>{formik.errors.stockQuantity}</FormError>
                  )}
              </div>
              <div>
                <span class="text">Image: </span>

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
                <span class="text">arModel: </span>
               

                <input
                  type="file"
                  id="arModel"
                  name="arModel"
                  className="Upload__Input"
                  onChange={(event: any) => {
                    alert("File is uploading please wait");
                    setUploadedArModel(event.target.files[0]);
                    // setUploadedArModel({added: 'yes'});

                    setUploadedArModelUrl(
                      URL.createObjectURL(event.target.files[0])
                    );

                    // uploadArModel();
                  }}
                />
              </div>
              <div>
                <span class="text">theeDModel: </span>

                <input
                  type="file"
                  id="theeDModel"
                  name="theeDModel"
                  className="Upload__Input"
                  onChange={(event: any) => {
                    alert("File is uploading please wait");
                    setUploadedThreeDModel(event.target.files[0]);
                    // setUploadedThreeDModel({added: 'yes'});

                    setUploadedThreeDModelUrl(
                      URL.createObjectURL(event.target.files[0])
                    );

                    // uploadArModel();
                  }}
                />
                {formik.errors.theeDModel && formik.touched.theeDModel && (
                  <FormError>{formik.errors.theeDModel}</FormError>
                )}
              </div>
              <div class="mb-4"></div>

              <button
                class="btn btn-primary btn-icon-split btn-sm"
                type="submit"
              >
                <span class="icon text-white-50">
                  <i class="fas fa-check"></i>
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
