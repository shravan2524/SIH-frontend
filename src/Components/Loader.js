import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
function Loader({ visible }) {
  return (
    <Backdrop sx={{ color: "#000", zIndex: 10 }} open={visible}>
      <CircularProgress color="secondary" />
    </Backdrop>
  );
}

export default Loader;
