import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import FormControl from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Toaster } from "react-hot-toast";
import Loader from "../Loader";
import { getPostings } from "../../bloc/hei";
import { getData } from "../../bloc/common";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Detail({ data }) {
  console.log(data);
  return (
    <Box>
      {data.map((e) => {
        return (
          <Box>
            <Stack direction="row" spacing={1}>
              <Typography variant="h6" color="text.primary">
                {e.name} :{" "}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {e.value}
              </Typography>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
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

const jobs = [
  {
    jobTitle: "Software engineering",
    Location: "In-office : India, bengaluru",
    jobType: "Full-Time",
    Qualifications:
      "Bachelor's degree in Computer Science, similar technical field of study, or equivalent practical experience. 3 years of experience in software engineering, and coding experience in one or more of the following languages: Java, Kotlin, C/C++, C#, Objective C, JavaScript, or Python.Ability to speak and write in English and Portuguese fluently.",
  },
  {
    jobTitle: "Web dev",
    Location: "In-office : India, hyderabad",
    jobType: "Part-Time",
    Qualifications:
      "Bachelor's degree in Computer Science, similar technical field of study, or equivalent practical experience. 3 years of experience in software engineering, and coding experience in one or more of the following languages: Java, Kotlin, C/C++, C#, Objective C, JavaScript, or Python.Ability to speak and write in English and Portuguese fluently.",
  },
  {
    jobTitle: "Software engineering",
    Location: "In-office : USA",
    jobType: "Intern",
    Qualifications:
      "Bachelor's degree in Computer Science, similar technical field of study, or equivalent practical experience. 3 years of experience in software engineering, and coding experience in one or more of the following languages: Java, Kotlin, C/C++, C#, Objective C, JavaScript, or Python.Ability to speak and write in English and Portuguese fluently.",
  },
  {
    jobTitle: "Software engineering",
    Location: "In-office : India, bengaluru",
    jobType: "Full-Time",
    Qualifications:
      "Bachelor's degree in Computer Science, similar technical field of study, or equivalent practical experience. 3 years of experience in software engineering, and coding experience in one or more of the following languages: Java, Kotlin, C/C++, C#, Objective C, JavaScript, or Python.Ability to speak and write in English and Portuguese fluently.",
  },
];

export default function SearchJobs() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);
  const [location, setLocation] = useState("");
  const [expanded2, setExpanded2] = useState(false);
  const [skills, setskills] = useState("");
  const [expanded3, setExpanded3] = useState(false);
  const [jobsA, setJobsA] = useState([]);
  useEffect(() => {
    getPostings().then((val) => {
      setJobsA(val);
    });
  }, []);
  return (
    <Box style={{ width: "80%", margin: "5em auto" }}>
      <Typography variant="h3" style={{ margin: "1em 0" }}>
        Search Jobs
      </Typography>
      <Box>
        <Stack direction="row" spacing={2}>
          <Box style={{ width: "90%" }}>
            {jobsA.map((e) => {
              return (
                <Box style={{ margin: "0.4rem" }} sx={{ boxShadow: 3 }}>
                  <Card style={{ boxShadow: "none" }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          G
                        </Avatar>
                      }
                      action={
                        <Box>
                          <Box>
                            <Typography
                              variant="body2"
                              color="text.primary"
                              style={{ fontSize: "1rem" }}
                            >
                              {e.employmentType}
                            </Typography>
                          </Box>
                          <Box>
                            <Button
                              onClick={() =>
                                navigate(`/faculty/jobApplication/${e._id}`)
                              }
                              variant="outlined"
                            >
                              Apply
                            </Button>
                          </Box>
                        </Box>
                      }
                      title={e.position}
                      subheader={
                        e?.higherEducationInstitution.country.name +
                        "," +
                        e?.higherEducationInstitution.state.name
                      }
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        style={{ fontSize: "1rem", padding: "1em" }}
                      >
                        {e?.jobDescription	}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
