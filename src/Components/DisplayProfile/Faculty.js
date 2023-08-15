import React, { useContext } from "react";
import "./Display.css";
import "../../App.css";
import Professor from "./prof.png";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { AppContext } from "../../context/app";

function Faculty() {
  const { user } = useContext(AppContext);
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          borderRadius: 2,
        }}
        style={{
          width: "90%",
          backgroundColor: "#f2f2f2",
          margin: "2em auto",
          padding: "2ch",
        }}
      >
        <div>
          <h3>Basic Details</h3>
        </div>

        <div style={{ padding: "0 1ch 1ch 0" }} className="displayImage">
          <div>
            <Typography variant="body2" marginLeft={1}>
              First Name:{" "} Snoopy
            </Typography>
            <Typography variant="body2" marginLeft={1}>
              Middle Name:{" "}
            </Typography>
            <Typography variant="body2" marginLeft={1}>
              Last Name:{" "} dogg
            </Typography>
          </div>
          <img
            width={70}
            height={65}
            fit="contain"
            src={Professor}
            alt="Faculty"
          />
        </div>
        <hr />

        <div>
          <h3>Location Details</h3>
        </div>
        <div style={{ padding: "0 1ch 1ch 0" }}>
          <Typography variant="body2" marginLeft={1}>
            State:{" "} Maharashtra
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            District:{" "} Mumbai
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            City:{" "}Mumbai
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            Pincode:{" "} 400018
          </Typography>
        </div>
        <hr />
        <div>
          <h3>Demographic Details</h3>
        </div>
        <div style={{ padding: "0 1ch 1ch 0" }}>
          <Typography variant="body2" marginLeft={1}>
            Family Income:{" "}
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            Religion:{" "}
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            Caste:{" "}
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            Sub-category:{" "}
          </Typography>
        </div>
        <hr />
        {/* <EducationDisplay /> */}

        <div>
          <h3>Experience Details</h3>
        </div>
        <div style={{ padding: "0 1ch 1ch 0" }}>
          <Typography variant="body2" marginLeft={1}>
            Organization Name:{" "} XYZ
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            Position:{" "} Assistant Professor
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            Employment Type:{" "} Full Time
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            Start date:{" "} Jan, 2010
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            End date:{" "} OnGoing
          </Typography>
          <Typography variant="body2" marginLeft={1}>
            Location:{" "} Mumbai
          </Typography>
        </div>
        {/* <PapersPublishedDisplay /> */}
      </Box>
    </>
  );
}

export default Faculty;
