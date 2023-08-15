import {
  FormControl,
  FormGroup,
  InputLabel,
  Box,
  Typography,
  Button,
  FormHelperText,
  OutlinedInput,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader";
import { JobPostingSchema } from "../../forms/college";
import { getProfiles, heiUrl } from "../../bloc/hei";
import { AppContext } from "../../context/app";
import { postData, putData } from "../../bloc/common";
import { useNavigate, useParams } from "react-router-dom";

function JobPosting() {
  const [visibility, setVisibility] = useState(false);
  const { user } = useContext(AppContext);
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(JobPostingSchema) });

  useEffect(() => {
    getProfiles().then((val) => {
      let hei = val.filter((el) => el.user === user.userId)[0];
      if (!hei?.isVerified) {
        toast.error("Cannot post job, verification is requried", {
          duration: 1400,
        });
        setTimeout(() => navigate("/hei/viewProfile"), 2000);
      }
      if (hei?._id)
        setValue("higherEducationInstitution", hei._id, {
          shouldValidate: true,
        });
    });
  }, []);
  const onSubmit = (data) => {
	console.log(data);
    setVisibility(true);
    if (!params.postingId) {
      postData(`${heiUrl}/posting`, data).finally(setVisibility(false));
	//   window.location.reload();
    } else {
      putData(`${heiUrl}/posting/${params.postingId}`, data).finally(
        setVisibility(false)
		);
		// window.location.reload();
    }
  };

  return (
    <>
      <Loader visible={visibility}></Loader>
      <Toaster></Toaster>
      <Box style={{ width: "80%", margin: "2em auto" }}>
        <Typography variant="h3" style={{ margin: "1em 0" }}>
          Job Posting
        </Typography>
        <FormGroup>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <InputLabel
              htmlFor="position"
              error={errors.position ? true : false}
            >
              Position
            </InputLabel>
            <OutlinedInput
              id="position"
              type="text"
              error={errors.position ? true : false}
              label="position"
              {...register("position")}
            ></OutlinedInput>
            <FormHelperText sx={{ color: errors.position ? "red" : "black" }}>
              {errors.position?.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "1em auto" }}>
            <TextField
              {...register("employmentType")}
              defaultValue=""
              error={errors.employmentType ? true : false}
              id="role"
              select
              label="Select Employment type"
            >
              <MenuItem value="full-time">Full Time</MenuItem>
              <MenuItem value="part-time">Part Time</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
            </TextField>
            <FormHelperText error={errors.employmentType ? true : false}>
              {errors.employmentType?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <InputLabel
              htmlFor="workExperience"
              error={errors.workExperience ? true : false}
            >
              Work Experience
            </InputLabel>
            <OutlinedInput
              id="workExperience"
              type="text"
              label="workExperience"
              error={errors.workExperience ? true : false}
              {...register("workExperience")}
            ></OutlinedInput>
            <FormHelperText
              sx={{ color: errors.workExperience ? "red" : "black" }}
            >
              {errors.workExperience?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              {...register("educationalQualification")}
              defaultValue=""
              error={errors.educationalQualification ? true : false}
              id="role"
              select
              label="Select Qualification"
            >
              <MenuItem value="diploma">Diploma</MenuItem>
              <MenuItem value="ug">Under Graduate</MenuItem>
              <MenuItem value="pg">Post Graduate</MenuItem>
              <MenuItem value="phd">Doctorate</MenuItem>
            </TextField>
            <FormHelperText
              sx={{ color: errors.educationalQualification ? "red" : "black" }}
            >
              {errors.educationalQualification?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <InputLabel
              htmlFor="jobDescripton"
              error={errors.jobDescripton ? true : false}
            >
              Job Descripton
            </InputLabel>
            <OutlinedInput
              id="jobDescription"
              type="text"
              label="jobDescription"
              error={errors.jobDescription ? true : false}
              {...register("jobDescription")}
            ></OutlinedInput>
            <FormHelperText
              sx={{ color: errors.jobDescription ? "red" : "black" }}
            >
              {errors.jobDescription?.message}
            </FormHelperText>
          </FormControl>
        </FormGroup>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          style={{ float: "right" }}
        >
          Submit
        </Button>
        <Button
          type="clear"
          variant="outlined"
          style={{ float: "right", marginRight: "1em" }}
        >
          Clear
        </Button>
      </Box>
    </>
  );
}

export default JobPosting;
