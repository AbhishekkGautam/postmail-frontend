import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { isAuthenticated } from "../auth/auth-helper";
import { deleteUser } from "./user-api";
import { Redirect } from "react-router-dom";
import { signout } from "../auth/auth-api";
import { Hidden } from "@material-ui/core";

const DeleteUser = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { user, token } = isAuthenticated();

  const onClick = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  const deleteAccount = () => {
    deleteUser(userId, token).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        signout(() => console.log("deleted"));
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return <Redirect to="/signup" />;
  }

  return (
    <span>
      <Hidden smDown>
        <IconButton aria-label="Delete" onClick={onClick} color="deleteIcon">
          <DeleteIcon style={{ color: "#1e88e5" }} />
        </IconButton>
      </Hidden>
      <Hidden mdUp>
        <IconButton
          aria-label="Delete"
          onClick={onClick}
          color="deleteIcon"
          style={{ marginRight: -20 }}
        >
          <DeleteIcon style={{ color: "#1e88e5" }} />
        </IconButton>
      </Hidden>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default DeleteUser;
