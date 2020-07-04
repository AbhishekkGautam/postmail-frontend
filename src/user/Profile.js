import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
//import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Typography from "@material-ui/core/Typography";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import CreateIcon from "@material-ui/icons/Create";
import { getUser } from "./user-api";
import { isAuthenticated } from "../auth/auth-helper";
import DeleteUser from "./DeleteUser";
import { Redirect, Link } from "react-router-dom";
import { API } from "../backend";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import { Button, Container, Hidden } from "@material-ui/core";
import { listByUser, listNewsFeed } from "../post/post-api";
import NewPostForm from "../post/NewPostForm";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    minHeight: 630,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10,
  },
}));

const Profile = ({ match, history }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    redirectToSignin: false,
    following: false,
  });

  //state
  const [posts, setPosts] = useState([]);

  const { user, token } = isAuthenticated();

  //getUser
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    getUser(match.params.userId, token, signal).then((data) => {
      if (data?.error) {
        setValues({ ...values, redirectToSignin: true });
      } else {
        let following = checkFollow(data);
        setValues({ ...values, user: data, following: following });
        loadPosts(data._id);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  //loadPost
  const loadPosts = (user) => {
    listByUser(user, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });
  };

  //removePost
  const removePost = (post) => {
    const updatedPosts = posts;
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  if (values.redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id === isAuthenticated().user._id;
    });
    return match;
  };

  const clickFollowButton = (callApi) => {
    callApi(user._id, token, values.user._id).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, user: data, following: !values.following });
      }
    });
  };

  const goBack = () => {
    window.history.back();
  };

  const photoUrl =
    values.user._id && values.user.photo ? (
      <Avatar
        src={`${API}/api/users/photo/${
          values.user._id
        }?${new Date().getTime()}`}
        className={classes.bigAvatar}
      />
    ) : (
      <IconButton>
        <Person />
      </IconButton>
    );

  return (
    <div style={{ paddingTop: 53 }}>
      <Container maxwidth="sm">
        <Hidden smDown>
          <div style={{ marginTop: 37, marginLeft: 20 }}>
            <Link>
              <Avatar
                style={{ backgroundColor: "#f5f5f5", color: "#0d47a1" }}
                onClick={goBack}
              >
                <KeyboardArrowLeftIcon />
              </Avatar>
            </Link>
          </div>
        </Hidden>
        <Paper className={classes.root} elevation={1}>
          <List dense>
            <ListItem>
              <ListItemAvatar>{photoUrl}</ListItemAvatar>
              <ListItemText
                primary={values.user.name}
                secondary={values.user.email}
              />

              {isAuthenticated().user &&
              isAuthenticated().user._id === values.user._id ? (
                <ListItemSecondaryAction>
                  <Hidden smDown>
                    <Link
                      to={`/user/edit/${user._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        small
                        style={{ textTransform: "none", marginRight: 5 }}
                      >
                        Edit Profile
                      </Button>
                    </Link>
                  </Hidden>
                  <Hidden mdUp>
                    <Link
                      to={`/user/edit/${user._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton aria-label="Delete" color="deleteIcon">
                        <CreateIcon style={{ color: "#1e88e5" }} />
                      </IconButton>
                    </Link>
                  </Hidden>
                  <DeleteUser userId={user._id} />
                </ListItemSecondaryAction>
              ) : (
                <FollowProfileButton
                  following={values.following}
                  onButtonClick={clickFollowButton}
                  name={values.user.name}
                />
              )}
            </ListItem>
            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
            <ListItem>
              <ListItemText
                primary={values.user.about}
                secondary={
                  <Typography variant="caption" style={{ color: "#8b98a4" }}>
                    {`Joined ${new Date(values.user.createdAt).toLocaleString(
                      "default",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}`}
                  </Typography>
                }
              />
            </ListItem>
          </List>
          <ProfileTabs
            user={values.user}
            posts={posts}
            removePostUpdate={removePost}
          />
        </Paper>
      </Container>
    </div>
  );
};

export default Profile;
