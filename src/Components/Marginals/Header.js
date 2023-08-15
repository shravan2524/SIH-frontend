import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import emblem from "./ashok_emblem.png";
import prof from "./prof.png";
import aicte from "./aicte.png";
import { logout, verify } from "../../bloc/auth";
import Loader from "../../Components/Loader";

export default function Header() {
  const settings = ["Dashboard", "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState([]);
  const [visibility, setVisibility] = React.useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    setVisibility(true);
    verify()
      .then((val) => {
        if (val || val?.userId) setUser(val);
      })
      .finally(setVisibility(false));
  }, []);

  // const theme = createTheme({
  // 	palette: {
  // 		primary: {
  // 			light: "#000000",
  // 			main: "#1B1D21",
  // 			dark: "#505662",
  // 			contrastText: "#fff",
  // 		},
  // 	},
  // });

  const theme = createTheme({
    palette: {
      // primary: {
      // 	light: "#e6f2ff",
      // 	main: "#001730",
      // 	dark: "#0b002e",
      // 	contrastText: "#fff",
      // },
      primary: {
        light: "#000000",
        main: "#1B1D21",
        dark: "#505662",
        contrastText: "#fff",
      },
      secondary: {
        light: "#f2f2f2",
        main: "#ffffff",
        dark: "#e6e6e6",
        contrastText: "#408FF6",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Loader visible={visibility}></Loader>
      <Box sx={{ flexGrow: 1, backgroundColor: "primary.light" }}>
        <AppBar position="fixed" style={{ height: "55px" }}>
          <Toolbar>
            <img
              width={25}
              height={25}
              fit="contain"
              src={emblem}
              alt="National Emblem"
              style={{ margin: "0 2px 18px 10px" }}
            />
            <Typography
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              style={{
                margin: "0 0 15px 5px",
                verticalAlign: "middle",
                position: "relative",
                fontSize: "16px",
              }}
            >
              Government of India | Ministry of Education
            </Typography>
            <Box sx={{ flexGrow: 0, position:"absolute", right:"3rem", top:"10px" }} >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={prof}
					style={{height:"1.5em" ,width:"1.5em"}}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === "Logout" ? logout : handleCloseUserMenu
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <Typography
              noWrap
              textAlign="center"
              style={{ margin: "2ch 1ch 4ch 0" }}
            >
              {user?.firstName + " " + user?.lastName}
            </Typography> */}
          </Toolbar>
        </AppBar>

        <AppBar
          position="fixed"
          elevation={1}
          color="secondary"
          style={{ marginTop: "45px", height: "35px" }}
        >
          <Toolbar>
            <img
              width={20}
              height={20}
              fit="contain"
              src={aicte}
              alt="AICTE logo"
              style={{ margin: "0 2px 30px 15px" }}
            />
            <Typography
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              style={{
                margin: "0 0 30px 10px",
                verticalAlign: "middle",
                position: "relative",
                fontSize: "12px",
                color: "#0C7ECA",
              }}
            >
              All India Council for Technical Education | Indian Regulatory Body
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
