import * as Yup from "yup";
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email is requried")
    .email("Email is invalid"),
  password: Yup.string().trim().required("Password is required"),
});

const changePasswordSchema = Yup.object().shape({
	currentPassword: Yup.string()
	  .trim()
	  .required("Current Password is requried"),
	newPassword: Yup.string().trim().required("New Password is required"),
  });

const signupSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email is requried")
    .email("Email is invalid"),
  password: Yup.string().trim().required("Password is required"),
  firstName: Yup.string().trim().required("First name is required"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password"), null], "Password should match"),
  lastName: Yup.string().trim().required("Last name is required"),
  middleName: Yup.string().trim(),
  mobile: Yup.number()
    .min(100000000, "Invalid number")
    .max(10000000000, "Invalid number")
    .required("Mobile number is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of birth is required"),
});

export { loginSchema, signupSchema, changePasswordSchema };
