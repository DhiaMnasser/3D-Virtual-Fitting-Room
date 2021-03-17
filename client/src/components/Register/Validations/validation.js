import * as yup from 'yup';

export const Validation = yup.object().shape({
    name: yup.string().required("required"),
    email:yup.string().email().required("required"),
   password:yup.string().required("required"),
    address:yup.string().required("required"),
    phone:yup.number().required("required"),
    creditCard:yup.number().required("required"),
    role:yup.string().required("required")
});

