import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { FormGroup, FormControlLabel, Checkbox, TextField, ListItem, List, Button, Tabs, Tab, InputLabel, Select, MenuItem, Link } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewHeader from '../Components/Marginals/NewHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Toaster } from "react-hot-toast";
import { useTheme } from '@mui/material/styles';
import icon1 from "./icon1.png"
import icon2 from "./icon2.png"
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Header from "../Components/Marginals/Header";
import Footer from "../Components/Marginals/Footer";
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

ChartJS.register(ArcElement, Tooltip, Legend);

const data1 = require('./DashboardData.json')

console.log(data1);

const links = [
	{
		link: 'https://aicte-india.org/sites/default/files/Corrigendum%20to%20APH%20%20-%20NOC%20for%20Bank%20change%20-%2031-05-2022.pdf',
		name: 'Corrigendum to APH 2022-23'
	},
	{
		link: 'https://www.aicte-india.org/sites/default/files/Public%20Notice%20for%20website%20English%20and%20Hindi%20%281%29%20%281%29.pdf#overlay-context=',
		name: 'Public Notice for Approval Process 2022-23'
	},
	{
		link: 'https://www.aicte-india.org/#:~:text=Academic%20Calendar%202022%2D23',
		name: 'Academic Calendar 2022-23'
	},
	{
		link: 'https://www.aicte-india.org/sites/default/files/AICTE_Cal_2022_Final_31.12.2021_compressed_0.pdf',
		name: 'AICTE Calendar-2022'
	},
	{
		link: 'https://www.aicte-india.org/sites/default/files/Circular-%20National%20Awards%20for%20Empowerment%20of%20Persons%20with%20Disabilites-regarding..pdf',
		name: 'National Awards for Empowerment of Persons with Disabilities'
	},

]

const links1 = [
	{
		link: 'https://1crore.aicte-india.org/',
		name: 'DigitalSkilling 1 Crore Students'
	},
	{
		link: 'https://internship.aicte-india.org/',
		name: 'AICTE Internship Portal'
	},
	{
		link: 'https://www.aicte-india.org/ap2023',
		name: 'Approval Process 2022-23'
	},
	{
		link: 'https://translation.aicte-india.org/',
		name: 'AICTE-AI Language Translation Tool'
	},
	{
		link: 'https://www.aicte-india.org/policy-reforms',
		name: 'Policies & Reforms'
	},

]

function Landing() {
	const [state, setstate] = useState('Telangana');
	const [datap, setdatap] = useState(data1["Telangana"].records);
	const [value, setValue] = React.useState(0);
	const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
	const images = [
		{
			label: 'San Francisco – Oakland Bay Bridge, United States',
			imgPath:
				'https://www.aicte-india.org/sites/default/files/images/slideshow/SLAbanner.png',
		},
		{
			label: 'Bird',
			imgPath:
				'https://www.aicte-india.org/sites/default/files/images/slideshow/Banner_3.jpg',
		},
		{
			label: 'Goč, Serbia',
			imgPath:
				'https://www.aicte-india.org/sites/default/files/images/slideshow/ban1_1.jpg',
		},
	];
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step) => {
		setActiveStep(step);
	};
	const [pieData, setpieData] = useState({
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		datasets: [
			{
				label: '# of Votes',
				data: datap,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	}
	);
	const handleChange = (event) => {
		setstate(event.target.value);
		console.log(state);
		setdatap(data1[state].records);
		console.log(data1[state.records]);
		console.log(datap);
	};
	return (
		<Box>
			<NewHeader />
			<Box sx={{ width: "100vw", flexGrow: 1 }}>
				<img src="https://www.aicte-india.org/sites/default/files/images/slideshow/ban1_1.jpg" width="1700" />
			</Box>
			<Box style={{ display: "flex", width: "80vw", border: "1px solid grey", padding: "1rem", margin: "10vw", borderRadius: "0.5rem", position: "absolute", top: "80vh", backgroundColor: "white" }}>
				<Box style={{ width: "80%", margin: "1rem" }}>
					<Box style={{ borderBottom: "1px solid black", padding: "1rem" }}>
						<Typography variant="h4" style={{ color: '#255c5a', display: 'flex', justifyContent: "center" }}>
							Quick Links
						</Typography>
					</Box>
					<Box>
						{
							links1.map((e) => {
								return (
									<Box style={{ margin: "0.5rem", display: 'flex', justifyContent: "center", padding: "0.5rem" }}>
										<Link href={e.link}>{e.name}</Link>
									</Box>)
							})
						}
					</Box>
				</Box>
				<Box style={{ width: "40", backgroundColor: "#c1ace2", padding: "1rem", borderRadius: "0.5rem" }}>
					<Box style={{ borderBottom: "1px solid black", padding: "1rem" }}>
						<Typography variant="h4" style={{ color: '#255c5a', display: 'flex', justifyContent: "center" }}>
							Welcome, Arohan
						</Typography>
					</Box>
					<Box>
						<Typography variant="h6" style={{ color: '#255c5a', display: 'flex', justifyContent: "center", padding:"1rem", textAlign:"center" }}>
							All India Council for Technical Education (AICTE) was set up in November 1945 as a national-level Apex Advisory Body to conduct a survey on the facilities available for technical education and to promote development in the country in a coordinated and integrated manner.
						</Typography>
					</Box>
				</Box>
				<Box style={{ width: "20%", margin: "1rem" }}>
					<Box style={{ borderBottom: "1px solid black", padding: "1rem" }}>
						<Typography variant="h4" style={{ color: '#255c5a', display: 'flex', justifyContent: "center" }}>
							Announcements
						</Typography>
					</Box>
					<Box>
						{
							links.map((e) => {
								return (
									<Box style={{ margin: "0.5rem", display: 'flex', justifyContent: "center", padding: "0.5rem" }}>
										<Link href={e.link}>{e.name}</Link>
									</Box>)
							})
						}
					</Box>
				</Box>
			</Box>

			<Card style={{ width: "60%", margin: "auto", padding: "2rem", marginBottom: "2rem", marginTop: "6em" }}>
				<Box style={{ borderBottom: "1px solid black", padding: "1rem" }}>
					<Typography variant="h4" style={{ color: '#255c5a' }}>
						AICTE Approved Institutes for the Academic Year: 2022-2023 in {state}
					</Typography>
				</Box>
				<Box sx={{ minWidth: 40, margin: "1rem" }}>
					<FormControl>
						<InputLabel id="demo-simple-select-label">State</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={state}
							label="State"
							onChange={handleChange}
						>
							<MenuItem value={"Andaman"}>Andaman \ Nicobar</MenuItem>
							<MenuItem value={"Andhra"}>Andhra Pradesh</MenuItem>
							<MenuItem value={"Arunachal"}>Arunachal Pradesh</MenuItem>
							<MenuItem value={"Assam"}>Assam</MenuItem>
							<MenuItem value={"Bihar"}>Bihar</MenuItem>
							<MenuItem value={"Chandigarh"}>Chandigarh</MenuItem>
							<MenuItem value={"Chhattisgarh"}>Chhattisgarh</MenuItem>
							<MenuItem value={"Dadra%20and%20Nagar%20Haveli"}>Dadra and Nagar Haveli</MenuItem>
							<MenuItem value={"Daman%20and%20Diu"}>Daman and Diu</MenuItem>
							<MenuItem value={"Delhi"}>Delhi</MenuItem>
							<MenuItem value={"Goa"}>Goa</MenuItem>
							<MenuItem value={"Gujarat"}>Gujarat</MenuItem>
							<MenuItem value={"Haryana"}>Haryana</MenuItem>
							<MenuItem value={"Himachal%20Pradesh"}>Himachal Pradesh</MenuItem>
							<MenuItem value={"Jammu%20and%20Kashmir"}>Jammu and Kashmir</MenuItem>
							<MenuItem value={"Jharkhand"}>Jharkhand</MenuItem>
							<MenuItem value={"Karnataka"}>Karnataka</MenuItem>
							<MenuItem value={"Kerala"}>Kerala</MenuItem>
							<MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
							<MenuItem value={"Manipur"}>Manipur</MenuItem>
							<MenuItem value={"Meghalaya"}>Meghalaya</MenuItem>
							<MenuItem value={"Mizoram"}>Mizoram</MenuItem>
							<MenuItem value={"Odisha"}>Odisha</MenuItem>
							<MenuItem value={"Orissa"}>Orissa</MenuItem>
							<MenuItem value={"Puducherry"}>Puducherry</MenuItem>
							<MenuItem value={"Punjab"}>Punjab</MenuItem>
							<MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
							<MenuItem value={"Sikkim"}>Sikkim</MenuItem>
							<MenuItem value={"Telangana"}>Telangana</MenuItem>
							<MenuItem value={"Uttar%20Pradesh"}>Uttar Pradesh</MenuItem>
							<MenuItem value={"Uttarakhand"}>Uttarakhand</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box style={{ display: 'flex', justifyContent: "space-around" }}>
					<Card sx={{ width: 250, backgroundColor: '#bce8f1', color: '#31708f', margin: '1rem', padding: '0.5rem' }}>
						<CardContent>
							<Typography variant="h5" component="div">
								Total Institutions
							</Typography>
							<Typography variant="h5" component="div">
								{datap.instituecount[0]}
							</Typography>
						</CardContent>
					</Card>
					<Card sx={{ width: 250, backgroundColor: '#faebcc', color: '#8a6d3b', margin: '1rem', padding: '0.5rem' }}>
						<CardContent>
							<Typography variant="h5" component="div">
								New Institutions
							</Typography>
							<Typography variant="h5" component="div">
								{datap.newinstitute}
							</Typography>
						</CardContent>
					</Card>
					<Card sx={{ width: 250, backgroundColor: '#dff0d8', color: '#3c763d', margin: '1rem', padding: '0.5rem' }}>
						<CardContent>
							<Typography variant="h5" component="div">
								Total Intake
							</Typography>
							<Typography variant="h5" component="div">
								{datap.intake[0]}
							</Typography>
						</CardContent>
					</Card>
				</Box>
				<Box style={{ display: 'flex', justifyContent: "space-around" }}>
					<Card sx={{ width: 250, backgroundColor: '#ebccd1', color: '#a94442', margin: '1rem', padding: '0.5rem' }}>
						<CardContent>
							<Typography variant="h5" component="div">
								Girl's Enrolment
							</Typography>
							<Typography variant="h5" component="div">
								{datap.boys}
							</Typography>
						</CardContent>
					</Card>
					<Card sx={{ width: 250, backgroundColor: '#dff0d8', color: '#3c763d', margin: '1rem', padding: '0.5rem' }}>
						<CardContent>
							<Typography variant="h5" component="div">
								Boy's Enrolment
							</Typography>
							<Typography variant="h5" component="div">
								{datap.girls}
							</Typography>
						</CardContent>
					</Card>
					<Card sx={{ width: 250, backgroundColor: '#faebcc', color: '#8a6d3b', margin: '1rem', padding: '0.5rem' }}>
						<CardContent>
							<Typography variant="h5" component="div">
								Total Placed
							</Typography>
							<Typography variant="h5" component="div">
								{datap.placed[0]}
							</Typography>
						</CardContent>
					</Card>
				</Box>
			</Card>
		</Box>
	);
}

export default Landing;
