import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { FaHome, FaPhoneAlt, FaInfoCircle, FaQuestion } from "react-icons/fa";
import emblem from "./ashok_emblem.png";
import prof from "./prof.png";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#e6f2ff",
      main: "#001730",
      dark: "#0b002e",
      contrastText: "#fff",
    },
    secondary: {
      light: "#eafafa",
      main: "#4AD7D1",
      dark: "#125450",
      contrastText: "#fff",
    },
  },
});

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img
							width={25}
							height={25}
							fit="contain"
							src={emblem}
							alt="National Emblem"
							style={{ margin: "0 2px 12px 10px" }}
						/>
          <Typography
							noWrap
							component="div"
							sx={{ display: { xs: "none", sm: "block" } }}
							style={{
								margin: "0 0 10px 5px",
								verticalAlign: "middle",
								position: "relative",
								fontSize: "16px",
							}}
						>
							Government of India | Ministry of Education
						</Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
              
          </Box>
          
          <ButtonGroup
									disableElevation
									variant="contained"
									aria-label="outlined primary button group"
									style={{ margin: "0 0 8px 0" }}
								>
									<Button
										component={Link}
										to={"/home"}
										style={{ color: "#ffffff", textTransform: "capitalize" }}
									>
										<FaHome
											style={{ margin: "0 10px 2px 0", opacity: "90%" }}
										/>
										Home
									</Button>
									<Button
										component={Link}
										to={"/about"}
										style={{ color: "#ffffff", textTransform: "capitalize" }}
									>
										<FaPhoneAlt
											style={{ margin: "0 10px 5px 0", opacity: "90%" }}
										/>
										About
									</Button>
									<Button
										component={Link}
										to={"/contact"}
										style={{ color: "#ffffff", textTransform: "capitalize" }}
									>
										<FaInfoCircle
											style={{ margin: "0 10px 2px 0", opacity: "90%" }}
										/>
										Contact
									</Button>
									<Button
										component={Link}
										to={"/faqs"}
										style={{ color: "#ffffff", textTransform: "capitalize" }}
									>
										<FaQuestion
											style={{ margin: "0 10px 3px 0", opacity: "90%" }}
										/>
										FAQs
									</Button>
								</ButtonGroup>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={prof} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;