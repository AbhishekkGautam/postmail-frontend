import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { follow, unfollow } from "./user-api";
import { Hidden, IconButton } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FollowProfileButton = ({ following, onButtonClick, name }) => {
  const followClick = () => {
    onButtonClick(follow);
  };
  const unfollowClick = () => {
    onButtonClick(unfollow);
  };

  const notify = () => toast.info(`You're following ${name} now!`);

  return (
    <div>
      {following ? (
        <div>
          <Hidden smDown>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                unfollowClick();
              }}
              style={{ textTransform: "none", width: 100 }}
            >
              Following
            </Button>
          </Hidden>
          <Hidden only={["xl", "lg", "md", "xs"]}>
            <IconButton
              onClick={() => {
                unfollowClick();
              }}
              aria-label="Unlike"
              style={{ color: "#1976d2" }}
            >
              <DoneIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Hidden>
          <Hidden smUp>
            <IconButton
              onClick={() => {
                unfollowClick();
              }}
              aria-label="Unlike"
              style={{ color: "#1976d2", marginRight: -15 }}
            >
              <DoneIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Hidden>
        </div>
      ) : (
        <div>
          <Hidden smDown>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => {
                followClick();
                notify();
              }}
              style={{ textTransform: "none", width: 100 }}
            >
              Follow
            </Button>
          </Hidden>
          <Hidden only={["xl", "lg", "md", "xs"]}>
            <IconButton
              onClick={() => {
                followClick();
                notify();
              }}
              aria-label="Unlike"
              style={{ color: "#1976d2" }}
            >
              <PersonAddIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Hidden>
          <Hidden smUp>
            <IconButton
              onClick={() => {
                followClick();
                notify();
              }}
              aria-label="Unlike"
              style={{ color: "#1976d2", marginRight: -15 }}
            >
              <PersonAddIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Hidden>
        </div>
      )}
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

FollowProfileButton.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default FollowProfileButton;
