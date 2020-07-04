import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import {
//   createMuiTheme,
//   responsiveFontSizes,
//   ThemeProvider,
// } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
//import PropTypes from "prop-types";
//import AccountCircle from "@material-ui/icons/AccountCircle";
import Person from "@material-ui/icons/Person";
import { isAuthenticated } from "../auth/auth-helper";
import { API } from "../backend";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(3),
    marginTop: 25,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 5,
    },
  },
  subtitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px",
      paddingTop: 2,
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 5,
    },
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
    [theme.breakpoints.down("xs")]: {
      width: 110,
    },
    [theme.breakpoints.up("lg")]: {
      width: 170,
    },
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  button: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px",
    },
  },
}));

const PostWall = () => {
  const classes = useStyles();
  //   let theme = createMuiTheme();
  //   theme = responsiveFontSizes(theme);
  const [values, setValues] = useState({
    user: {},
  });

  //console.log("USER", values.user);

  const { user, token } = isAuthenticated();
  //const [reload, setReload] = useState(false);

  useEffect(() => {
    setValues({ ...values, user: isAuthenticated().user });
  }, []);

  const photoUrl = values.user._id ? (
    `${API}/api/users/photo/${values.user._id}?${new Date().getTime()}`
  ) : (
    <IconButton>
      <Person />
    </IconButton>
  );

  // let fullName = values.user.name;
  // let firstName = fullName.split(" ").slice(0).join(" ");

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={photoUrl}
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" className={classes.heading}>
            {`Hi, ${values.user.name}`}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.subtitle}
          >
            What are you thinking about?
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Link to={"post/create"} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              style={{ textTransform: "none" }}
              className={classes.button}
            >
              Share your thoughts
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default PostWall;
