import {
  FormControl,
  FormGroup,
  Box,
  Typography,
  Button,
  FormHelperText,
  TextField,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Select,
  Chip,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "../Loader";
import { CollegeSchema } from "../../forms/college";
import { BaseTablesContext } from "../../context/baseTable";
import { getStyles, MenuProps } from "../../utils/MultiSelectConfig";
import { verify } from "../../bloc/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/app";
import { getProfiles, heiUrl, getProfile } from "../../bloc/hei";
import { putData, postData } from "../../bloc/common";
// import { AppContext } from "../../context/app";

function CollegeProfile() {
  const navigate = useNavigate();
//   const { user } = useContext(AppContext);
const [profileData, setProfileData] = useState({});
  useEffect(() => {
    setLoading(true);
    verify()
      .then((val) => {
        if (!val || val?.role !== "HEI") navigate("/login");
      })
      .finally(setLoading(false));
  }, []);

  useEffect(() => {
    verify()
      .then(async (val) => {
        if (val) {
          let profiles = await getProfiles();
          let profile = profiles.filter((el) => el.user == val.userId)[0];
          if (!profile) navigate("/hei/profile");
          let profileD = await getProfile(profile._id);
          if (profileD) {
			setProfileData(profileD);
			console.log(profileData);
          }
        }
      })
      .finally();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CollegeSchema) });
  const theme = useTheme();
  const [streamName, setStreamName] = useState([]);
  const [courseName, setCourseName] = useState([]);
  const [tempCourses, setTempCourses] = useState([]);
  const {
    countries,
    states,
    districts,
    handleStates,
    isLoading,
    handleCountry,
    streams,
    courses,
    setLoading,
  } = useContext(BaseTablesContext);
  const { user } = useContext(AppContext);
  const handleStream = (event) => {
    setCourseName([]);
    const {
      target: { value },
    } = event;
    let data = [];
    for (let i = 0; i < value.length; i++)
      for (let j = 0; j < courses.length; j++) {
        if (value[i]._id === courses[j].stream) data.push(courses[j]);
      }
    setTempCourses(data);
    setStreamName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setValue(
      "streamsOffered",
      value.map((val) => val._id),
      { shouldValidate: true }
    );
  };

  const handleCourse = (event) => {
    const {
      target: { value },
    } = event;
    setCourseName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setValue(
      "coursesOffered",
      value.map((val) => val._id),
      { shouldValidate: true }
    );
  };

  const handleCountryValue = (event) => {
    handleCountry(event);
    setValue("country", event.target.value, { shouldValidate: true });
  };

  const handleStateValue = (event) => {
    handleStates(event);
    setValue("state", event.target.value, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    setLoading(true);
    let finalData = { user: user.userId, ...data };
    getProfiles().then((val) => {
      if (val) {
        let profile = val.filter((el) => el.user === user.userId)[0];
        if (profile?._id) {
          putData(`${heiUrl}/profile/${profile._id}`, finalData).finally(
            setLoading(false)
          );
        } else {
          postData(`${heiUrl}/profile`, finalData).finally(setLoading(false));
        }
      }
    });
  };
  return (
    <>
      <Loader visible={isLoading}></Loader>
      <Toaster></Toaster>
      <Box style={{ width: "80%", margin: "2em auto" }}>
        <Typography variant="h3" style={{ margin: "1em 0" }}>
          College Profile
        </Typography>
        <FormGroup>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              error={errors.instituteName ? true : false}
              id="instituteName"
              label="Institute Name"
              {...register("instituteName")}
            ></TextField>
            <FormHelperText
              sx={{ color: errors.instituteName ? "red" : "black" }}
            >
              {errors.instituteName?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              error={errors.registrationNumber ? true : false}
              id="registrationNumber"
              label="Registration Number"
              {...register("registrationNumber")}
            ></TextField>
            <FormHelperText
              sx={{ color: errors.registrationNumber ? "red" : "black" }}
            >
              {errors.registrationNumber?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              error={errors.regulatoryBody ? true : false}
              id="regulatoryBody"
              label="Regulatory Body"
              {...register("regulatoryBody")}
            ></TextField>
            <FormHelperText
              sx={{ color: errors.regulatoryBody ? "red" : "black" }}
            >
              {errors.regulatoryBody?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              error={errors.foundingYear ? true : false}
              id="foundingYear"
              label="Founding Year"
              {...register("foundingYear")}
            ></TextField>
            <FormHelperText
              sx={{ color: errors.foundingYear ? "red" : "black" }}
            >
              {errors.foundingYear?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              defaultValue=""
              error={errors.country ? true : false}
              id="countries"
              select
              label="Country"
              onChange={handleCountryValue}
            >
              {countries.map((option) => (
                <MenuItem key={option.name} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <FormHelperText sx={{ color: errors.country ? "red" : "black" }}>
              {errors.country?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              defaultValue=""
              id="states"
              select
              label="State"
              error={errors.state ? true : false}
              onChange={handleStateValue}
            >
              {states.map((option) => (
                <MenuItem key={option.name} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <FormHelperText sx={{ color: errors.state ? "red" : "black" }}>
              {errors.state?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              defaultValue=""
              id="districts"
              select
              label="District"
              error={errors.district ? true : false}
              {...register("district")}
            >
              {districts.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <FormHelperText sx={{ color: errors.district ? "red" : "black" }}>
              {errors.district?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              error={errors.landmark ? true : false}
              id="landmark"
              label="Landmark"
              {...register("landmark")}
            ></TextField>
            <FormHelperText sx={{ color: errors.landmark ? "red" : "black" }}>
              {errors.landmark?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              error={errors.street ? true : false}
              id="street"
              label="Street"
              {...register("street")}
            ></TextField>
            <FormHelperText sx={{ color: errors.street ? "red" : "black" }}>
              {errors.street?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              error={errors.pinCode ? true : false}
              id="pinCode"
              label="Pincode"
              {...register("pinCode")}
            ></TextField>
            <FormHelperText sx={{ color: errors.pinCode ? "red" : "black" }}>
              {errors.pinCode?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} fullWidth>
            <InputLabel id="stream-multiple-chip-label" variant="outlined">
              Select Streams
            </InputLabel>
            <Select
              error={errors.streamsOffered ? true : false}
              variant="outlined"
              label="Select Streams"
              defaultValue=""
              labelId="stream-multiple-chip-label"
              id="stream-multiple-chip"
              multiple
              value={streamName}
              onChange={handleStream}
              input={
                <OutlinedInput
                  id="stream-select-multiple-chip"
                  label="Select Streams"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value._id} label={value.name} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {streams.map((option) => (
                <MenuItem
                  key={option._id}
                  value={option}
                  style={getStyles(option.name, streamName, theme)}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText
              sx={{ color: errors.streamsOffered ? "red" : "black" }}
            >
              {errors.streamsOffered?.message}
            </FormHelperText>
          </FormControl>

          <FormControl style={{ margin: "1em 0" }} fullWidth>
            <InputLabel id="course-multiple-chip-label">
              Select Courses
            </InputLabel>
            <Select
              error={errors.coursesOffered ? true : false}
              defaultValue=""
              labelId="course-multiple-chip-label"
              id="course-multiple-chip"
              multiple
              value={courseName}
              onChange={handleCourse}
              input={
                <OutlinedInput
                  id="course-select-multiple-chip"
                  label="Select Courses"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value._id} label={value.name} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {tempCourses.map((option) => (
                <MenuItem
                  key={option._id}
                  value={option}
                  style={getStyles(option.name, courseName, theme)}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText
              sx={{ color: errors.coursesOffered ? "red" : "black" }}
            >
              {errors.coursesOffered?.message}
            </FormHelperText>
          </FormControl>

          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              error={errors.numberOfEmployees ? true : false}
              id="numberOfEmployees"
              label="Number of employees"
              {...register("numberOfEmployees")}
            ></TextField>
            <FormHelperText
              sx={{ color: errors.numberOfEmployees ? "red" : "black" }}
            >
              {errors.numberOfEmployees?.message}
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

export default CollegeProfile;
