const { createTheme } = require("@mui/material/styles");

// Old Theme
const globalTheme = createTheme({
  palette: {
    primary: {
      main: "#3ab0c7",
      light: "#334559",
      dark: "#001021",
    },
    secondary: {
      main: "#4AD7D1",
      dark: "#339692",
      light: "#6edfda",
    },
  },
});
export { globalTheme };
