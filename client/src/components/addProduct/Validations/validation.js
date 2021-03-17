import * as yup from 'yup';
const SUPPORTED_FORMATS=['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
export const Validation = yup.object().shape({
    productName: yup.string().required("required"),
    description:yup.string().required("required"),
    category:yup.string().required("required"),
    price:yup.number().required("required"),
    size:yup.string().required("required"),
    stockQuantity:yup.number().required("required"),
    image:yup.mixed(),
    ArModel:yup.mixed()
});