import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Person from "@material-ui/icons/Person";
import { Link, Redirect } from "react-router-dom";
import { getAllUsers } from "./user-api";
import { isAuthenticated } from "../auth/auth-helper";
import { API } from "../backend";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  bigAvatar: {
    width: 40,
    height: 40,
    margin: 10,
  },
}));

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  }, []);

  return (
    <div>
      {isAuthenticated().user ? (
        <Paper className={classes.root} elevation={4}>
          <Typography variant="h6" className={classes.title}>
            All Users
          </Typography>
          <List dense>
            {users &&
              users.map((user, index) => {
                return (
                  <Link
                    to={`/user/${user._id}`}
                    key={index}
                    style={{ textDecoration: "none" }}
                  >
                    <ListItem button>
                      <ListItemAvatar>
                        {user._id ? (
                          <Avatar
                            src={`${API}/api/users/photo/${
                              user._id
                            }?${new Date().getTime()}`}
                            className={classes.bigAvatar}
                          />
                        ) : (
                          <Avatar>
                            <Person />
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <ListItemText primary={user.name} />
                      <ListItemSecondaryAction>
                        <IconButton>
                          <ArrowForward />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Link>
                );
              })}
          </List>
        </Paper>
      ) : (
        <Redirect to="/signin" />
      )}
    </div>
  );
};

export default Users;
