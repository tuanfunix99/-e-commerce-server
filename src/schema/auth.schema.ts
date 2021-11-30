import { object, string } from "yup";

export const registerSchema = object({
  body: object({
    firstName: string().required("First name is required"),
    lastName: string().required("Last name is required"),
    username: string().required("Username is required"),
    password: string()
      .required("Password is required")
      .min(8, "Password at least 8 chracters")
      .max(64, "Password at most 64 chracters"),
    email: string().required("Email is required").email("Email not valid"),
  }),
});

export const loginSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(8, "Password at least 8 chracters")
      .max(64, "Password at most 64 chracters"),
    email: string().required("Email is required").email("Email not valid"),
  }),
});
