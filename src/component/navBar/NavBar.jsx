//component imports
import React from "react";
//higher functional imports
import NavLinks from "./NavLinks";
import { Route, Switch, Redirect } from "react-router-dom";

import Test from "../Test";
import { Home } from "../home/Home";
//User folder imports
import Login from "../user/Login";
import SignUp from "../user/SignUp";
import CreatePost from "../post/CreatePost";
import { CommentPost } from "../post/CommentPost";
import LogOut from "../user/LogOut";

function NavBar({ user }) {
  const isLoggedOut = (props, Comp) => {
    if (user) return <Redirect to="/" />;
    return <Comp {...props} />;
  };
  const isLogged = (props, Comp) => {
    if (!user) return <Redirect to="/login" />;
    return <Comp {...props} />;
  };

  // {props => {
  //   if(user) return <Redirect to="/"/>
  //   return <Login {...props} />
  // }

  return (
    <>
      <NavLinks user={user} />
      <Switch>
        <Route path="/lol" component={Test} />
        <Route path="/login" render={(props) => isLoggedOut(props, Login)} />
        <Route path="/signup" render={(props) => isLoggedOut(props, SignUp)} />
        <Route
          path="/create"
          render={(props) => isLogged(props, CreatePost)}
        />
        <Route
          path="/comment"
          render={(props) => isLogged(props, CommentPost)}
        />
        <Route path="/logout" render={(props) => isLogged(props, LogOut)} />
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default NavBar;
