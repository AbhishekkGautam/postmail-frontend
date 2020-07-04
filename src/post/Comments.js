import React, { useState } from "react";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { comment, uncomment } from "./post-api";
import { isAuthenticated } from "../auth/auth-helper";
import { Link } from "react-router-dom";
import { API } from "../backend";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputBase from "@material-ui/core/InputBase";
import { IconButton } from "@material-ui/core";

//import useMediaQuery from "@material-ui/core/useMediaQuery";
//import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  commentField: {
    width: "96%",
  },
  commentText: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    margin: `2px ${theme.spacing(2)}px 2px 2px`,
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em",
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const Comments = ({ postId, updateComments, comments }) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const { user, token } = isAuthenticated();

  const [open, setOpen] = React.useState(false);

  //const theme = useTheme();
  //const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const addComment = (event) => {
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();
      comment(user._id, token, postId, { text: text }).then((data) => {
        if (data?.error) {
          console.log(data.error);
        } else {
          setText("");
          updateComments(data.comments);
          setOpen(true);
        }
      });
    }
  };

  const deleteComment = (comment) => (event) => {
    uncomment(user._id, token, postId, comment).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        updateComments(data.comments);
      }
    });
  };

  const commentBody = (item) => {
    return (
      <p className={classes.commentText} style={{ backgroundColor: "#fafafa" }}>
        <span style={{ display: "block" }}>
          <Link
            to={`/user/${item.postedBy._id}`}
            style={{ textDecoration: "none" }}
          >
            {item.postedBy.name}
          </Link>
          {isAuthenticated().user._id === item.postedBy._id && (
            <Icon
              onClick={deleteComment(item)}
              className={classes.commentDelete}
            >
              delete
            </Icon>
          )}
        </span>
        <br />
        {item.text}
        <span className={classes.commentDate}>
          {new Date(item.created).toDateString()}
        </span>
      </p>
    );
  };

  return (
    <React.Fragment>
      <div>
        <CardHeader
          style={{ backgroundColor: "#ffffff" }}
          avatar={
            <Avatar
              className={classes.smallAvatar}
              src={`${API}/api/users/photo/${isAuthenticated().user._id}`}
            />
          }
          title={
            <InputBase
              inputProps={{ "aria-label": "naked" }}
              onKeyDown={addComment}
              multiline
              value={text}
              onChange={handleChange}
              placeholder="Add a comment..."
              className={classes.commentField}
              margin="normal"
            />
          }
          className={classes.cardHeader}
        />
      </div>
      <Dialog
        fullWidth="true"
        maxWidth="sm"
        scroll="paper"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Comments</DialogTitle>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {comments.map((item, i) => {
            return (
              <CardHeader
                avatar={
                  <Avatar
                    className={classes.smallAvatar}
                    src={`${API}/api/users/photo/${item.postedBy._id}`}
                  />
                }
                title={commentBody(item)}
                className={classes.cardHeader}
                key={i}
              />
            );
          })}
        </DialogContent>
        <CardHeader
          avatar={
            <Avatar
              className={classes.smallAvatar}
              src={`${API}/api/users/photo/${isAuthenticated().user._id}`}
            />
          }
          title={
            <TextField
              autoFocus
              onKeyDown={addComment}
              multiline
              value={text}
              onChange={handleChange}
              placeholder="Add a comment..."
              className={classes.commentField}
              margin="normal"
            />
          }
          className={classes.cardHeader}
        />
      </Dialog>
    </React.Fragment>
  );
};

export default Comments;
