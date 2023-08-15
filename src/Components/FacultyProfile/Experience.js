import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';

import { experienceSchema } from '../../forms/faculty';
import { getExperiences } from '../../bloc/details';

import { yupResolver } from "@hookform/resolvers/yup";
import { AppContext } from '../../context/app';


export default function Experience({ handleNext }) {
const {user} = useContext(AppContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	  } = useForm({ mode: "onChange", resolver: yupResolver(experienceSchema) });

	function submit(data) {
		const apiUrl = `${process.env.REACT_APP_BACK_URL}/api/details/experience`;
		// setLoading(true);
		getExperiences()
			.then((val) => {
				if (val) {
					let exp = val.filter((el) => el.user === user.userId)[0];
					console.log(exp);
					if (exp?._id) {
						putData(`${apiUrl}/${exp._id}`, {
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
			// .finally(setLoading(false));
	}

	return (
		<Box sx={{ minWidth: 1000 }}>
			<div>
				<TextField id="outlined-basic" label="Job Title" variant="outlined" 
            {...register("jobTitle")}
			/>
			</div>
			<div>
				<TextField id="outlined-basic" label="Organization Name" variant="outlined" {...register("organizationName")} />
			</div>
			<div>
				<TextField id="outlined-basic" label="Place" variant="outlined" {...register("place")} />
			</div>
			<div>
				<TextField id="outlined-basic" label="Job Type" variant="outlined" {...register("jobType")} />
			</div>
			<div>
				<TextField id="outlined-basic" label="Responsibility" variant="outlined" {...register("responsibility")} />
			</div>
			<div>
				<TextField id="outlined-basic" label="Experience" variant="outlined" {...register("experience")} />
			</div>
			<Button variant="contained"  onClick={handleSubmit(submit)}>Save and next</Button>
		</Box>
	);
}
