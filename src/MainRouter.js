import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import EditProfile from "./user/EditProfile";
import Nav from "./core/Nav";
import NewPostForm from "./post/NewPostForm";
import FindPeople from "./user/FindPeople";

const MainRouter = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/post/create" component={NewPostForm} />
        <PrivateRoute exact path="/people" component={FindPeople} />
        <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
        <Route exact path="/user/:userId" component={Profile} />
      </Switch>
    </div>
  );
};

export default MainRouter;
