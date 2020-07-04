import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import { isAuthenticated } from "../auth/auth-helper";
import { getUser, updateUser } from "./user-api";
import { Redirect } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { API } from "../backend";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(0),
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: "middle",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
  },
}));

const EditProfile = ({ match, history }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    about: "",
    photo: "",
    open: false,
    error: "",
    id: "",
    redirectToProfile: false,
  });

  const {
    name,
    email,
    password,
    about,
    photo,
    id,
    open,
    error,
    redirectToProfile,
  } = values;
  const { user, token } = isAuthenticated();

  useEffect(() => {
    getUser(match.params.userId, token).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          id: data._id,
          name: data.name,
          email: data.email,
          about: data.about,
        });
      }
    });
  }, [match.params.userId]);

  //console.log("VALUES", values);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let userData = new FormData();
    name && userData.append("name", name);
    email && userData.append("email", email);
    password && userData.append("passoword", password);
    about && userData.append("about", about);
    photo && userData.append("photo", photo);
    updateUser(match.params.userId, token, userData).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          redirectToProfile: true,
        });
      }
    });
  };

  if (redirectToProfile) {
    return <Redirect to={`/user/${user._id}`} />;
  }

  const goBack = () => {
    history.push(`/user/${user._id}`);
  };

  return (
    <div style={{ paddingTop: 50 }}>
      <Card className={classes.card}>
        <div style={{ marginTop: 30, marginLeft: 30, position: "absolute" }}>
          <Link>
            <Avatar
              style={{ backgroundColor: "#f5f5f5", color: "#0d47a1" }}
              onClick={goBack}
            >
              <KeyboardArrowLeftIcon />
            </Avatar>
          </Link>
        </div>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Profile
          </Typography>
          <Avatar
            src={`${API}/api/users/photo/${values.id}?${new Date().getTime()}`}
            className={classes.bigAvatar}
          />
          <br />
          <input
            accept="image/*"
            onChange={handleChange("photo")}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <Button
              variant="outlined"
              color="primary"
              component="span"
              style={{ textTransform: "none" }}
              fontSize="small"
            >
              New Profile Photo
              <FileUpload style={{ paddingLeft: 5 }} />
            </Button>
          </label>
          <span className={classes.filename}>{photo ? photo.name : ""}</span>
          <br />
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <br />
          <TextField
            id="multiline-flexible"
            label="About"
            multiline
            rows="2"
            value={about}
            onChange={handleChange("about")}
            className={classes.textField}
            margin="normal"
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={password}
            onChange={handleChange("password")}
            margin="normal"
          />
          <br />
          {error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={onSubmit}
            className={classes.submit}
            style={{ textTransform: "none", width: 100 }}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default EditProfile;
