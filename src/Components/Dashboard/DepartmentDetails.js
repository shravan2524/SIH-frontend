import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Loader from "../Loader";
import { getProfiles, heiUrl, getMembers, } from "../../bloc/hei";
import { verify } from "../../bloc/auth";
import axios from "axios";
import moment from "moment";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	ArcElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const data2 = {
	labels: ['Electronics and Telecommunication ', 'Computer Science', 'Electronics', 'Biomedical',],
	datasets: [
		{
			label: '# of Votes',
			data: [60, 60, 120, 120],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
			],
			borderWidth: 1,
		},
	],
};


ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
		},
	},
};

const SFRData = [
	{
		CollegeName: "VIT",
		Branches: {
			CMPN: {
				intake: 120,
				associateProfessor: 2,
				professor: 4,
				assistantProfessor: 12,
				remaining: 0,
				total: 18,
			},
			IT: {
				intake: 60,
				associateProfessor: 1,
				professor: 2,
				assistantProfessor: 6,
				remaining: 1,
				total: 9,
			},
			EXTC: {
				intake: 120,
				associateProfessor: 2,
				professor: 4,
				assistantProfessor: 12,
				remaining: 2,
				total: 18,
			},
			ETRX: {
				intake: 60,
				associateProfessor: 2,
				professor: 1,
				assistantProfessor: 6,
				remaining: 0,
				total: 9,
			},
			BIOM: {
				intake: 60,
				associateProfessor: 2,
				professor: 1,
				assistantProfessor: 6,
				remaining: 3,
				total: 9,
			}
		}
	}
]


function createData(Department, StudentIntake, TeachingFaculty, Data) {
	return {
		Department,
		StudentIntake,
		TeachingFaculty,
		Data,
	};
}

function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);

	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.Department}
				</TableCell>
				<TableCell>{row.StudentIntake}</TableCell>
				<TableCell>{row.TeachingFaculty}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Table size="small" aria-label="Department Details">
								<TableHead>
									<TableRow>
										<TableCell>
											<b>Professor Name</b>
										</TableCell>
										<TableCell>
											<b>Designation</b>
										</TableCell>
										<TableCell>
											<b>Qualification</b>
										</TableCell>
										<TableCell>
											<b>Age</b>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.Data.map((facultyextcRow) => (
										<TableRow
											key={facultyextcRow.fullName}
											sx={{ "& > *": { borderBottom: "unset" } }}
										>
											<TableCell component="th" scope="row">
												{facultyextcRow.fullName}
											</TableCell>
											<TableCell>{facultyextcRow.designation}</TableCell>
											<TableCell>{facultyextcRow.qualification}</TableCell>
											<TableCell>
												{(
													new Date().getFullYear() -
													new Date(Date.parse(facultyextcRow.dob)).getFullYear()
												).toString()}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

const rows = [createData("Electronics and Telecommunication", 150, 25)];

const row2 = [createData("Computer Science", 140, 22)];

function Rowsd({ row }) {
	const [color, setcolor] = useState('green');
	const [color1, setcolor1] = useState('green');
	const [color2, setcolor2] = useState('green');
	useEffect(() => {
		if (row.reqProf > 2) { setcolor('red'); }
		if (row.reqAssoProf > 2) { setcolor1('red'); }
		if (row.reqAssiProf > 2) { setcolor2('red'); }
	}, []);

	return (
		<TableRow sx={{ "& > *": { borderBottom: "unset" } }} style={{ fontWeight: "700" }}>
			<TableCell>{row.department}</TableCell>
			<TableCell>{row.intake}</TableCell>
			<TableCell>{row.Prof}</TableCell>
			<TableCell>{row.assoProf}</TableCell>
			<TableCell>{row.assProf}</TableCell>
			<TableCell style={{ color: color }}>{row.reqProf}</TableCell>
			<TableCell style={{ color: color1 }}>{row.reqAssoProf}</TableCell>
			<TableCell style={{ color: color2 }}>{row.reqAssiProf}</TableCell>
			<TableCell
			>{row.totalProf}</TableCell>
		</TableRow>
	)
}

export default function DepartmentDetails() {
	const [visibility, setVisibility] = useState(false);
	const [rows, setRows] = useState([]);
	const [rows1, setrows1] = useState([]);
	useEffect(() => {
		setVisibility(true);
		verify()
			.then(async (val) => {
				let profiles = await getProfiles();
				let profile = profiles.filter((el) => el.user == val.userId)[0];
				let members = await getMembers();
				let facultyMembers = members.filter(
					(el) => el.higherEducationInstitution == profile._id
				);
				let formatedData = {};
				facultyMembers.map((el) => {
					if (!formatedData[el.department]) formatedData[el.department] = [el];
					else
						formatedData[el.department] = [...formatedData[el.department], el];
				});
				let keys = Object.keys(formatedData);
				console.log(formatedData);
				setRows(
					keys.map((el) =>
						createData(el, 100, formatedData[el].length, formatedData[el])
					)
				);
			})
			.finally(setVisibility(false));
	}, []);

	useEffect(() => {
		verify()
			.then(async (val) => {
				let profiles = await getProfiles();
				let profile = profiles.filter((el) => el.user == val.userId)[0];
				await axios.get(`${process.env.REACT_APP_BACK_URL}/api/hei/strTable/${profile._id}`)
					.then((e) => {
						console.log(e.data.data.branches);
						setrows1(e.data.data.branches);
					})
					.catch((err) => {
						console.log(err);
					})
			})
			.catch((err) => {
				// console
			})
	}, [])
	const labels = ['Electronics and Telecommunication', 'Computer Science', 'Electronics', 'Biomedical'];
	const data = {
		labels,
		datasets: [
			{
				label: 'Associate Professor',
				data: [1, 2, 3, 1],
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Professor',
				data: [1, 1, 1, 3],
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
			{
				label: 'Assistant Professor',
				data: [0, 3, 0, 4],
				backgroundColor: 'rgba(153, 162, 235, 0.5)',
			},
		],
	};

	const data1 = {
		labels,
		datasets: [
			{
				label: 'STR',
				data: [20.88, 22.00, 29, 19.0],
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};
	const [notify, setnotify] = useState('');
	useEffect(() => {
		setnotify(localStorage.getItem('notfication'));
	}, []);
	return (
		<>
			<Loader visible={visibility}></Loader>
			<Box
				sx={{ flexGrow: 1, borderRadius: 2 }}
				style={{
					width: "90%",
					backgroundColor: "#f2f2f2",
					margin: "2em auto",
					padding: "2ch",
				}}
			>
				<h2>Department Details</h2>
				<Box style={{ width: "60vw", margin: "auto" }}>
					<Bar options={options} data={data} />
				</Box>
				<TableContainer component={Paper} style={{ marginTop: "2rem" }}>
					<Table aria-label="collapsible table">
						<TableHead>
							<TableRow>
								<TableCell />
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Department</b>
								</TableCell>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Student Intake</b>
								</TableCell>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Teaching Faculty</b>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<Row key={row.Department} row={row} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Box
				sx={{ flexGrow: 1, borderRadius: 2 }}
				style={{
					width: "90%",
					backgroundColor: "#f2f2f2",
					margin: "2em auto",
					padding: "2ch",
				}}
			>
				<h2>Stastical Analyticals</h2>
				<Box style={{ width: "40vw", margin: "auto" }}>
					<Bar options={options} data={data1} />
				</Box>
				<TableContainer component={Paper} style={{ marginTop: "2rem" }}>
					<Table aria-label="collapsible table">
						<TableHead>
							<TableRow>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Branch</b>
								</TableCell>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Student Intake</b>
								</TableCell>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Professor</b>
								</TableCell>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Associate Professor</b>
								</TableCell>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Assistant Professor</b>
								</TableCell>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Required Professor</b>
								</TableCell>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Required Associate Professor</b>
								</TableCell>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Required Assistant Professor</b>
								</TableCell>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Total Professor</b>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows1.map((row) => (
								<Rowsd key={row.Department} row={row} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Box
				sx={{ flexGrow: 1, borderRadius: 2 }}
				style={{
					width: "90%",
					backgroundColor: "#f2f2f2",
					margin: "2em auto",
					padding: "2ch",
					height: "32%",
				}}
			>
				<h2>Students Intake</h2>
				<Box style={{ margin: "auto", width: "40rem", height: "25rem" }}>
					<Pie data={data2} />
				</Box>
			</Box>
		</>
	);
}

