import * as yup from 'yup';
export const Validation = yup.object().shape({
 
    email:yup.string().email().required("required"),
   password:yup.string().required("required")
   
});