import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { verify } from "../../bloc/auth";
import { Typography } from "@mui/material";
import CustomStatsToolPanel from "./customStatsToolPanel";
import {
	FaHome,
	FaEdit,
	FaPowerOff,
	FaList,
	FaQuestionCircle,
	FaColumns,
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
			main: "#4b9af8",
			dark: "#0a69a9",
			contrastText: "#fff",
		},
	},
});

const buttons = [
	<Button
		key="home"
		component={Link}
		to={"/"}
		style={{
			height: "5ch",
			fontSize: "2ch",
			fontWeight: "bold",
			textTransform: "capitalize",
			justifyContent: "left",
			color: "#ffffff",
		}}
	>
		<FaHome style={{ margin: "0 10px 2px 0" }} />
		Home
	</Button>,
	<Button
		key="dept"
		component={Link}
		to={"/aicte/viewHeis"}
		style={{
			height: "5ch",
			fontSize: "2ch",
			fontWeight: "bold",
			textTransform: "capitalize",
			justifyContent: "left",
			color: "#ffffff",
		}}
	>
		<FaList style={{ margin: "0 10px 2px 0" }} />
		View Colleges
	</Button>,
	<Button
		key="dept"
		component={Link}
		to={"/aicte/verifyhei"}
		style={{
			height: "5ch",
			fontSize: "2ch",
			fontWeight: "bold",
			textTransform: "capitalize",
			justifyContent: "left",
			color: "#ffffff",
		}}
	>
		<FaList style={{ margin: "0 10px 2px 0" }} />
		Verify College
	</Button>,
	<Button
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

export default function AicteDashboard() {
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
						width: "300px",
						height: "100%", // 447
						backgroundColor: "secondary.main",
						zIndex: "1000",
					}}
					style={{ position: "fixed" }}
				>
					<Box style={{ margin: "0.5rem", borderBottom: "1px solid white" }}>
						<Typography variant="h4" style={{ color: "white", margin: "auto", padding: "1.5rem" }}>
							Welcome, {userName}
						</Typography>
					</Box>
					<ButtonGroup
						disableElevation
						orientation="vertical"
						variant="text"
						color="secondary"
						style={{ margin: "3ch 1ch 0 1ch", position: "fixed" }}
					>
						{buttons}
					</ButtonGroup>
				</Box>
			</ThemeProvider>
		</>
	);
}
