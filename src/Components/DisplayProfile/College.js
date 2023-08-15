import React, { useEffect, useState } from "react";
import VIT from "./VIT.jpg";
import Box from "@mui/material/Box";
import { Chip, Typography } from "@mui/material";
import { verify } from "../../bloc/auth";
import { getProfile, getProfiles } from "../../bloc/hei";
import { useNavigate } from "react-router-dom";

function College() {
  const [profileData, setProfileData] = useState({});
  const [streamsOffered, setStreamsOffered] = useState([]);
  const [coursesOffered, setCoursesOffered] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    verify()
      .then(async (val) => {
        if (val) {
          let profiles = await getProfiles();
          let profile = profiles.filter((el) => el.user == val.userId)[0];
          if (!profile) navigate("/hei/profile");
          let profileD = await getProfile(profile._id);
          if (profileD) {
            setStreamsOffered(profileD.streamsOffered);
            setCoursesOffered(profileD.coursesOffered);
            setProfileData(profileD);
          }
        }
      })
      .finally();
  }, []);
  return (
    <>
      {profileData?._id ? (
        <Box
          sx={{ flexGrow: 1, borderRadius: 2 }}
          style={{
            width: "90%",
            backgroundColor: "#f2f2f2",
            margin: "2em auto",
            padding: "2ch",
          }}
        >
          <div>
            <h2 style={{ marginBottom: "2ch" }}>
              {profileData?.instituteName}
            </h2>
          </div>
          <div style={{ padding: "0 1ch 1ch 0" }}>
            <Typography variant="body2" marginLeft={1}>
              Year of Establishment:&nbsp;{profileData?.foundingYear}
            </Typography>
          </div>
          <div style={{ margin: "0 1ch 1ch 1ch" }}>
            <img
              width={200}
              fit="contain"
              src={VIT}
              alt="Vidyalankar Institute of Technology"
            />
          </div>
          <hr />

          <div>
            <h3>Location Details</h3>
          </div>
          <div style={{ padding: "0 1ch 1ch 0" }}>
            <Typography variant="body2" marginLeft={1}>
              Country:&nbsp;{profileData?.country.name}
            </Typography>
            <Typography variant="body2" marginLeft={1}>
              State:&nbsp;{profileData?.state.name}
            </Typography>
            <Typography variant="body2" marginLeft={1}>
              District:&nbsp;{profileData?.district.name}
            </Typography>
            <Typography variant="body2" marginLeft={1}>
              Pincode: &nbsp;{profileData?.pinCode}
            </Typography>
            <Typography variant="body2" marginLeft={1}>
              Street: &nbsp;{profileData?.street}
            </Typography>
            <Typography variant="body2" marginLeft={1}>
              Landmark: &nbsp;{profileData?.landmark}
            </Typography>
          </div>
          <hr />
          {/* <div>
          <h3>Type of Affiliation</h3>
        </div>
        <div style={{ padding: "0 1ch 1ch 0" }}>
          <Typography variant="body2" marginLeft={1}>
            Type of Affiliation:{" "}
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            Affiliated with:{" "}
          </Typography>
        </div>
        <hr /> */}
          <div>
            <h3>Streams Offered</h3>
            <Box sx={{ display: "flex" }}>
              {streamsOffered.map((el) => (
                <Chip
                  key={el._id}
                  label={el.name}
                  style={{ margin: "8px 8px" }}
                />
              ))}
            </Box>
          </div>
          <hr></hr>
          <div>
            <h3>Courses Offered</h3>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {coursesOffered.map((el) => (
                <Chip
                  key={el._id}
                  label={el.name}
                  style={{ margin: "8px 8px" }}
                />
              ))}
            </Box>
          </div>
          <hr />
          {/* <div>
          <h3>Social Media Links</h3>
        </div>
        <div style={{ padding: "0 1ch 1ch 0" }}>
          <Typography variant="body2" marginLeft={1}>
            LinkedIN:{" "}
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            FaceBook:{" "}
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            Instagram:{" "}
          </Typography>
        </div> */}
        </Box>
      ) : (
        <h1> Please complete your college Profile</h1>
      )}
    </>
  );
}

export default College;
