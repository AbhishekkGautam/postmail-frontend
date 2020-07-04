import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
//import HomeIcon from "@material-ui/icons/Home";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { isAuthenticated } from "../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";
import { signout } from "../auth/auth-api";
import { Container, Avatar, Hidden } from "@material-ui/core";
import { API } from "../backend";

import "./../App.css";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ffffff" };
  else return { color: "#ffffff" };
};

const Nav = ({ history }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <AppBar position="fixed" color="primary">
        <Container maxwidth="xs">
          <Toolbar>
            <Hidden smDown>
              <Typography variant="h6" color="inherit">
                PostMail
              </Typography>
            </Hidden>
            <Hidden mdUp>
              <Typography variant="body1" color="inherit">
                PostMail
              </Typography>
            </Hidden>
            <div style={{ flexGrow: 1 }}>
              <Hidden smDown>
                <div style={{ marginLeft: 30, display: "inline" }}>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button
                      color="inherit"
                      style={
                        (isActive(history, "/"),
                        { textTransform: "none", color: "#ffffff" })
                      }
                    >
                      Home
                    </Button>
                  </Link>
                </div>
              </Hidden>
              <Hidden mdUp>
                <div style={{ marginLeft: 10, display: "inline" }}>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button
                      color="inherit"
                      style={
                        (isActive(history, "/"),
                        { textTransform: "none", color: "#ffffff" })
                      }
                    >
                      Home
                    </Button>
                  </Link>
                </div>
              </Hidden>
              {isAuthenticated() && (
                <Hidden lgUp>
                  <div style={{ marginLeft: 5, display: "inline" }}>
                    <Link to="/people" style={{ textDecoration: "none" }}>
                      <Button
                        color="inherit"
                        style={
                          (isActive(history, "/people"),
                          { textTransform: "none", color: "#ffffff" })
                        }
                      >
                        People
                      </Button>
                    </Link>
                  </div>
                </Hidden>
              )}
            </div>

            {!isAuthenticated() && (
              <Box display="flex" justifyContent="flex-end">
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", marginRight: 15 }}
                >
                  <Button
                    color="inherit"
                    style={
                      (isActive(history, "/signup"),
                      { textTransform: "none", color: "#ffffff" })
                    }
                  >
                    Sign up
                  </Button>
                </Link>
                <Link to="/signin" style={{ textDecoration: "none" }}>
                  <Button
                    color="inherit"
                    style={
                      (isActive(history, "/signin"),
                      { textTransform: "none", color: "#ffffff" })
                    }
                  >
                    Sign in
                  </Button>
                </Link>
              </Box>
            )}
            {isAuthenticated() && (
              <Box display="flex" justifyContent="flex-end">
                <Hidden smDown>
                  <Link to={`/user/${isAuthenticated().user._id}`}>
                    <Avatar
                      src={`${API}/api/users/photo/${
                        isAuthenticated().user._id
                      }?${new Date().getTime()}`}
                      style={{ marginRight: 30 }}
                    />
                  </Link>
                </Hidden>
                <Hidden mdUp>
                  <Link to={`/user/${isAuthenticated().user._id}`}>
                    <Avatar
                      src={`${API}/api/users/photo/${
                        isAuthenticated().user._id
                      }?${new Date().getTime()}`}
                      style={{
                        marginRight: 10,
                        marginTop: 6,
                        height: 35,
                        width: 35,
                      }}
                    />
                  </Link>
                </Hidden>
                <Hidden smDown>
                  <Button
                    color="inherit"
                    style={{ textTransform: "none", color: "#ffffff" }}
                    onClick={() => {
                      signout(() => history.push("/signin"));
                    }}
                  >
                    Log out
                  </Button>
                </Hidden>
                <Hidden mdUp>
                  <IconButton
                    aria-label="more"
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{ marginRight: -12 }}
                  >
                    <MoreVertIcon style={{ color: "#ffffff" }} />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        signout(() => history.push("/signin"));
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </Hidden>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default withRouter(Nav);
