import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Tooltip,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { getApplications } from "../../bloc/hei";
import { detailsUrl, getApplicationStats } from "../../bloc/details";
import { red } from "@mui/material/colors";
import { Edit } from "@mui/icons-material";
import { putData } from "../../bloc/common";
import Loader from "../Loader";
import { Toaster } from "react-hot-toast";

function ReviewApplications() {
  const params = useParams();
  const [applications, setApplications] = useState([]);
  const [opens, setOpens] = useState([]);
  const [value, setValue] = useState(null);
  const [visibility, setVisibility] = useState(false);

  const handleClickOpen = (index) => {
    setOpens((prev) => {
      let newOpens = opens.slice();
      newOpens[index] = !newOpens[index];
      return newOpens;
    });
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = (data) => {
    setVisibility(true);
    getApplicationStats().then((val) => {
      let appStat = val.filter(
        (el) => el.user == data.user._id && el.posting == params.id
      )[0];

      if (appStat && value) {
        let newData = appStat;
        newData.higherEducationInstitution =
          appStat.higherEducationInstitution._id;
        newData.applicationStatus = value;
        putData(
          `${detailsUrl}/applicationStatus/${appStat._id}`,
          newData
        ).finally(setVisibility(false));
      }
    });
  };

  useEffect(() => {
    getApplications().then((val) => {
      let filtered = val.filter((el) => el.posting == params.id);
      setOpens(filtered.map((v) => false));
      setApplications(filtered);
    });
  }, []);

  return (
    <>
      <Toaster></Toaster>
      <Loader visible={visibility}></Loader>
      <Box style={{ width: "90%", margin: "2em auto" }}>
        {applications.length > 0 ? (
          <>
            <Typography variant="h4">List of Applications</Typography>
            <List>
              {applications.map((el, index) => (
                <>
                  <Dialog
                    key={el?._id}
                    open={opens[index]}
                    onClose={() => {
                      setOpens((prev) => {
                        let newOpens = opens.slice();
                        newOpens[index] = !newOpens[index];
                        return newOpens;
                      });
                    }}
                  >
                    <DialogTitle>Edit Application Status</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Please enter the new status of the application
                      </DialogContentText>
                      <TextField
                        style={{ marginTop: "1em" }}
                        autoFocus
                        id="name"
                        label="Edit Application Status"
                        fullWidth
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </DialogContent>
                    <DialogActions key={el?._id}>
                      <Button
                        onClick={() => {
                          setOpens((prev) => {
                            let newOpens = opens.slice();
                            newOpens[index] = !newOpens[index];
                            return newOpens;
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => handleSubmit(el)}>Submit</Button>
                    </DialogActions>
                  </Dialog>
                  <ListItem
                    key={el?._id}
                    secondaryAction={
                      <Tooltip title="Edit Application Status">
                        <IconButton onClick={() => handleClickOpen(index)}>
                          <Edit></Edit>
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {/* {el?.user.firstName[0]} */}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={el?.user.firstName + " " + el?.user.lastName}
                    ></ListItemText>
                  </ListItem>
                </>
              ))}
            </List>
          </>
        ) : (
          <Typography variant="h4">No applications yet</Typography>
        )}
      </Box>
    </>
  );
}

export default ReviewApplications;
