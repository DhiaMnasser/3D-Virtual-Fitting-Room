import * as yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
export const Validation = yup.object().shape({
  productName: yup.string()
    .required("required"),
  description: yup.string()
    .required("required"),
  gender: yup.string()
    .required("required"),
  categoryId: yup.string()
    .required("required"),
  price: yup.number()
    .required("required")
    .positive("price must be positive!"),
  size: yup.string()
    .required("required"),
  stockQuantity: yup.number()
    .required("required")
    .min(1, "Minimum qte is 1"),
  image: yup.string()
    .required("required"),
  arModel: yup.string(),
  theeDModel: yup.string(),
  rating:yup.number(),
  nbrating:yup.number(),
  likes:yup.number(),
  dlikes:yup.number(),
  promo:yup.number(),
  color:yup.string()
});
