import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
//import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
//import AccountCircle from "@material-ui/icons/AccountCircle";
import Person from "@material-ui/icons/Person";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { isAuthenticated } from "../auth/auth-helper";
import { createPost, listNewsFeed } from "./post-api";
import { API } from "../backend";
import { Link } from "react-router-dom";
import { Grid, Container, Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: "#efefef",
    padding: `${theme.spacing(3)}px 0px 1px`,
    paddingTop: -53,
    [theme.breakpoints.down("sm")]: {
      marginTop: 70,
    },
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    marginBottom: theme.spacing(3),
    backgroundColor: "rgba(65, 150, 136, 0.09)",
    //boxShadow: "none",
  },
  cardContent: {
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  photoButton: {
    height: 30,
    width: 30,
    marginBottom: 5,
  },
  input: {
    display: "none",
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "90%",
    height: 180,
  },
  submit: {
    margin: theme.spacing(2),
    float: "right",
    marginRight: 20,
    textTransform: "none",
    width: 120,
  },
  filename: {
    verticalAlign: "super",
  },
}));

const NewPostForm = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    text: "",
    photo: "",
    error: "",
    user: {},
  });

  const [postform, setPostform] = useState([]);

  //console.log("USER", values.user);

  const { user, token } = isAuthenticated();
  //const [reload, setReload] = useState(false);

  useEffect(() => {
    setValues({ ...values, user: isAuthenticated().user });
  }, []);

  const onPost = () => {
    let postData = new FormData();
    postData.append("text", values.text);
    postData.append("photo", values.photo);
    createPost(user._id, token, postData).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, text: "", photo: "" });
        addPost();
        //reloadPage();
      }
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listNewsFeed(user._id, token, signal).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setPostform(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const addPost = (post) => {
    const updatedPosts = [...postform];
    updatedPosts.unshift(post);
    setPostform(updatedPosts);
    //forceUpdate();
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const photoUrl =
    values.user._id || values.user.photo ? (
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

  const goBack = () => {
    window.history.back();
  };

  return (
    <div style={{ minHeight: 600 }}>
      <Container maxwidth="sm">
        <Hidden smDown>
          <div style={{ marginTop: 90, marginLeft: 20 }}>
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
        <div className={classes.root}>
          <Card className={classes.card}>
            <CardHeader
              avatar={photoUrl}
              title={values.user.name}
              className={classes.cardHeader}
              style={{ backgroundColor: "#e3edff" }}
            />
            <CardContent className={classes.cardContent}>
              <TextField
                placeholder="Share your thoughts ..."
                multiline
                rows="8"
                value={values.text}
                onChange={handleChange("text")}
                className={classes.textField}
                margin="normal"
              />
              <input
                accept="image/*"
                onChange={handleChange("photo")}
                className={classes.input}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  className={classes.photoButton}
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <span className={classes.filename}>
                {values.photo ? values.photo.name : ""}
              </span>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Button
                  disableElevation
                  color="primary"
                  variant="contained"
                  disabled={values.text === ""}
                  onClick={() => {
                    onPost();
                  }}
                  className={classes.submit}
                >
                  Post
                </Button>
              </Link>
              {values.error && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>
                    error
                  </Icon>
                  {values.error}
                </Typography>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default NewPostForm;
