import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { isAuthenticated } from "../auth/auth-helper";
import PostWall from "./PostWall";
import { listNewsFeed } from "./post-api";
import PostList from "./PostList";
//import NewPostForm from "./NewPostForm";
//import useForceUpdate from "use-force-update";
//import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    fontSize: "1.2em",
  },
  media: {
    minHeight: 330,
  },
}));

const NewsFeed = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  //const [reload, setReload] = useState(false);

  const { user, token } = isAuthenticated();

  //const forceUpdate = useForceUpdate();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listNewsFeed(user._id, token, signal).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  //console.log("POSTS", posts);
  //console.log("RELOAD", reload);

  //   const addPost = (post) => {
  //     const updatedPosts = [...posts];
  //     updatedPosts.unshift(post);
  //     setPosts(updatedPosts);
  //     //forceUpdate();
  //   };

  const removePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <div>
      <PostWall />
      <Typography type="title" className={classes.title}>
        PostFeed
      </Typography>

      <Divider />
      <div style={{ minHeight: 300 }}>
        <div style={{ marginTop: "24px" }}>
          <PostList removeUpdate={removePost} posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
