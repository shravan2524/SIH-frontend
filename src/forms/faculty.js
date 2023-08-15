import * as Yup from "yup";
const loactionSchema = Yup.object().shape({
	user: Yup.string(),
	country: Yup.string().required("Select Country"),
	state: Yup.string().required("Select State"),
	district: Yup.string().required("Select District"),
	pincode: Yup.number()
		.required("Pincode is required")
		.lessThan(800000, "Invalid pincode"),
	address1: Yup.string().trim().required("Premanent Address is requried"),
	address2: Yup.string().trim().required("Correspondance Address is requried"),
});

const experienceSchema = Yup.object().shape({
	user: Yup.string(),
	jobTitle: Yup.string().required(),
	organizationName: Yup.string().required(),
	place: Yup.string().required(),
	jobType: Yup.string()
		.required(),
	responsibility: Yup.string().trim().required(),
	experience: Yup.string().trim().required(),
});

const demographicSchema = Yup.object().shape({
	caste: Yup.string().required("Caste detail is requried"),
	religion: Yup.string().required("Religion is required"),
	familyincomegroup: Yup.string().required("Family Income group is required"),
});

const JobApplicationSchema = Yup.object().shape({
	user: Yup.string(),
	posting: Yup.string(),
	position: Yup.string().required("Position is requried"),
	employmentType: Yup.string().required("Employment Type is requried"),
	hardSkills: Yup.array().required("Hard Skills is requried"),
	softSkills: Yup.array().required("Soft Skills is requried"),
	workExperience: Yup.string().required("Work Experience is requried"),
	educationalQualification: Yup.string().required(
		"Educational Qualification is requried"
	),
});

export { loactionSchema, demographicSchema, JobApplicationSchema, experienceSchema };
