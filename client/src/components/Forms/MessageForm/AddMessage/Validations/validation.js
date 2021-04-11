import * as yup from "yup";
export const Validation = yup.object().shape({
  name: yup.string()
    .required("required"),
  email: yup.string()
    .required("required"),
  site: yup.string()
    .required("required"),
  message: yup.string()
    .required("required"),
});
