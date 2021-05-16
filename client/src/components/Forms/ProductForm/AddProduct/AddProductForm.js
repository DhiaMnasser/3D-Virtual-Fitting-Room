import React, { useState, useEffect } from "react";
// import { textField, Button, Typoghraphy, Paper } from '@material-ui/core';
import { useFormik, Formik } from "formik";
import { Validation } from "./Validations/validation";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../../redux/slices/products";
import styled from "styled-components";
import axios from "axios";
import { uploadFile } from "../../../../api/index";
import CustomSelect from "./CustomSelect";
import { HexColorPicker } from "react-colorful";

const Form = () => {
  const [uploadedArModelUrl, setUploadedArModelUrl] = useState("");
  const [uploadedArModel, setUploadedArModel] = useState({});
  const [uploadedThreeDModelUrl, setUploadedThreeDModelUrl] = useState("");
  const [uploadedThreeDModel, setUploadedThreeDModel] = useState({});
  const [nbrOfImages, setNbrOfImages] = useState(1);

  const Chan = event => {
    formik.setFieldValue("color", color);
    console.log(formik.values.color);
  };
  let sizes = ["XXS", "XS", "XS-S", "S", "M", "M-L", "L", "XL"];
  sizes = sizes.map(x => (x = { value: x, label: x }));
  const categories = useSelector(state => state.categories.categories);
  const options = categories.map(
    x => (x = { value: x.categoryName, label: x.categoryName })
  );
  const [color, setColor] = useState("#aabbcc");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      categoryId: "",
      price: "1",
      size: "M",
      stockQuantity: "1",
      gender: "m",
      image: [],
      arModel: "",
      threeDModel: "",
      rating: "5",
      promo: "0",
      color: "#aabbcc",
      ref: "",
      body: "",
      lh: "",
      rh: "",
      lll: "",
      lrl: ""
    },
    validationSchema: Validation,
    onSubmit: async values => {
      // e.preventDefault();
      if (values.categoryId === "T-shirts") {
        var armodel = [values.body, values.lh, values.rh];
      }
      if (values.categoryId === "Jeans") {
        var armodel = [
          values.body,
          values.lh,
          values.rh,
          values.lll,
          values.lrl
        ];
      }
      values.arModel = armodel;
      values = {
        productName: values.productName,
        description: values.description,
        categoryId: values.categoryId,
        price: values.price,
        size: values.size,
        gender: values.gender,
        stockQuantity: values.stockQuantity,
        image: values.image,
        arModel: values.arModel,
        threeDModel: values.threeDModel,
        rating: values.rating,
        promo: values.promo,
        color: values.color,
        ref: values.ref
      };
      console.log("vals:" + JSON.stringify(values, null, 4));
      dispatch(createProduct(values)).then(()=>{
        alert("product Added")
      });
      
    }
  });
  useEffect(() => {
    formik.setFieldValue("color", color);
  }, [color]);
  const [model, setModel] = useState("");
  useEffect(() => {
    if (formik.values.categoryId === "T-shirts") {
      setModel("shirt");
    }
    if (formik.values.categoryId === "Jeans") {
      setModel("jean");
    }
  }, [formik.values.categoryId]);
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
        formik.setFieldValue(selectedField, response.data.message.filename);
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
                <span className="text">Product Name: </span>

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
                <span className="text">Product ref: </span>

                <input
                  class="my-2"
                  name="ref"
                  type="text"
                  placeholder="ref"
                  value={formik.values.ref}
                  onChange={formik.handleChange}
                />
                {formik.errors.ref && formik.touched.ref && (
                  <FormError>{formik.errors.ref}</FormError>
                )}
              </div>
              <div>
                <span className="text">Description: </span>

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
                <label>category</label>
                <CustomSelect
                  value={formik.values.categoryId}
                  onChange={value =>
                    formik.setFieldValue("categoryId", value.value)
                  }
                  options={options}
                />
                {formik.errors.categoryId && formik.touched.categoryId && (
                  <FormError>{formik.errors.categoryId}</FormError>
                )}
              </div>
              
              <div>
                <span className="text">Gender: </span>

                <input
                  class="my-2"
                  name="gender"
                  type="text"
                  placeholder="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                />
                {formik.errors.gender && formik.touched.gender && (
                  <FormError>{formik.errors.gender  }</FormError>
                )}
              </div>
              <div>
                <span className="text">Price: </span>

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
                <label>size</label>
                <CustomSelect
                  value={formik.values.size}
                  onChange={value => formik.setFieldValue("size", value.value)}
                  options={sizes}
                />
                {formik.errors.size && formik.touched.size && (
                  <FormError>{formik.errors.size}</FormError>
                )}
              </div>
              <div>
                <span className="text">Stock Quantity: </span>

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
                <span className="text">Image: </span>
                <FileBase
                  type="file"
                  id="image"
                  name="image"
                  multiple={false}
                  onDone={({ base64 }) => {
                    formik.values.image.push(base64);
console.log('Image',  formik.values.image);

                    formik.setFieldValue("image", formik.values.image);
                  }}
                />
                <button 
                type="button"
                  className="btn btn-secondary"
                  onClick={() => setNbrOfImages(nbrOfImages + 1)}
                >
                  +
                </button>

                {formik.errors.image && formik.touched.image && (
                  <FormError>{formik.errors.image}</FormError>
                )}
              </div>
              {nbrOfImages>=2 && (
              <div>
                <span className="text">Image2: </span>
                <FileBase
                  type="file"
                  id="image"
                  name="image"
                  multiple={false}
                  onDone={({ base64 }) => {
                    formik.values.image.push(base64)
                    formik.setFieldValue("image", formik.values.image);
                  }}
                />
                  <button type="button" className="btn btn-secondary" onClick={()=>setNbrOfImages(nbrOfImages+1)}>+</button>


                {formik.errors.image && formik.touched.image && (
                  <FormError>{formik.errors.image}</FormError>
                )}
              </div>
              )}

              {nbrOfImages>=3 && (
              <div>
                <span className="text">Image3: </span>
                <FileBase
                  type="file"
                  id="image"
                  name="image"
                  multiple={false}
                  onDone={({ base64 }) => {
                    formik.values.image.push(base64);
                    
                    formik.setFieldValue("image", formik.values.image);
                  }}
                />
                
                {formik.errors.image && formik.touched.image && (
                  <FormError>{formik.errors.image}</FormError>
                )}
              </div>
              )}
 
              {model === "shirt" && (
                <div>
                  <div>
                    <span class="text">body: </span>

                    <FileBase
                      type="file"
                      id="body"
                      name="body"
                      multiple={false}
                      onDone={({ base64 }) => {
                        formik.setFieldValue("body", base64);
                      }}
                    />
                                    {formik.errors.body && formik.touched.body && (
                  <FormError>{formik.errors.body}</FormError>
                )}
                  </div>
                  <div>
                    <span class="text">right hand: </span>

                    <FileBase
                      type="file"
                      id="rh"
                      name="rh"
                      multiple={false}
                      onDone={({ base64 }) => {
                        formik.setFieldValue("rh", base64);
                      }}
                    />
                                    {formik.errors.rh && formik.touched.rh && (
                  <FormError>{formik.errors.rh}</FormError>
                )}
                  </div>
                  <div>
                    <span class="text">left hand: </span>

                    <FileBase
                      type="file"
                      id="lh"
                      name="lh"
                      multiple={false}
                      onDone={({ base64 }) => {
                        formik.setFieldValue("lh", base64);
                      }}
                    />
                                    {formik.errors.lh && formik.touched.lh && (
                  <FormError>{formik.errors.lh}</FormError>
                )}
                  </div>
                </div>
              )}
              {model === "jean" && (
                <div>
                  <div>
                    <span class="text">hips: </span>

                    <FileBase
                      type="file"
                      id="body"
                      name="body"
                      multiple={false}
                      onDone={({ base64 }) => {
                        formik.setFieldValue("body", base64);
                      }}
                    />
                                    {formik.errors.body && formik.touched.body && (
                  <FormError>{formik.errors.body}</FormError>
                )}
                  </div>
                  <div>
                    <span class="text">right upper leg: </span>

                    <FileBase
                      type="file"
                      id="rh"
                      name="rh"
                      multiple={false}
                      onDone={({ base64 }) => {
                        formik.setFieldValue("rh", base64);
                      }}
                    />
                                    {formik.errors.rh && formik.touched.rh && (
                  <FormError>{formik.errors.rh}</FormError>
                )}
                  </div>
                  <div>
                    <span class="text">left upper leg: </span>

                    <FileBase
                      type="file"
                      id="lh"
                      name="lh"
                      multiple={false}
                      onDone={({ base64 }) => {
                        formik.setFieldValue("lh", base64);
                      }}
                    />
                                    {formik.errors.lh && formik.touched.lh && (
                  <FormError>{formik.errors.lh}</FormError>
                )}
                  </div>
                  <div>
                    <span class="text">left lower leg: </span>

                    <FileBase
                      type="file"
                      id="lll"
                      name="lll"
                      multiple={false}
                      onDone={({ base64 }) => {
                        formik.setFieldValue("lll", base64);
                      }}
                    />
                                    {formik.errors.lll && formik.touched.lll && (
                  <FormError>{formik.errors.lll}</FormError>
                )}
                  </div>
                  <div>
                    <span class="text">right lower leg: </span>

                    <FileBase
                      type="file"
                      id="lrl"
                      name="lrl"
                      multiple={false}
                      onDone={({ base64 }) => {
                        formik.setFieldValue("lrl", base64);
                      }}
                    />
                                    {formik.errors.lrl && formik.touched.lrl && (
                  <FormError>{formik.errors.lrl}</FormError>
                )}
                  </div>
                </div>
              )}
               
              <div>
                <span class="text">3D Model: </span>

                <input
                  type="file"
                  id="threeDModel"
                  name="threeDModel"
                  className="Upload__Input"
                  onChange={event => {
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
              <div>
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
                <input
                  class="my-2"
                  name="promo"
                  type="number"
                  placeholder="promo"
                  value={formik.values.promo}
                  onChange={formik.handleChange}
                />
                {formik.errors.promo && formik.touched.promo && (
                  <FormError>{formik.errors.promo}</FormError>
                )}
              </div>
              <div>
                <input
                  readOnly="true"
                  class="my-2"
                  name="color"
                  type="text"
                  placeholder="color"
                  value={color}
                  onChange={event => Chan(event)}
                />
                {formik.errors.color && formik.touched.color && (
                  <FormError>{formik.errors.color}</FormError>
                )}
              </div>
              <HexColorPicker color={color} onChange={setColor} />

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