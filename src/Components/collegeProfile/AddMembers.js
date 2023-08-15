import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  TextField,
  FormHelperText,
  FormGroup,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { FacultyMemberSchema } from "../../forms/college";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useForm } from "react-hook-form";
import { postData } from "../../bloc/common";
import { getProfiles, heiUrl } from "../../bloc/hei";
import { verify } from "../../bloc/auth";
import Loader from "../Loader";
import { Toaster } from "react-hot-toast";

function AddMembers() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(FacultyMemberSchema) });
  let twentyYears = new Date(
    new Date().setFullYear(new Date().getFullYear() - 22)
  );
  const [value, setDate] = useState(twentyYears);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    setVisibility(true);
    verify()
      .then(async (val) => {
        let profiles = await getProfiles();
        let profile = profiles.filter((el) => el.user == val.userId)[0];
        if (profile?._id) setValue("higherEducationInstitution", profile._id);
      })
      .finally(setVisibility(false));
  }, []);
  const handleDate = (val) => {
    setDate(val);
    setValue("dob", val.toDate(), { shouldValidate: true });
  };

  const onSubmit = (data) => {
    setVisibility(true);
    if (data)
      postData(`${heiUrl}/faculty`, data)
        .then((val) => console.log(val))
        .finally(setVisibility(false));
  };
  return (
    <>
      <Toaster></Toaster>
      <Loader visible={visibility}></Loader>
      <Box style={{ width: "80%", margin: "2em auto" }}>
        <Typography variant="h5">Add Member</Typography>
        <FormGroup>
          <FormControl style={{ margin: "2em 0 1em 0" }}>
            <TextField
              error={errors.fullName ? true : false}
              id="fullName"
              label="Full Name"
              {...register("fullName")}
            ></TextField>
            <FormHelperText sx={{ color: errors.fullName ? "red" : "black" }}>
              {errors.fullName?.message}
            </FormHelperText>
          </FormControl>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <TextField
              {...register("designation")}
              error={errors.designation ? true : false}
              id="designation"
              label="Designation"
            ></TextField>
            <FormHelperText
              sx={{ color: errors.designation ? "red" : "black" }}
            >
              {errors.designation?.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "1em auto" }}>
            <TextField
              {...register("department")}
              error={errors.department ? true : false}
              id="department"
              label="Department"
            ></TextField>
            <FormHelperText error={errors.department ? true : false}>
              {errors.department?.message}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ margin: "1em auto" }}>
            <TextField
              {...register("qualification")}
              error={errors.qualification ? true : false}
              id="qualification"
              label="Qualification"
            ></TextField>
            <FormHelperText error={errors.qualification ? true : false}>
              {errors.qualification?.message}
            </FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            style={{ flexDirection: "row" }}
            sx={{ margin: "1em auto" }}
          >
            <FormControl style={{ width: "45%", marginRight: "auto" }}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <MobileDatePicker
                  label="Select DOB"
                  inputFormat="dd/MM/yyyy"
                  value={value}
                  onChange={handleDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <FormHelperText error={errors.dob ? true : false}>
                {errors.dob?.message}
              </FormHelperText>
            </FormControl>
            <FormControl style={{ width: "45%" }}>
              <TextField
                defaultValue=""
                {...register("gender")}
                error={errors.gender ? true : false}
                id="gender"
                select
                label="Select Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <FormHelperText error={errors.gender ? true : false}>
                {errors.gender?.message}
              </FormHelperText>
            </FormControl>
          </FormControl>
        </FormGroup>
        <Button
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

export default AddMembers;
