import { createMuiTheme } from "@material-ui/core/styles";
//import { white, pink } from "@material-ui/core/colors";
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: "#5c67a3",
      main: "#406fcf",
      dark: "#5183e8",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff79b0",
      main: "#f44336",
      dark: "#c60055",
      contrastText: "#000",
    },
    openTitle: "#3f4771",
    protectedTitle: "#ffffff",
    type: "light",

    unfollowButton: {
      main: "#fff",
      contrastText: "#3f4771",
    },
    deleteIcon: {
      light: "#e3f2fd ",
      main: "#bbdefb",
      dark: "#90caf9",
    },
    navbar: {
      main: "#4267b2",
    },
  },
});
export default theme;
