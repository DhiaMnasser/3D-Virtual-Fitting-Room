import React from 'react'
import {useFormik} from "formik";
import {Validation}from './Validations/validation'
function AddProduct() {
    const formik = useFormik({
initialValues: {
 productName:"",
        description:"",
        category:"",
        price:"0",
        size:"",
        stockQuantity:"0",
        image:"",
        ArModel:""
},
validationSchema: Validation,
onSubmit: (values)=>{
 
        console.log(values);
      },
});
    return (
        <div>

      
<form onSubmit={formik.handleSubmit}>
  <input name="productName" type="text" placeholder="productName" value={formik.values.productName} onChange={formik.handleChange}/>

<input name="description" type="text" placeholder="description" value={formik.values.description} onChange={formik.handleChange}/>

<input name="category" type="text" placeholder="category" value={formik.values.category} onChange={formik.handleChange}/>

<input name="price" type="number" placeholder="price" value={formik.values.price}  onChange={formik.handleChange}/>

<input name="size" type="text" placeholder="size" value={formik.values.size} onChange={formik.handleChange} />

<input name="stockQuantity" type="number" placeholder="stockQuantity" value={formik.values.stockQuantity} onChange={formik.handleChange}/>

<input name="image" type="file" placeholder="image"  onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                  }}  />

<input name="ArModel" type="file" placeholder="ArModel" 
     onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}         />
<button type="submit">submit</button>

</form>


        </div>
    )
}

export default AddProduct
