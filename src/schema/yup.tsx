import { object, string, ref } from "yup";
export const Regsehema = object({
  name: string().min(2).max(25).required("Please enter your name"),
  email: string().email().required("Please enter your email"),
  password: string().min(6).required("Please enter your password"),
  confirm_password: string()
    .required("Please enter confirm password ")
    .oneOf([ref("password")], "Password must match"),
});
export const logischema = object({
  email: string().email().required("Please enter your email"),
  password: string().min(6).required("Please enter your password"),
});
export const ChangePassword = object({
  new_password: string().min(6).required("Please enter your new Password"),
  comfirmPassword: string()
    .required("Please enter your comfirm new Password")
    .oneOf([ref("new_password")], "Password must match"),
});

export const profileYup = object({
  email: string().email().required("Please enter your email"),
  name: string().min(2).max(25).required("Please enter your name"),
});
