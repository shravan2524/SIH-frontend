import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { getApplicationStats } from "../../bloc/details";
import { verify } from "../../bloc/auth";
import Loader from "../Loader";

export default function ApplicationStatus() {
	const [stats, setStats] = useState([]);
	const [visibility, setVisibility] = useState(false);
	useEffect(() => {
		getApplicationStats()
			.then(async (val) => {
				let user = await verify();
				let filteredStats = val.filter((el) => el.user == user.userId);
				setStats(filteredStats);
			})
			.finally(setVisibility(false));
	}, []);
	function withdraw(id){
		console.log(id);
	}
	return (
		<>
			<Loader visible={visibility}></Loader>
			<Box style={{ width: "90%", margin: "2em auto" }}>
				<Typography variant="h3" color="text.primary">
					Application status
				</Typography>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Application ID</TableCell>
								<TableCell> Date of Application</TableCell>
								<TableCell>Post Applied for</TableCell>
								<TableCell>Institute Name</TableCell>
								<TableCell>Status</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{stats.map((row) => (
								<TableRow
									key={row._id}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell>{row._id}</TableCell>
									<TableCell>
										{new Date(row.date).toLocaleDateString("hi-IN")}
									</TableCell>
									<TableCell>{row.position}</TableCell>
									<TableCell>
										{row.higherEducationInstitution.instituteName}
									</TableCell>
									<TableCell>{row.applicationStatus}</TableCell>
									{/* <TableCell><Button variant="outlined" onClick={() => withdraw(row._id)} >Withdraw Application</Button>
									</TableCell> */}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
}
