import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import ButtonGroup from "@mui/material/ButtonGroup";
import {
	FaTwitterSquare,
	FaFacebookSquare,
	FaLinkedin,
	FaInstagramSquare,
} from "react-icons/fa";
// import { Link } from "react-router-dom";

const theme = createTheme({
	palette: {
		// primary: {
		// 	light: "#e6f2ff",
		// 	main: "#001730",
		// 	dark: "#0b002e",
		// 	contrastText: "#fff",
		// },
		primary: {
						light: "#000000",
						main: "#1B1D21",
						dark: "#505662",
						contrastText: "#fff",
					},
		secondary: {
			light: "#eafafa",
			main: "#4AD7D1",
			dark: "#125450",
			contrastText: "#fff",
		},
	},
});

export default function Footer() {
	return (
		<>
			<React.Fragment>
				<ThemeProvider theme={theme}>
					<AppBar
						position="fixed"
						color="primary"
						sx={{ top: "auto", bottom: 0 }}
						style={{display: "flex", flexDirection: "row",justifyContent: "space-between"}}
					>
						<Toolbar style={{ padding: "0 0 0 0"}}>
							<Box
								sx={{
									flexGrow: 1,
								}}
								style={{
									// width: "5ch",
									// display: "flex",
									// flexDirection: "column",
									// justifyContent: "flex-end",
									// alignContent: "space-between",
									textAlign: "center",
									"& > *": { m: 1 },
									fontSize: "1.5ch",
									margin: "1ch 0 0 1ch",
									color: "#fff",
								}}
							>
								All India Council for Technical Education <br />
								This site is designed, developed & hosted by team Bit by Bit.
							</Box>
							</Toolbar>
							<Toolbar style={{ padding: "0 0 0 0"}}>
							{/* <Box
								sx={{
									flexGrow: 1,
								}}
								style={{
									display: "flex",
									flexDirection: "column",
									"& > *": { m: 1 },
									justifyContent: "center",
									textAlign: "center",
								}}
							> */}
							{/* <Typography
										variant="caption"
										style={{
											margin: "2ch 2ch 1.4ch 2ch",
											textAlign: "center",
											fontWeight: "normal",
										}}
									>
										EXPLORE
									</Typography> */}
							{/* <ButtonGroup
									orientation="vertical"
									aria-label="vertical contained button group"
									variant="text"
									color="primary"
									style={{ margin: "0 0 0 20ch" }}
								>
									{buttons}
								</ButtonGroup>
							</Box>
							<Box
								sx={{
									flexGrow: 1,
								}}
								style={{
									display: "flex",
									flexDirection: "column",
									"& > *": { m: 1 },
									justifyContent: "center",
									textAlign: "center",
								}}
							>
								<ButtonGroup
									orientation="vertical"
									aria-label="vertical contained button group"
									variant="text"
									color="primary"
									style={{ margin: "0 0 0 0ch" }}
								>
									{buttons2}
								</ButtonGroup>
							</Box> */}
							{/* <Box
								sx={{
									flexGrow: 1,
								}}
								style={{
									width: "auto",
									display: "flex",
									// flexDirection: "column",
									justifyContent: "right",
									alignContent: "space-between",
									textAlign: "center",
									"& > *": { m: 1 },
									fontSize: "1.5ch",
									margin: "1ch 0 0 1ch",
									color: "#fff",
								}}
							> */}
								<div
									style={{
										margin: "1ch 3ch 2ch 2ch",
										display: "block",
										justifyContent: "center",
										alignContent: "space-between",
										textAlign: "center",
									}}
								>
									{/* <Typography
										variant="caption"
										style={{
											justifyContent: "center",
											textAlign: "center",
											fontWeight: "normal",
											display: "flex",
											flexDirection: "row",
											paddingBottom: "1ch",
										}}
									>
										Get Connected
									</Typography> */}
									<a
										href="/instagram.com"
										target="_self"
										aria-label="Instagram"
									>
										<FaInstagramSquare
											style={{
												height: "20px",
												width: "auto",
												margin: "1ch 2ch 0 0",
												color: "white",
												justifyContent: "center",
												textAlign: "center"
											}}
										/>
									</a>
									<a href="/facebook.com">
										<FaFacebookSquare
											style={{
												height: "20px",
												width: "auto",
												margin: "1ch 2ch 0 0",
												color: "white",
												justifyContent: "center",
												textAlign: "center"
											}}
										/>
									</a>
									<a href="/LinkedIn" target="_self" aria-label="LinkedIn">
										<FaTwitterSquare
											style={{
												height: "20px",
												width: "auto",
												margin: "1ch 2ch 0 0",
												color: "white",
												justifyContent: "center",
												textAlign: "center"
											}}
										/>
									</a>
									<a href="/linkedin.com">
										<FaLinkedin
											style={{
												height: "20px",
												width: "auto",
												margin: "1ch 2ch 0 0",
												color: "white",
												justifyContent: "center",
												textAlign: "center"
											}}
										/>
									</a>
									<br />
									<Typography
										variant="caption"
										style={{
											justifyContent: "center",
											textAlign: "center",
											fontWeight: "normal",
											margin: "2ch 2ch 0 0",
											opacity: "50%",
										}}
									>
										@ 2022 Bit-by-Bit. All rights reserved.
									</Typography>
								</div>
							{/* </Box> */}
						</Toolbar>
					</AppBar>
				</ThemeProvider>
			</React.Fragment>
		</>
	);
}
