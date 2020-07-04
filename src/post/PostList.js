import React from "react";
//import PropTypes from "prop-types";
import Post from "./Post";
const PostList = ({ posts, removeUpdate }) => {
  return (
    <div style={{ marginTop: "24px" }}>
      {posts &&
        posts.map((post, index) => {
          return <Post post={post} key={index} onRemove={removeUpdate} />;
        })}
    </div>
  );
};

export default PostList;
