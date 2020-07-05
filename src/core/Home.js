import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import logo from "./../assets/images/postmail.png";
//import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/auth-helper";
import { Grid, Container, Hidden, Button } from "@material-ui/core";
import FindPeople from "../user/FindPeople";
import NewsFeed from "../post/NewsFeed";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
    paddingTop: 55,
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.text.secondary,
  },
  media: {
    width: 140,
    height: 140,
    alignSelf: "center",
  },
  credit: {
    padding: 10,
    textAlign: "right",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #d0d0d0",
    "& a": {
      color: "#3f4771",
    },
  },
  submit: {
    margin: theme.spacing(2),
    marginRight: 20,
    textTransform: "none",
    width: 120,
  },
}));

const Home = ({ history }) => {
  const classes = useStyles();
  const [defaultPage, setDefaultPage] = useState(false);

  useEffect(() => {
    setDefaultPage(isAuthenticated());
    const unlisten = history.listen(() => {
      setDefaultPage(isAuthenticated());
    });
    return () => {
      unlisten();
    };
  }, []);
  return (
    <div className={classes.root}>
      {!defaultPage && (
        <div>
          <Hidden smDown>
            <Container maxwidth="sm">
              <div style={{ textAlign: "center" }}>
                <Grid container spacing={8}>
                  <Grid item xs={12} sm={12} lg={6}>
                    <div style={{ textAlign: "center" }}>
                      <CardMedia
                        className={classes.media}
                        image={logo}
                        title="Logo"
                      />
                      <Typography variant="h4" style={{ paddingTop: 5 }}>
                        PostMail helps you share your thoughts with people who
                        follows you.
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <div>
                      <Typography variant="h5">Create an account</Typography>
                      <Typography variant="h6" style={{ color: "#616161" }}>
                        It's free and easy.
                      </Typography>
                    </div>
                    <div>
                      <Link to={"/signup"} style={{ textDecoration: "none" }}>
                        <Button
                          disableElevation
                          color="primary"
                          variant="contained"
                          className={classes.submit}
                        >
                          Sign Up
                        </Button>
                      </Link>
                      <Typography variant="h6" style={{ color: "#616161" }}>
                        OR
                      </Typography>
                      <Link to={"/signin"} style={{ textDecoration: "none" }}>
                        <Button
                          disableElevation
                          color="primary"
                          variant="contained"
                          className={classes.submit}
                        >
                          Login
                        </Button>
                      </Link>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </Hidden>
          <Hidden mdUp>
            <div style={{ textAlign: "center" }}>
              <Grid container spacing={8}>
                <Grid item xs={12} sm={12} lg={6}>
                  <div style={{ textAlign: "center" }}>
                    <CardMedia
                      className={classes.media}
                      image={logo}
                      title="Logo"
                    />
                    <Typography variant="h4" style={{ paddingTop: 5 }}>
                      PostMail helps you share your thoughts with people who
                      follows you.
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                  <div>
                    <Typography variant="h5">Create an account</Typography>
                    <Typography variant="h6" style={{ color: "#616161" }}>
                      It's free and easy.
                    </Typography>
                  </div>
                  <div>
                    <Link to={"/signup"} style={{ textDecoration: "none" }}>
                      <Button
                        disableElevation
                        color="primary"
                        variant="contained"
                        className={classes.submit}
                      >
                        Sign Up
                      </Button>
                    </Link>
                    <Typography variant="h6" style={{ color: "#616161" }}>
                      OR
                    </Typography>
                    <Link to={"/signin"} style={{ textDecoration: "none" }}>
                      <Button
                        disableElevation
                        color="primary"
                        variant="contained"
                        className={classes.submit}
                      >
                        Login
                      </Button>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Hidden>
        </div>
      )}
      {defaultPage && (
        <div>
          <Hidden mdDown>
            <Container maxwidth="sm">
              <Grid container spacing={8}>
                <Grid item xs={12} sm={12} lg={7}>
                  <NewsFeed />
                </Grid>
                <Grid item xs={12} sm={12} lg={5}>
                  <FindPeople />
                </Grid>
              </Grid>
            </Container>
          </Hidden>
          <Hidden lgUp>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={12} lg={7}>
                <NewsFeed />
              </Grid>
            </Grid>
          </Hidden>
        </div>
      )}
    </div>
  );
};

export default Home;
