import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { verify } from "../../bloc/auth";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
	FaHome,
	FaEdit,
	FaPowerOff,
	FaUser,
	FaUserEdit,
	FaQuestionCircle,
	FaInfoCircle,
	FaPlusSquare,
	FaEye,
	FaUserPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { logout } from "../../bloc/auth";

const theme = createTheme({
	palette: {
		primary: {
			light: "#e6f2ff",
			main: "#001730",
			dark: "#0b002e",
			contrastText: "#fff",
		},
		secondary: {
			light: "#4da6ff",
			main: "#428cd4",
			dark: "#0a69a9",
			contrastText: "#fff",
		},
	},
});

const buttons = [
	<Button
		key="dept"
		component={Link}
		to={"/hei/deptDetails"}
		style={{
			height: "5ch",
			fontSize: "2ch",
			fontWeight: "bold",
			textTransform: "capitalize",
			justifyContent: "left",
			color: "#ffffff",
		}}
	>
		<FaInfoCircle style={{ margin: "0 10px 2px 0" }} />
		Department Details
	</Button>,
	<Button
		key="edit"
		component={Link}
		to={"/hei/profile"}
		style={{
			height: "5ch",
			fontSize: "2ch",
			fontWeight: "bold",
			textTransform: "capitalize",
			justifyContent: "left",
			color: "#ffffff",
		}}
	>
		<FaUserEdit style={{ margin: "0 10px 2px 0" }} />
		Edit Profile
	</Button>,
	<Button
		key="view"
		component={Link}
		to={"/hei/viewProfile"}
		style={{
			height: "5ch",
			fontSize: "2ch",
			fontWeight: "bold",
			textTransform: "capitalize",
			justifyContent: "left",
			color: "#ffffff",
		}}
	>
		<FaUser style={{ margin: "0 10px 2px 0" }} />
		View Profile
	</Button>,
	<Button
		key="job"
		component={Link}
		to={"/hei/postJob"}
		style={{
			height: "5ch",
			fontSize: "2ch",
			fontWeight: "bold",
			textTransform: "capitalize",
			justifyContent: "left",
			color: "#ffffff",
		}}
	>
		<FaPlusSquare style={{ margin: "0 10px 2px 0" }} />
		Post Job Opening
	</Button>,
	<Button
		key="jobPostings"
		component={Link}
		to={"/hei/viewPostings"}
		style={{
			height: "5ch",
			fontSize: "2ch",
			fontWeight: "bold",
			textTransform: "capitalize",
			justifyContent: "left",
			color: "#ffffff",
		}}
	>
		<FaEye style={{ margin: "0 10px 2px 0" }} />
		View Jobs Posted
	</Button>,
	<Button
		key="facultyMembers"
		component={Link}
		to={"/hei/addMembers"}
		style={{
			height: "5ch",
			fontSize: "2ch",
			fontWeight: "bold",
			textTransform: "capitalize",
			justifyContent: "left",
			color: "#ffffff",
		}}
	>
		<FaUserPlus style={{ margin: "0 10px 2px 0" }} />
		Add Faculty Members
	</Button>,
	<Button
		key="changePassword"
		component={Link}
		to={"/changePass"}
		style={{
			height: "5ch",
			fontSize: "2ch",
			fontWeight: "bold",
			textTransform: "capitalize",
			justifyContent: "left",
			color: "#ffffff",
		}}
	>
		<FaEdit style={{ margin: "0 10px 2px 0" }} />
		Change Password
	</Button>,
	<Button
		onClick={logout}
		key="Logout"
		style={{
			height: "5ch",
			fontSize: "2ch",
			fontWeight: "bold",
			textTransform: "capitalize",
			justifyContent: "left",
			color: "#ffffff",
		}}
	>
		<FaPowerOff style={{ margin: "0 10px 2px 0" }} />
		Sign Out
	</Button>,
	<Button
		key="faqs"
		component={Link}
		to={"/faqs"}
		style={{
			height: "5ch",
			fontSize: "2ch",
			fontWeight: "bold",
			textTransform: "capitalize",
			justifyContent: "left",
			color: "#ffffff",
		}}
	>
		<FaQuestionCircle style={{ margin: "0 10px 3px 0" }} />
		FAQs
	</Button>,
];

export default function Aside() {
	const [userName, setuserName] = useState('');

	useEffect(() => {
		verify().then((e) => {
			setuserName(e.firstName);
		})
			.catch((err) => {
				console.log(err);
			})
	}, []);

	return (
		<>
			<ThemeProvider theme={theme}>
				<Box
					sx={{
						width: 300,
						height: "100%", // 447
						backgroundColor: "secondary.main",
						zIndex: "1000",
					}}
					style={{ position: "fixed" }}
				>
					<Box style={{margin:"0.5rem", borderBottom:"1px solid white"}}>
						<Typography variant="h4" style={{ color: "white", margin:"auto", padding:"1.5rem" }}>
							Welcome, {userName}
						</Typography>
					</Box>
					<ButtonGroup
						disableElevation
						orientation="vertical"
						variant="text"
						color="secondary"
						style={{ margin: "5ch 1ch 0 1ch", position: "fixed" }}
					>
						{buttons}
					</ButtonGroup>
				</Box>
			</ThemeProvider>
		</>
	);
}
