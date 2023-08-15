import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { BaseTablesContext } from "../../context/baseTable";
import { AppContext } from "../../context/app";
import { demographicSchema } from "../../forms/faculty";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster } from "react-hot-toast";
import { FormHelperText } from "@mui/material";
import Loader from "../Loader";
import { useForm } from "react-hook-form";
import { getDemographics } from "../../bloc/details";
import { putData, postData } from "../../bloc/common";

export default function Demographic({ handleNext }) {
	const { user } = useContext(AppContext);

	const { castes, religions, figs, isLoading, setLoading } =
		useContext(BaseTablesContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "onChange", resolver: yupResolver(demographicSchema) });

	function submit(data) {
		console.log(user)
		const apiUrl = `${process.env.REACT_APP_BACK_URL}/api/details/demographic`;
		setLoading(true);
		getDemographics()
			.then((val) => {
				if (val) {
					let demo = val.filter((el) => el.user === user.userId)[0];
					if (demo) {
						putData(`${apiUrl}/${demo._id}`, {
							user: user.userId,
							...data,
						});
					} else {
						postData(apiUrl, { user: user.userId, ...data });
					}
				}
			})
			.finally(setLoading(false));
		setTimeout(handleNext, 1500);
	}

	return (
		<>
			<Toaster></Toaster>
			<Loader visible={isLoading}></Loader>
			<Box sx={{ width: "80%" }}>
				<FormControl fullWidth sx={{ margin: "1em auto" }}>
					<TextField
						defaultValue=""
						error={errors.caste ? true : false}
						id="castes"
						select
						label="Caste"
						{...register("caste")}
					>
						{castes.map((option) => (
							<MenuItem key={option._id} value={option._id}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
					<FormHelperText error={errors.caste ? true : false}>
						{errors.caste?.message}
					</FormHelperText>
				</FormControl>
				<FormControl fullWidth sx={{ margin: "1em auto" }}>
					<TextField
						defaultValue=""
						id="religions"
						select
						label="Religion"
						error={errors.religion ? true : false}
						{...register("religion")}
					>
						{religions.map((option) => (
							<MenuItem key={option._id} value={option._id}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
					<FormHelperText error={errors.religion ? true : false}>
						{errors.religion?.message}
					</FormHelperText>
				</FormControl>
				<FormControl fullWidth sx={{ margin: "1em auto" }}>
					<TextField
						defaultValue=""
						id="figs"
						select
						label="Family Income Groups"
						error={errors.familyincomegroup ? true : false}
						{...register("familyincomegroup")}
					>
						{figs.map((option) => (
							<MenuItem key={option._id} value={option._id}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
					<FormHelperText error={errors.familyincomegroup ? true : false}>
						{errors.familyincomegroup?.message}
					</FormHelperText>
				</FormControl>
				<Button variant="contained" onClick={handleSubmit(submit)}>
					Save and next
				</Button>
			</Box>
		</>
	);
}
