
import * as yup from "yup";


export  const validationSchema=yup.object().shape({
    email:yup
    .string()
    .email('invalid email format')
    .required("email is required"),
    password:yup
    .string()
    .min(6, "Password must contain at least 8 characters")
    .required("Enter your password"),
})