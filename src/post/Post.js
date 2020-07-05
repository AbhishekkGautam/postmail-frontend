import React, { useState, useEffect } from "react";
import ReadMoreReact from "read-more-react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Link, Redirect, withRouter } from "react-router-dom";
//import CommentIcon from "@material-ui/icons/Comment";
import Divider from "@material-ui/core/Divider";
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { isAuthenticated } from "../auth/auth-helper";
import { removePost, like, unlike } from "./post-api";
import { API } from "../backend";
import Comments from "./Comments";
import { CardMedia, Button } from "@material-ui/core";
import ViewComments from "./ViewComments";

//import ReactHashtag from "react-hashtag";

import "../App.css";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(2),
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    boxShadow: "none",
    border: 1,
    borderColor: "#f5f5f5",
    borderStyle: "solid",
  },
  cardContent: {
    backgroundColor: "white",
    padding: `${theme.spacing(2)}px 0px`,
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
    marginTop: -5,
  },
  photo: {
    backgroundColor: "#ffffff",
    padding: theme.spacing(0),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  button: {
    marginTop: theme.spacing(-2),
    width: 33,
    height: 33,
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(0),
    },
  },
  likes: {
    marginTop: theme.spacing(-2),
    color: "#757575",
    fontSize: 14,
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(0),
    },
  },

  likeIcon: {
    [theme.breakpoints.down("xs")]: {
      marginTop: -4,
    },
  },
  comments: {
    marginTop: theme.spacing(-2),
    color: "#757575",
    fontSize: 12,
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(0),
    },
  },
  subheader: {
    fontSize: 10,
  },
}));

const Post = ({ post, onRemove, history }) => {
  const classes = useStyles();

  const { user, token } = isAuthenticated();

  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const onClick = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  //console.log("POST.JS", post);

  const checkLike = (likes) => {
    let match = likes.indexOf(user._id) !== -1;
    return match;
  };
  const [values, setValues] = useState({
    like: checkLike(post.likes),
    likes: post.likes.length,
    comments: post.comments,
  });

  const onLike = () => {
    let callApi = values.like ? unlike : like;
    callApi(user._id, token, post._id).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, like: !values.like, likes: data.likes.length });
      }
    });
  };

  const updateComments = (comments) => {
    setValues({ ...values, comments: comments });
  };

  const deletePost = () => {
    removePost(post._id, token).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        onRemove(post);
        setRedirect(true);
      }
    });
  };

  //console.log("POSTED BY", post.postedBy);
  //const postText = <ReactHashtag>{post.text}</ReactHashtag>;

  useEffect(() => {}, [redirect]);

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader
          style={{ backgroundColor: "#f5f5f5" }}
          avatar={
            <Avatar
              src={`${API}/api/users/photo/${
                post.postedBy._id
              }?${new Date().getTime()}`}
            />
          }
          action={
            post.postedBy._id === isAuthenticated().user._id &&
            history.location.pathname === `/user/${user._id}` && (
              <IconButton onClick={onClick}>
                <DeleteIcon />
              </IconButton>
            )
          }
          title={
            <Link
              to={`/user/${post.postedBy._id}`}
              style={{ textDecoration: "none", color: "#000000", fontSize: 15 }}
            >
              {post.postedBy.name}
            </Link>
          }
          subheader={
            <Typography variant="caption">
              {new Date(post.createdAt).toLocaleString("default", {
                month: "long",
                day: "2-digit",
              })}
            </Typography>
          }
          className={classes.cardHeader}
        />

        {post.photo && (
          <div className={classes.photo}>
            <CardMedia
              className={classes.media}
              image={`${API}/api/posts/photo/${post._id}`}
            />
          </div>
        )}
        <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.text}>
            <ReadMoreReact text={post.text} readMoreText="...more" max={500} />
          </Typography>
        </CardContent>
        <CardActions style={{ backgroundColor: "#ffffff" }}>
          {values.like ? (
            <IconButton
              onClick={onLike}
              className={classes.button}
              aria-label="Like"
              color="secondary"
            >
              <FavoriteIcon
                style={{ fontSize: 20 }}
                className={classes.likeIcon}
              />
            </IconButton>
          ) : (
            <IconButton
              onClick={onLike}
              className={classes.button}
              aria-label="Unlike"
              style={{ color: "#42a5f5" }}
            >
              <FavoriteBorderIcon
                style={{ fontSize: 20 }}
                className={classes.likeIcon}
              />
            </IconButton>
          )}
          <Typography component="p" className={classes.likes}>
            {values.likes}
          </Typography>
          <ViewComments
            postId={post._id}
            comments={values.comments}
            updateComments={updateComments}
          />
          <Typography
            component="p"
            className={classes.comments}
            variant="caption"
          >
            {values.comments.length === 0 ? (
              <Typography component="p">{values.comments.length}</Typography>
            ) : values.comments.length === 1 ? (
              `View ${values.comments.length} comment`
            ) : (
              `View all ${values.comments.length} comments`
            )}
          </Typography>
        </CardActions>

        <Comments
          postId={post._id}
          comments={values.comments}
          updateComments={updateComments}
        />
      </Card>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Post"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your post.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deletePost} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withRouter(Post);
