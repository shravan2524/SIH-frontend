import React, { useContext, useState } from "react";
import Loader from "../Components/Loader";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MobileDatePicker } from "@mui/x-date-pickers";
import {
	Typography,
	FormGroup,
	FormControl,
	TextField,
	FormHelperText,
	Button,
	MenuItem,
	InputLabel,
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControlLabel,
	Grid,
	Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../forms/auth";
import { useTheme } from '@mui/material/styles';
import { signUp, getRoles } from "../bloc/auth";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import './style.css';
// import AuthLetterFormat1 from "./AuthLetterFormat1.pdf";

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

function Signup() {
	const theme = useTheme();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({ resolver: yupResolver(signupSchema) });
	const [visibility, setVisibility] = useState(false);
	const [showPass, setShowPass] = useState(false);
	const [showCnfPass, setCnfPass] = useState(false);
	const [value, setDate] = useState(Date.now());
	const [role, setrole] = useState('HEI');
	const navigate = useNavigate();
	const [activeStep, setActiveStep] = React.useState(0);
	const handleDate = (val) => {
		setDate(val);
		setValue("dob", val.toDate(), { shouldValidate: true });
	};
	const handleStepChange = (step) => {
		setActiveStep(step);
	};
	const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
	const handleShowPassword = () => setShowPass(!showPass);
	const handleShowCnfPass = () => setCnfPass(!showCnfPass);
	const onSubmit = (data) => {
		setVisibility(true);
		let finalData = data;
		delete finalData.confirmPassword;
		getRoles().then((roles) => {
			let roleReq = roles.filter((el) => el.name === role)[0];
			finalData.role = roleReq._id;
			signUp(finalData).then((val) => {
				if (val) {
					setTimeout(() => navigate(`/verifyEmail/${val.data.userId}`), 1400);
					setVisibility(false);
				}
			});
		});
	};
	return (
		<>
			<Loader visible={visibility}></Loader>
			<Toaster></Toaster>
			<Box style={{ display: "flex" }}>
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
				<Box style={{ width: "60%", margin: "2em auto", padding: "0 15rem", }}>
					<Typography variant="h3" style={{ margin: "1em 0" }}>
						Signup
					</Typography>
					<FormGroup>
						<Box style={{ display: "flex" }}>
							<FormControl style={{ width: "45%", marginRight: "auto" }}>
								<TextField
									error={errors.firstName ? true : false}
									id="firstName"
									label="First Name"
									{...register("firstName")}
								></TextField>
								<FormHelperText sx={{ color: errors.firstName ? "red" : "black" }}>
									{errors.firstName?.message}
								</FormHelperText>
							</FormControl>
							<FormControl style={{ width: "45%" }}>
								<TextField
									{...register("lastName")}
									error={errors.lastName ? true : false}
									id="lastName"
									label="Last Name"
								></TextField>
								<FormHelperText error={errors.lastName ? true : false}>
									{errors.lastName?.message}
								</FormHelperText>
							</FormControl>
						</Box>
						<FormControl fullWidth sx={{ margin: "1em auto" }}>
							<TextField
								{...register("email")}
								error={errors.email ? true : false}
								id="email"
								label="Email"
							></TextField>
							<FormHelperText error={errors.email ? true : false}>
								{errors.email?.message}
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
						<FormControl fullWidth sx={{ margin: "1em auto" }}>
							<TextField
								{...register("mobile")}
								error={errors.mobile ? true : false}
								id="mobile"
								label="Mobile Number"
							></TextField>
							<FormHelperText error={errors.mobile ? true : false}>
								{errors.mobile?.message}
							</FormHelperText>
						</FormControl>
						<Box style={{ display: "flex", marginTop:"1em" }}>
							<FormControl style={{ width: "45%", marginRight: "auto" }}>
								<TextField
									type={showPass ? "text" : "password"}
									{...register("password")}
									error={errors.password ? true : false}
									id="password"
									label="Password"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleShowPassword}
												>
													{showPass ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
								></TextField>
								<FormHelperText error={errors.password ? true : false}>
									{errors.password?.message}
								</FormHelperText>
							</FormControl>
							<FormControl style={{ width: "45%", }}>
								<TextField
									type={showCnfPass ? "text" : "password"}
									{...register("confirmPassword")}
									error={errors.confirmPassword ? true : false}
									id="confirmPassword"
									label="Confirm Password"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle confirm password visibility"
													onClick={handleShowCnfPass}
												>
													{showCnfPass ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
								></TextField>
								<FormHelperText error={errors.confirmPassword ? true : false}>
									{errors.confirmPassword?.message}
								</FormHelperText>
							</FormControl>
						</Box>
						
						<Box style={{display:"flex", marginTop:"1em" }}>
						<FormControl style={{ width: "45%" ,  marginRight: "auto"}}>
							<TextField
								id="COllege ID"
								label="College ID"
							></TextField>
						</FormControl>
						<FormControl style={{ width: "45%" }}>
							<input
								type="file"
								id="COllege ID"
								label="File Upload"
							/>
						</FormControl>
						</Box>
					</FormGroup>
					<a style={{marginTop:"1rem"}} href='https://drive.google.com/file/d/1pkNiMxRhpePuVEQgJ-9rCqP4apwGHOnX/view?usp=sharing' download="Auth Letter">Downlaod Auth Format Document</a>
					<Button
						onClick={handleSubmit(onSubmit)}
						variant="contained"
						style={{ float: "right", color: "white" }}
					>
						Submit
					</Button>
				</Box>
			</Box>
		</>
	);
}

export default Signup;
