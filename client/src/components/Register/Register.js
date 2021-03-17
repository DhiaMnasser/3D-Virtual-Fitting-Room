import React from 'react'
import {useFormik} from "formik";
import {Validation}from './Validations/validation'
function Register() {
    const formik = useFormik({
initialValues: {
  name:"",
 email:"",
 password:"",
 address:"",
 phone:"",
 creditCard:"",
 role:""
},
validationSchema: Validation,
onSubmit: (values)=>{
 
        console.log(values);
      },
});
    return (
        <div>
           <form onSubmit={formik.handleSubmit}>
  <input name="name" type="text" placeholder="name" value={formik.values.name} onChange={formik.handleChange}/>

<input name="email" type="text" placeholder="email" value={formik.values.email} onChange={formik.handleChange}/>

<input name="password" type="text" placeholder="password" value={formik.values.password} onChange={formik.handleChange}/>

<input name="address" type="string" placeholder="address" value={formik.values.address}  onChange={formik.handleChange}/>

<input name="phone" type="number" placeholder="phone" value={formik.values.phone} onChange={formik.handleChange} />

<input name="creditCard" type="number" placeholder="creditCard" value={formik.values.creditCard} onChange={formik.handleChange}/>
<input name="role" type="text" placeholder="role" value={formik.values.role} onChange={formik.handleChange}/>


<button type="submit">submit</button>

</form> 
        </div>
    )
}

export default Register
