import {
  FormControl,
  FormGroup,
  InputLabel,
  Box,
  Typography,
  Button,
  FormHelperText,
  OutlinedInput,
  Chip,
  TextField,
  MenuItem,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader";
import { JobApplicationSchema } from "../../forms/faculty";
import { AppContext } from "../../context/app";
import { postData } from "../../bloc/common";
import {
  getApplications,
  getPostings,
  getProfiles,
  heiUrl,
} from "../../bloc/hei";
import { detailsUrl, getApplicationStats } from "../../bloc/details";
import { verify } from "../../bloc/auth";

function JobApplication() {
  const { user } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(JobApplicationSchema) });
  const [visibility, setVisibility] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    verify().then(async (val) => {
      let applications = await getApplications();
      let application = applications.filter(
        (el) => el.posting == params.postingId && el.user._id == val.userId
      )[0];
      if (application) {
        toast.error("Already applied", { duration: 1400 });
        setTimeout(() => navigate("/faculty/applicationStatus"), 2000);
      }
    });
    setValue("posting", params.postingId, { shouldValidate: true });
    setValue("user", user.userId, { shouldValidate: true });
    if (user.role != "User") navigate("/searchJobs");
  }, []);

  const handleHardSkills = (event, value) => {
    setValue("hardSkills", value, { shouldValidate: true });
  };
  const handleSoftSkills = (event, value) => {
    setValue("softSkills", value, { shouldValidate: true });
  };
  const onSubmit = (data) => {
    setVisibility(true);
    postData(`${heiUrl}/application`, data)
      .then(async (v) => {
        let postings = await getPostings();
        let posting = postings.filter((el) => el._id == data.posting)[0];
        let statData = {
          user: user.userId,
          applicationStatus: "Applied",
          date: Date.now(),
          position: data.position,
          higherEducationInstitution: posting?.higherEducationInstitution._id,
          posting: posting?._id,
        };
        if (v) {
          postData(`${detailsUrl}/applicationStatus`, statData)
            .then((val) => console.log(val))
            .finally(setVisibility(false));
        }
      })
      .catch((error) => console.error(error))
      .finally(setVisibility(false));
  };
  return (
    <>
      <Loader visible={visibility}></Loader>
      <Toaster></Toaster>
      <Box style={{ width: "80%", margin: "10em auto" }}>
        <Typography variant="h3" style={{ margin: "1em 0" }}>
          Job Application
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
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
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
            <FormHelperText
              sx={{ color: errors.employmentType ? "red" : "black" }}
            >
              {errors.employmentType?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <Autocomplete
              multiple
              id="hard-skills"
              onChange={handleHardSkills}
              options={[]}
              freeSolo
              renderTags={(value, getTagProps) => {
                return value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Hard Skills"
                  placeholder="Hard Skills"
                />
              )}
            />
            <FormHelperText sx={{ color: errors.hardSkills ? "red" : "black" }}>
              {errors.hardSkills?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <Autocomplete
              multiple
              id="soft-skills"
              onChange={handleSoftSkills}
              options={[]}
              freeSolo
              renderTags={(value, getTagProps) => {
                return value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Soft Skills"
                  placeholder="Soft Skills"
                />
              )}
            />
            <FormHelperText sx={{ color: errors.softSkills ? "red" : "black" }}>
              {errors.softSkills?.message}
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
            <InputLabel
              htmlFor="educationalQualification"
              error={errors.educationalQualification ? true : false}
            >
              Educational Qualification
            </InputLabel>
            <OutlinedInput
              id="educationalQualification"
              type="text"
              label="educationalQualification"
              error={errors.educationalQualification ? true : false}
              {...register("educationalQualification")}
            ></OutlinedInput>
            <FormHelperText
              sx={{ color: errors.educationalQualification ? "red" : "black" }}
            >
              {errors.educationalQualification?.message}
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

export default JobApplication;
