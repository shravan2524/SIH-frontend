import React, { useEffect, useState } from "react";
import { verify } from "../../bloc/auth";
import { getPostings, getProfiles } from "../../bloc/hei";
import { red } from "@mui/material/colors";
import {
  Card,
  Box,
  CardHeader,
  Avatar,
  Typography,
  CardContent,
  Button,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ShowPostings() {
  const [jobPostings, setJobPostings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    verify().then(async (val) => {
      if (val) {
        let profiles = await getProfiles();
        let postings = await getPostings();
        let profile = profiles.filter((el) => el.user == val.userId)[0];
        let filteredPostings = postings.filter(
          (el) => el.higherEducationInstitution._id == profile._id
        );
        setJobPostings(filteredPostings);
      }
    });
  }, []);

  return (
    <>
      <Box style={{ width: "80%", margin: "2em auto" }}>
        {jobPostings.length > 0 ? (
          jobPostings.map((e) => {
            return (
              <Box style={{ margin: "2rem 0" }} sx={{ boxShadow: 3 }}>
                <Card style={{ boxShadow: "none" }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {e?.higherEducationInstitution.instituteName[0]}
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
                            onClick={() => navigate(`/hei/postJob/${e._id}`)}
                            variant="outlined"
                          >
                            Edit
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
                  <CardActionArea
                    onClick={() => navigate(`/hei/reviewApplication/${e._id}`)}
                  >
                    <CardContent>
                      <Typography variant="body1">
                        Experience: {e?.workExperience}
                      </Typography>
                      <Typography variant="body1">Job Description:</Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        style={{ fontSize: "1rem", padding: "1em" }}
                      >
                        {e?.jobDescripton}
                      </Typography>
                      <Typography variant="body1">
                        Salary Range:&nbsp;&nbsp;{e.salaryRange}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography variant="body2" color="text.primary">
                        Street:&nbsp;{e?.higherEducationInstitution.street}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        Landmark:&nbsp;{e?.higherEducationInstitution.landmark}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            );
          })
        ) : (
          <h1>No jobs posted yet</h1>
        )}
      </Box>
    </>
  );
}

export default ShowPostings;
