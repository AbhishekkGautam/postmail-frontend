import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { API } from "../backend";
import { Hidden, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 50,
    height: 50,
    margin: "auto",
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 13,
    color: "#3f4771",
  },
}));

const FollowGrid = ({ people }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Hidden xsDown>
          <GridList cellHeight={160} className={classes.gridList} cols={4}>
            {people.map((person, index) => {
              return (
                <GridListTile style={{ height: 120 }} key={index}>
                  <Link
                    to={`/user/${person._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Avatar
                      src={`${API}/api/users/photo/${person._id}`}
                      className={classes.bigAvatar}
                    />
                    <Typography className={classes.tileText}>
                      {person.name}
                    </Typography>
                  </Link>
                </GridListTile>
              );
            })}
          </GridList>
        </Hidden>
      </div>
      <div>
        <Hidden smUp>
          <List style={{ maxHeight: "auto" }}>
            {people.map((person, index) => {
              return (
                <span key={index}>
                  <ListItem>
                    <Link to={`/user/${person._id}`}>
                      <ListItemAvatar className={classes.avatar}>
                        <Avatar
                          src={`${API}/api/users/photo/${person._id}`}
                          className={classes.bigAvatar}
                        />
                      </ListItemAvatar>
                    </Link>
                    <Link
                      to={`/user/${person._id}`}
                      style={{
                        textDecoration: "none",
                        color: "#424242",
                        fontSize: 20,
                      }}
                    >
                      <ListItemText
                        style={{ whiteSpace: "nowrap" }}
                        primary={
                          <Box
                            component="div"
                            textOverflow="ellipsis"
                            overflow="hidden"
                          >
                            <Typography
                              variant="h6"
                              style={{ fontSize: 13, marginLeft: 25 }}
                            >
                              {person.name}
                            </Typography>
                          </Box>
                        }
                      />
                    </Link>
                  </ListItem>
                </span>
              );
            })}
          </List>
        </Hidden>
      </div>
    </React.Fragment>
  );
};

FollowGrid.propTypes = {
  people: PropTypes.array.isRequired,
};

export default FollowGrid;
