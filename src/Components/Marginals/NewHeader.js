import React from 'react'
import { Box, Tooltip, Typography, Link, IconButton, Divider, ListItemIcon, MenuItem, Menu, Avatar, Tab, Tabs } from '@mui/material'
import logo from "./logo.png";
import PersonAdd from '@mui/icons-material/PersonAdd';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

export default function NewHeader() {
	const [value, setValue] = React.useState(0);
	const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
	const images = [
		{
			label: 'San Francisco – Oakland Bay Bridge, United States',
			imgPath:
				'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
		},
		{
			label: 'Bird',
			imgPath:
				'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
		},
		{
			label: 'Bali, Indonesia',
			imgPath:
				'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
		},
		{
			label: 'Goč, Serbia',
			imgPath:
				'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
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
	
	return (
		<Box style={{ width: "100%", height: "10vh", backgroundColor: "rgb(0 22 135)", display: "flex", justifyContent: "space-between" }}>
			<Box style={{ marginLeft: "1rem" }}>
				<img src={logo} width="150" height="70" color="white" />
			</Box>
			<Box sx={{ marginRight: "4rem", width: "35vw", marginTop: "1.2rem", display: "flex", justifyContent: "space-around" }}>
				<Box>
					<Link style={{ color: "white", fontSize: "1.5rem" }} href="/">Home</Link>
				</Box>
				<Box>
					<Link style={{ color: "white", fontSize: "1.5rem" }} href="/About">About</Link>
				</Box>
				<Box>
					<Link style={{ color: "white", fontSize: "1.5rem" }} href="/faqs">faqs</Link>
				</Box>
				<Box>
					<Link style={{ color: "white", fontSize: "1.5rem" }} href="/login">Login</Link>
				</Box>
				<Box>
					<Link style={{ color: "white", fontSize: "1.5rem" }} href="/signup">Signup</Link>
				</Box>
			</Box>
		</Box>
	)
}
