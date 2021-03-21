import * as yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
export const Validation = yup.object().shape({
  categoryName: yup.string()
    .required("required")
});
