import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Marginals/Header";
import NavBar from "./Marginals/NavBar";
import CollegeAside from "./Dashboard/CollegeAside";
import FacultyAside from "./Dashboard/FacultyAside";
import Footer from "./Marginals/Footer";
import Demo from "./Marginals/Demo";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import AicteDashboard from "./Dashboard/AicteDashboard";
// import ScrollAffix from "./ScrollAffix";
// import FacultyDashboard from "../Components/Dashboard/FacultyDashboard";
// import CollegeDashboard from "../Components/Dashboard/CollegeDashboard";

function Layout({ role = "User" }) {
  return (
    <>
      {/* All common elements */}
      {/* <Header />
      <NavBar /> */}
      <Grid container style={{ marginBottom: "8em" }}>
        <Grid item xs={3} md={2}>
          {(() => {
            switch (role) {
              case "User":
                return <FacultyAside />;
              case "HEI":
                return <CollegeAside />;
              case "AICTE-Admin":
                return <AicteDashboard />;
              default:
                break;
            }
          })()}
        </Grid>
        <Grid item xs={9} md={10}>
          <Outlet></Outlet>
        </Grid>
      </Grid>
      {/* <Footer /> */}
      {/* <FacultyDashboard /> */}
      {/* <CollegeDashboard /> */}
      {/* <ScrollAffix /> */}
    </>
  );
}

export default Layout;
