import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import toast, { Toaster } from "react-hot-toast";
import { Button, TableContainer, Table, TableBody, TableCell, Paper, TableHead, TableRow, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import { FaCheckCircle, FaTimesCircle, FaIdBadge } from "react-icons/fa";
import { BiCheckShield, BiCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import vit from "./vit.jpg";
import rgit from "./rgit.jpg";
import pce from "./pce.jpg";
import "../DisplayProfile/Display.css";
import { getProfiles, heiUrl } from "../../bloc/hei";
import { putData } from "../../bloc/common";
import Loader from "../Loader";
import AgGrid from "./AgGrid";

function Rowsd({ row }) {
	return (
		<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
			<TableCell>{row.name}</TableCell>
			<TableCell>{row.STR}</TableCell>
			<TableCell>{row.vacancy}</TableCell>
			<TableCell>
				<div>{row.branch[0]}</div>
				<div>{row.branch[1]}</div>
				<div>{row.branch[2]}</div>
			</TableCell>
		</TableRow>
	)
}


function ViewColleges() {
	function notify(){
		console.log(1);
		toast.success("Notification Sent Succesfully");
		localStorage.setItem("notfication", 'You have vacany in so and so field, Please assure you fill your vacancy.');
	}
	const ExpandMore = styled((props) => {
		const { expand, ...other } = props;
		return <IconButton {...other} />;
	})(({ theme, expand }) => ({
		transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	}));

	const [strd, setstrd] = useState([
		{
			name: 'VIT, Mumbai',
			STR: '24.0',
			vacancy: 3,
			cadre: [
				' Professor(0)',
				'Associate Professor(1)',
				'Assistant Professor(2)',
			],
			branch: [
				'CMPN(1)',
				'IT(0)',
				'EXTC(2)',
				'CIVIL(3)',
			]
		},
		{
			name: 'SPIT, Mumbai',
			STR: '22.0',
			vacancy: 1,
			cadre: [
				' Professor(1)',
				'Associate Professor(1)',
				'Assistant Professor(0)',
			],
			branch: [
				'CMPN(1)',
				'IT(2)',
				'EXTC(4)',
				'CIVIL(0)',
			]
		},
		{
			name: 'Governement COllge of India, Thane',
			STR: '28.0',
			vacancy: 4,
			cadre: [
				' Professor(2)',
				'Associate Professor(1)',
				'Assistant Professor(1)',
			],
			branch: [
				'CMPN(1)',
				'IT(0)',
				'EXTC(1)',
				'CIVIL(4',
			]
		},
	]);
	const [profiles, setProfiles] = React.useState([]);
	const [expands, setExpands] = useState([]);
	const [visibility, setVisibility] = useState(false);

	useEffect(() => {
		getProfiles().then((val) => {
			setProfiles(val);
			setExpands(val.map((el) => false));
		});
	}, []);
	const handleClick = (data) => {
		data.isVerified = true;
		putData(`${heiUrl}/profile/${data._id}`, data)
			.then((val) => {
				if (val) window.location.reload();
			})
			.finally(setVisibility(true));
	};
	return (
		<>
			<Loader visible={visibility}></Loader>
			{/* <Box
        sx={{ flexGrow: 1, borderRadius: 2 }}
        style={{
          width: "90%",
          backgroundColor: "#f2f2f2",
          margin: "2em auto",
          padding: "2ch",
        }}
      > */}
			{/* {profiles ? (
          profiles.map((el, index) => (
            <Card key={el._id} style={{ width: "100%", marginBottom: "2ch" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {el?.instituteName[0]}
                  </Avatar>
                }
                action={
                  el?.isVerified ? (
                    <BiCheckShield color="green" fontSize={24}></BiCheckShield>
                  ) : (
                    <IconButton onClick={() => handleClick(el)}>
                      <BiCheck></BiCheck>
                    </IconButton>
                  )
                }
                title={el?.instituteName}
                subheader="University of Mumbai"
              />
              <CardContent>
                <Typography variant="body2" color="text.primary">
                  Vidyalankar Institute of Technology (VIT) is a premier
                  engineering degree college approved by the All India Council
                  For Technical Education (AICTE) and affiliated to University
                  of Mumbai, India.
                </Typography>
              </CardContent>
              <CardActions>
                <ExpandMore
                  expand={expands[index]}
                  onClick={(e) =>
                    setExpands((prev) => {
                      let newExpands = expands.slice();
                      newExpands[index] = !newExpands[index];
                      return newExpands;
                    })
                  }
                  aria-expanded={expands[index]}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expands[index]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Grid container style={{ width: "90%", margin: "0 auto" }}>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Founding Year: {el.foundingYear}
                      </Typography>
                      <Typography variant="body2">
                        Regulatory Body: {el.regulatoryBody}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        Registration Number: {el.registrationNumber}
                      </Typography>
                      <Typography variant="body2">
                        Pincode: {el.pinCode}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Collapse>
            </Card>
          ))
        ) : (
          <h1>Loading</h1>
        )} */}
		<Toaster></Toaster>
			<Box style={{ marginLeft: "5rem", marginTop: "2rem" }}>
				<Typography variant="h4">List of Colleges and Faculties</Typography>
			</Box>
			<AgGrid />
			<Box>
				<TableContainer component={Paper} style={{ margin: "2rem" }}>
					<Table aria-label="collapsible table">
						<TableHead>
							<TableRow>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Collge Name</b>
								</TableCell>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>STR value</b>
								</TableCell>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Vacancy</b>
								</TableCell>
								<TableCell style={{ fontSize: "1rem" }}>
									<b>Branch</b>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{strd.map((row) => (
								<Rowsd key={row.Department} row={row} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			{/* <Box>
				<Button variant="contained" style={{marginLeft:"2rem"}} onClick={notify}>Notify Them</Button>
			</Box> */}
			{/* </Box> */}
		</>
	);
}

export default ViewColleges;
