import React from 'react'
import {useFormik} from "formik";
import {Validation}from './Validations/validation'
function Login() {
     const formik = useFormik({
initialValues: {
 email:"",
 password:""
},
validationSchema: Validation,
onSubmit: (values)=>{
 
        console.log(values);
      },
});   
    return (

        <div>
        <form onSubmit={formik.handleSubmit}>
            <input name="email" type="text" placeholder="email" value={formik.values.email} onChange={formik.handleChange}/>

<input name="password" type="text" placeholder="password" value={formik.values.password} onChange={formik.handleChange}/>
<button type="submit">submit</button>
</form>
        </div>
    )
}

export default Login
