import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import architecture from "./../assets/images/architecture.jpg";
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
    minHeight: 400,
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
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <Typography variant="h6" className={classes.title}>
                Home Page
              </Typography>
              <CardMedia
                className={classes.media}
                image={architecture}
                title="Unicorn Bicycle"
              />
              <Typography
                variant="body2"
                component="p"
                className={classes.credit}
                color="textSecondary"
              >
                Photo by{" "}
                <a
                  href="https://unsplash.com/@boudewijn_huysmans"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Boudewijn Huysmans
                </a>{" "}
                on Unsplash
              </Typography>
              <CardContent>
                <Typography type="body1" component="p">
                  Welcome to the MERN Social home page.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      {defaultPage && (
        <Container maxwidth="sm">
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12} lg={7}>
              <NewsFeed />
            </Grid>
            <Hidden mdDown>
              <Grid item xs={12} sm={12} lg={5}>
                <FindPeople />
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default Home;
