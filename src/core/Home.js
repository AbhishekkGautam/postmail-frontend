import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import logo from "./../assets/images/postmail.png";
//import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/auth-helper";
import { Grid, Container, Hidden } from "@material-ui/core";
import FindPeople from "../user/FindPeople";
import NewsFeed from "../post/NewsFeed";

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
    width: 100,
    height: 100,
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
          <Container maxwidth="sm">
            <Grid container spacing={8}>
              <Grid item xs={12} sm={12} lg={7}>
                <div>
                  <CardMedia
                    className={classes.media}
                    image={logo}
                    title="Logo"
                  />
                  <Typography variant="h5" className={classes.title}>
                    PostMail helps you share your thoughts with people who
                    follows you.
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} lg={5}>
                <div>
                  <Typography variant="h5" className={classes.title}>
                    Create an account
                  </Typography>
                  <Typography variant="h6" className={classes.title}>
                    It's free and easy.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Container>
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
