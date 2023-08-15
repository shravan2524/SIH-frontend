import {
	FormControl,
	FormGroup,
	InputLabel,
	Button,
	FormHelperText,
	Box,
	OutlinedInput,
	FormControlLabel,
	Grid,
	Link,
	AppBar,
	Toolbar,
	Tooltip,
	IconButton,
	MenuItem,

} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { changePasswordSchema } from "../forms/auth";
import { useTheme } from '@mui/material/styles';
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Components/Loader";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { login, verify } from "../bloc/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/app";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const images = [
	{
		label: 'Education is the kindling of a flame, not the filling of a vessel.',
		writer: '–Socrates',
		imgPath:
			'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
	},
	{
		label: 'Man’s mind, once stretched by a new idea, never regains its original dimensions.',
		writer: '–Oliver Wendell Holmes',
		imgPath:
			'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
	},
	{
		label: 'Being a student is easy. Learning requires actual work.',
		writer: 'William Crawford',
		imgPath:
			'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
	},
	{
		label: ' Education is not the filling of a pot but the lighting of a fire.',
		writer: 'W.B. Yeats',
		imgPath:
			'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
	},
];
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export const apiUrl = `${process.env.REACT_APP_BACK_URL}/api/auth`;

function ChangePass() {
	const theme = useTheme();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(changePasswordSchema) });
	const [visibility, setVisibility] = useState(false);
	const { user } = useContext(AppContext);
	const [activeStep, setActiveStep] = React.useState(0);
	const navigate = useNavigate();
	const handleStepChange = (step) => {
		setActiveStep(step);
	};
	const onSubmit = (data) => {
		console.log(user)
		setVisibility(true);
		console.log(data);
		axios.post(`${apiUrl}/resetPassword`, { userId: user.id, currentPassword: data.currentPassword, newPassword: data.newPassword })
			.then((e) => {
				console.log(e.data);
				toast.success(e.data["message"]);
				setTimeout(() => navigate('/login'),1000)
			})
			.catch((errors) => {
				console.log(errors);
				toast.error(errors);
			})
			.finally(setVisibility(false));
	};
	return (
		<>
			<Loader visible={visibility}></Loader>
			<Toaster></Toaster>
			<Box style={{ display: "flex", }}>
				<Box style={{ width: "35%", backgroundColor: "#3ab0c7", height: "100vh" }}>
					<Box sx={{ maxWidth: 400, flexGrow: 1, backgroundColor: "#3ab0c7", paddingLeft: "1rem" }}>
						<Paper
							square
							elevation={0}
							sx={{
								display: 'flex',
								alignItems: 'center',
								pl: 2,
								margin: "auto",
								backgroundColor: "#3ab0c7",
								marginTop: "35vh"
							}}
						>
							<Typography style={{ fontSize: "2rem" }}>{images[activeStep].label}
								<Typography style={{ fontSize: "1.5rem", fontFamily: "cursive" }}>{images[activeStep].writer}</Typography>
							</Typography>

						</Paper>
						<AutoPlaySwipeableViews
							axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
							index={activeStep}
							onChangeIndex={handleStepChange}
							enableMouseEvents
						>
							{images.map((step, index) => (
								<div key={step.label}>
									{Math.abs(activeStep - index) <= 2 ? (
										<Box />
									) : null}
								</div>
							))}
						</AutoPlaySwipeableViews>
					</Box>
					<Box style={{ marginTop: "25vh", textAlign: "center" }}>
						<Box>
							<img src="https://www.aicte-india.org/sites/default/files/logo_new.png" width="200px" height="50px" />
						</Box>
					</Box>
				</Box>
				<Box style={{ width: "60%", margin: "10em auto", padding: "0 15rem" }}>
					<Typography variant="h3" style={{ margin: "1em 0" }}>
						Change Password
					</Typography>
					<FormGroup>
						<FormControl style={{ margin: "1em 0" }} variant="outlined">
							<InputLabel htmlFor="email" error={errors.email ? true : false}>
								Current password
							</InputLabel>
							<OutlinedInput
								id="currentPassword"
								type="password"
								error={errors.currentPassword ? true : false}
								label="currentPassword"
								{...register("currentPassword")}
							></OutlinedInput>
							<FormHelperText sx={{ color: errors.currentPassword ? "red" : "black" }}>
								{errors.currentPassword?.message}
							</FormHelperText>
						</FormControl>
						<FormControl style={{ margin: "1em 0" }} variant="outlined">
							<InputLabel
								htmlFor="newPassword"
								error={errors.newPassword ? true : false}
							>
								New Password
							</InputLabel>
							<OutlinedInput
								id="newPassword"
								type="password"
								label="newPassword"
								error={errors.newPassword ? true : false}
								{...register("newPassword")}
							></OutlinedInput>
							<FormHelperText sx={{ color: errors.newPassword ? "red" : "black" }}>
								{errors.newPassword?.message}
							</FormHelperText>
						</FormControl>
					</FormGroup>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						onClick={handleSubmit(onSubmit)}
						variant="contained"
						style={{ float: "right", color: "white" }}
					>
						Submit
					</Button>
					<Grid container style={{ marginTop: "1rem" }}>
						<Grid item xs>
							<Link href="/forgotpassword" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</>
	);
}

export default ChangePass;