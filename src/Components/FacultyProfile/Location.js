import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Loader from "../Loader";
import { loactionSchema } from "../../forms/faculty";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BaseTablesContext } from "../../context/baseTable";
import { AppContext } from "../../context/app";
import { FormHelperText } from "@mui/material";
import { getLocations } from "../../bloc/details";
import { postData, putData } from "../../bloc/common";
import { Toaster } from "react-hot-toast";

export default function Location({ handleNext }) {
  const { user } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange", resolver: yupResolver(loactionSchema) });
  const {
    countries,
    states,
    districts,
    handleStates,
    isLoading,
    handleCountry,
    setLoading,
  } = useContext(BaseTablesContext);

  function submit(data) {
    const apiUrl = `${process.env.REACT_APP_BACK_URL}/api/details/location`;
    setLoading(true);
    getLocations()
      .then((val) => {
        if (val) {
          let location = val.filter((el) => el.user === user.userId)[0];
		  console.log(location);
          if (location?._id) {
            putData(`${apiUrl}/${location._id}`, {
              user: user.userId,
              ...data,
            }).then((_) => handleNext());
          } else {
            postData(apiUrl, { user: user.userId, ...data }).then(
				() => handleNext()
            );
          }
        }
      })
      .finally(setLoading(false));
  }

  const handleC = (event) => {
    handleCountry(event);
    setValue("country", event.target.value, { shouldValidate: true });
  };

  const handleS = (event) => {
    handleStates(event);
    setValue("state", event.target.value, { shouldValidate: true });
  };

  return (
    <>
      <Toaster></Toaster>
      <Loader visible={isLoading}></Loader>
      <Box sx={{ width: "100%" }}>
        <FormControl fullWidth sx={{ margin: "1em auto" }}>
          <TextField
            defaultValue=""
            error={errors.country ? true : false}
            id="countries"
            select
            label="Country"
            onChange={handleC}
          >
            {countries.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <FormHelperText error={errors.country ? true : false}>
            {errors.country?.message}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ margin: "1em auto" }}>
          <TextField
            defaultValue=""
            id="states"
            select
            label="State"
            error={errors.state ? true : false}
            onChange={handleS}
          >
            {states.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <FormHelperText error={errors.state ? true : false}>
            {errors.state?.message}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ margin: "1em auto" }}>
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
          <FormHelperText error={errors.district ? true : false}>
            {errors.district?.message}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ margin: "1em auto" }}>
          <TextField
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            id="outlined-basic"
            label="Pincode"
            variant="outlined"
            error={errors.pincode ? true : false}
            {...register("pincode")}
          />
          <FormHelperText error={errors.pincode ? true : false}>
            {errors.pincode?.message}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ margin: "1em auto" }}>
          <TextField
            id="outlined-basic"
            label="Address 1"
            variant="outlined"
            error={errors.address1 ? true : false}
            {...register("address1")}
          />
          <FormHelperText error={errors.address1 ? true : false}>
            {errors.address1?.message}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth sx={{ margin: "1em auto" }}>
          <TextField
            id="outlined-basic"
            label="Address 2"
            variant="outlined"
            error={errors.address2 ? true : false}
            {...register("address2")}
          />
          <FormHelperText error={errors.address2 ? true : false}>
            {errors.address2?.message}
          </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          sx={{ marginTop: "2em" }}
          onClick={handleSubmit(submit)}
        >
          Save and next
        </Button>
      </Box>
    </>
  );
}
