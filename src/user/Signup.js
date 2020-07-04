import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { createUser } from "./user-api";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    boxShadow: "none",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
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
}));

const Signup = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    open: false,
    error: "",
  });

  const { name, email, password, error, open } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createUser({ name, email, password }).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
        console.log("SIGNUP", error);
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          open: true,
        });
      }
    });
    //.catch(console.log("Error in signup"));
  };

  return (
    <div style={{ paddingTop: 60 }}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up
          </Typography>
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
          >
            Submit
          </Button>
        </CardActions>
        <Typography>
          Have an account?{" "}
          <Link to="/signin" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Card>
      <Dialog open={open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New Account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button
              color="primary"
              autoFocus="autoFocus"
              variant="contained"
              style={{ textTransform: "none" }}
            >
              Login
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Signup;
