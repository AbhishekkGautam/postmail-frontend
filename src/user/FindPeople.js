import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
//import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
//import Snackbar from "@material-ui/core/Snackbar";
//import ViewIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import { findPeople, follow } from "./user-api";
import { isAuthenticated } from "../auth/auth-helper";
import { API } from "../backend";
import { Hidden, Box, Container } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    marginTop: 25,
  }),
  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: "1em",
    fontWeight: 600,
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  follow: {
    right: theme.spacing(2),
  },
  snack: {
    color: theme.palette.protectedTitle,
  },
  viewButton: {
    verticalAlign: "middle",
  },
}));

const FindPeople = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: "",
  });

  const { user, token } = isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    findPeople(user._id, token, signal).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, users: data });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const onFollow = (person, index) => {
    follow(user._id, token, person._id).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        let toFollow = values.users;
        toFollow.splice(index, 1);
        setValues({
          ...values,
          users: toFollow,
          open: true,
          followMessage: `You're following ${person.name} now!`,
        });
      }
    });
  };

  const handleRequestClose = () => {
    setValues({ ...values, open: false });
  };

  const notify = (item) => toast.info(`You're following ${item.name} now!`);

  return (
    <div>
      <Container maxWidth="sm">
        <Hidden mdDown>
          <Paper
            className={classes.root}
            elevation={2}
            style={{ maxHeight: 500, overflow: "auto" }}
          >
            <Typography type="title" className={classes.title}>
              Discover People
            </Typography>
            <List style={{ maxHeight: "100" }}>
              {values.users.map((item, index) => {
                return (
                  <span key={index}>
                    <ListItem>
                      <Link to={`/user/${item._id}`}>
                        <ListItemAvatar className={classes.avatar}>
                          <Avatar src={`${API}/api/users/photo/${item._id}`} />
                        </ListItemAvatar>
                      </Link>
                      <Link
                        to={`/user/${item._id}`}
                        style={{
                          textDecoration: "none",
                          color: "#000000",
                          fontWeight: 300,
                        }}
                      >
                        <ListItemText primary={item.name} />
                      </Link>
                      <ListItemSecondaryAction className={classes.follow}>
                        <Button
                          small
                          disableElevation
                          aria-label="Follow"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            onFollow(item, index);
                            notify(item);
                          }}
                          style={{ textTransform: "none", width: 100 }}
                        >
                          Follow
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </span>
                );
              })}
            </List>
          </Paper>
        </Hidden>
      </Container>
      <Hidden only={["lg", "xl"]}>
        <Paper
          className={classes.root}
          elevation={0}
          style={{ maxHeight: "auto", overflow: "auto", marginTop: 45 }}
        >
          <Typography type="title" className={classes.title}>
            Discover People
          </Typography>
          <List style={{ maxHeight: "auto" }}>
            {values.users.map((item, index) => {
              return (
                <span key={index}>
                  <ListItem>
                    <Link to={`/user/${item._id}`}>
                      <ListItemAvatar className={classes.avatar}>
                        <Avatar src={`${API}/api/users/photo/${item._id}`} />
                      </ListItemAvatar>
                    </Link>
                    <Link
                      to={`/user/${item._id}`}
                      style={{
                        textDecoration: "none",
                        color: "#424242",
                        fontSize: 20,
                      }}
                    >
                      <ListItemText
                        style={{ whiteSpace: "nowrap" }}
                        primary={
                          <Box
                            component="div"
                            textOverflow="ellipsis"
                            overflow="hidden"
                          >
                            <Typography variant="h6" style={{ fontSize: 13 }}>
                              {item.name}
                            </Typography>
                          </Box>
                        }
                      />
                    </Link>
                    <ListItemSecondaryAction className={classes.follow}>
                      <Hidden xsDown>
                        <Button
                          small
                          disableElevation
                          aria-label="Follow"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            onFollow(item, index);
                            notify(item);
                          }}
                          style={{
                            textTransform: "none",
                            width: 100,
                            height: 35,
                          }}
                        >
                          Follow
                        </Button>
                      </Hidden>
                      <Hidden smUp>
                        <Button
                          small
                          disableElevation
                          aria-label="Follow"
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            onFollow(item, index);
                            notify(item);
                          }}
                          style={{
                            textTransform: "none",
                            width: 80,
                            height: 30,
                            paddingBottom: 10,
                          }}
                        >
                          Follow
                        </Button>
                      </Hidden>
                    </ListItemSecondaryAction>
                  </ListItem>
                </span>
              );
            })}
          </List>
        </Paper>
      </Hidden>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default FindPeople;
