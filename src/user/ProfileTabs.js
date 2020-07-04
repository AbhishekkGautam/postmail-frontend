import React, { useState } from "react";
//import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FollowGrid from "./FollowGrid";
//import SwipeableViews from "react-swipeable-views";
import PostList from "../post/PostList";

const ProfileTabs = ({ user, removePostUpdate, posts }) => {
  const [tab, setTab] = useState(0);
  //console.log("POSTS", posts);
  const handleTabChange = (event, value) => {
    setTab(value);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            label={
              <div
                style={{
                  display: "block",
                  textTransform: "none",
                }}
              >
                <div>{posts.length}</div>
                <div>Posts</div>
              </div>
            }
          />
          <Tab
            label={
              <div style={{ display: "block", textTransform: "none" }}>
                <div>{user.followers.length}</div>
                <div>Followers</div>
              </div>
            }
          />
          <Tab
            label={
              <div style={{ display: "block", textTransform: "none" }}>
                <div>{user.following.length}</div>
                <div>Following</div>
              </div>
            }
          />
        </Tabs>
      </AppBar>
      {tab === 0 && (
        <TabContainer>
          <PostList removeUpdate={removePostUpdate} posts={posts} />
        </TabContainer>
      )}
      {tab === 1 && (
        <TabContainer>
          <FollowGrid people={user.followers} />
        </TabContainer>
      )}
      {tab === 2 && (
        <TabContainer>
          <FollowGrid people={user.following} />
        </TabContainer>
      )}
    </div>
  );
};

export default ProfileTabs;

const TabContainer = ({ children }) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {children}
    </Typography>
  );
};
