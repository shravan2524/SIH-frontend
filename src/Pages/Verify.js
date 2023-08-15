import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Box,
  FormGroup,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import { Toaster } from "react-hot-toast";
import Loader from "../Components/Loader";
import { postData } from "../bloc/common";
import { authUrl } from "../bloc/auth";
function Verify() {
  const [value, setValue] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const onSubmit = () => {
    setVisibility(true);
    const data = {
      userId: params.uid,
      otp: value,
    };
    console.log(data);
    postData(`${authUrl}/verifyOtp`, data)
      .then((val) => {
        if (val.status == "success") setTimeout(() => navigate("/login"), 1400);
      })
      .finally(setVisibility(false));
  };

  return (
    <>
      <Toaster></Toaster>
      <Loader visible={visibility}></Loader>
      <Box style={{ width: "80%", margin: "10em auto" }}>
        <Typography variant="h3" style={{ margin: "1em 0" }}>
          Verify Email
        </Typography>
        <FormGroup>
          <FormControl style={{ margin: "1em 0" }} variant="outlined">
            <InputLabel htmlFor="otp">Otp</InputLabel>
            <OutlinedInput
              id="otp"
              type="text"
              onChange={handleChange}
              label="OTP"
            ></OutlinedInput>
          </FormControl>
        </FormGroup>
        <Button
          type="submit"
          onClick={onSubmit}
          variant="contained"
          style={{ float: "right" }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
}

export default Verify;
