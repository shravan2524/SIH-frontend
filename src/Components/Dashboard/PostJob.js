import React from "react";
import { Box } from "@mantine/core";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme({
	palette: {
		primary: {
			light: "#639d93",
			main: "#3D8579",
			dark: "#2a5d54",
			contrastText: "#fff",
		},
	},
});

export default function PostJob() {
	const [age, setAge] = React.useState("");

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<div>
			<h2 style={{ margin: "1rem 1rem 1rem 15rem" }}>Job Openings</h2>
			<Box
				sx={(theme) => ({
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[6]
							: theme.colors.gray[0],
					textAlign: "center",
					padding: theme.spacing.xl,

					"&:hover": {
						backgroundColor:
							theme.colorScheme === "dark"
								? theme.colors.dark[5]
								: theme.colors.gray[1],
					},
				})}
				style={{ border: "1px solid black", margin: "1rem 1rem 10rem 15rem" }}
			>
				<Box
					sx={(theme) => ({
						backgroundColor: "white",
						textAlign: "left",
						padding: theme.spacing.xl,
					})}
				>
					{/* <FormControl> */}
					<FormLabel
						id="demo-radio-buttons-group-label"
						style={{ fontSize: "large", fontWeight: "bold" }}
					>
						Position
					</FormLabel>
					<ThemeProvider theme={theme}>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							name="radio-buttons-group"
							color="primary"
							style={{ margin: "0 0 2ch 1ch" }}
						>
							<FormControlLabel
								value="hod"
								control={<Radio size="small" />}
								style={{ fontSize: "15px" }}
								label="Head of the Department"
							/>
							<FormControlLabel
								value="aco"
								control={<Radio size="small" />}
								style={{ fontSize: "15px" }}
								label="Academic Co-ordinator"
							/>
							<FormControlLabel
								value="srProf"
								control={<Radio size="small" />}
								style={{ fontSize: "15px" }}
								label="Senior Professor"
							/>
							<FormControlLabel
								value="assProf"
								control={<Radio size="small" />}
								style={{ fontSize: "15px" }}
								label="Assistant Professor"
							/>
							<FormControlLabel
								value="labAssistant"
								control={<Radio size="small" />}
								style={{ fontSize: "15px" }}
								label="Lab Assistant"
							/>
						</RadioGroup>
					</ThemeProvider>
					<FormLabel
						id="demo-radio-buttons-group-label"
						style={{ fontSize: "medium", fontWeight: "bold" }}
					>
						Employment Type
					</FormLabel>
					<ThemeProvider theme={theme}>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							name="radio-buttons-group"
							color="primary"
							style={{ margin: "0 0 2ch 1ch" }}
						>
							<FormControlLabel
								value="full"
								control={<Radio size="small" />}
								style={{ fontSize: "15px" }}
								label="Full-time"
							/>
							<FormControlLabel
								value="part"
								control={<Radio size="small" />}
								style={{ fontSize: "15px" }}
								label="Part-time"
							/>
						</RadioGroup>
					</ThemeProvider>
					{/* </FormControl> */}
          
				</Box>
			</Box>
		</div>
	);
}


// skills
// experience
// qualifications
// salary
// jd