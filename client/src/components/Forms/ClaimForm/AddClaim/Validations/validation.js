import * as yup from "yup";

export const Validation = yup.object().shape({
    message: yup.string()
    .required("required"),

});
