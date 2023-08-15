import * as yup from "yup";

export const CollegeSchema = yup.object().shape({
  instituteName: yup.string().required("Institute Name is required"),
  registrationNumber: yup
    .number()
    .required("Registration Number is required")
    .positive()
    .integer(),
  regulatoryBody: yup.string().required("Regulatory Body is required"),
  foundingYear: yup
    .number()
    .required("Founding Year is required")
    .min(1600)
    .max(2020)
    .positive()
    .integer(),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  district: yup.string().required("City is required"),
  street: yup.string().required("Street is required"),
  landmark: yup.string().required("Landmark is required"),
  pinCode: yup.number().required("Pincode is required").positive().integer(),
  coursesOffered: yup.array().required("Courses Offered is required"),
  streamsOffered: yup.array().required("Stream Offered is required"),
  socialMediaLinks: yup.string(),
  numberOfEmployees: yup
    .number()
    .required("No of Emoloyees is required")
    .positive()
    .integer(),
});

export const JobPostingSchema = yup.object().shape({
  position: yup.string().trim().required("Position is required"),
  employmentType: yup.string().trim().required("Employment Type is required"),
  workExperience: yup.string().trim().required("Work Experience is required"),
  educationalQualification: yup
    .string()
    .trim()
    .required("Educational Qualification is required"),
  salaryRange: yup.string().default("Not Specified"),
  jobDescription: yup.string().trim().required("Job Descripton is required"),
  higherEducationInstitution: yup
    .string()
    .trim()
    .required("Higher Education Institution is required"),
});

export const FacultyMemberSchema = yup.object().shape({
  fullName: yup.string().trim().required("FullName is required"),
  higherEducationInstitution: yup.string(),
  designation: yup.string().trim().required("Designation Type is required"),
  department: yup.string().trim().required("Department is required"),
  qualification: yup.string().trim().required("Qualification is required"),
  gender: yup.string().trim().required("Gender is required"),
  dob: yup.date().required("Date Of Birth is required"),
});
