//component imports
import React from "react";
//higher functional imports
import NavLinks from "./NavLinks";
import { Route, Switch, Redirect } from "react-router-dom";
import { isAdmin } from "../common/isAdmin";
import Test from "../Test";
import { Home } from "../home/Home";
//User folder imports
import Login from "../user/Login";
import SignUp from "../user/SignUp";
import CreatePost from "../post/CreatePost";
import LogOut from "../user/LogOut";
import { AdminPanel } from './../admin/AdminPanel';

function NavBar({ user }) {
  const isLoggedOut = (props, Comp ) => {
    if (user) return <Redirect to="/" />;
    return <Comp {...props} />;
  };
  const isLogged = (props, Comp ) => {
    if (!user) return <Redirect to="/login" />;
    return <Comp {...props}  />;
  };
  return (
    <>
      <NavLinks user={user} />
      <Switch >
        <Route path="/lol" component={Test} />
        <Route path="/login" render={(props) => isLoggedOut(props, Login)} />
        <Route path="/signup" render={(props) => isLoggedOut(props, SignUp)} />
        <Route
          path="/create"
          render={(props) => isLogged(props, CreatePost)}
        />
        <Route path="/logout" render={(props) => isLogged(props, LogOut)} />
        <Route path="/admin" render={(props) => {
          const admin = isAdmin()
          if(!admin){
            return <Redirect to="/" />
          }
          return<AdminPanel {...props} />
        }}  />
        <Route exact path="/" 
          render={ (props) => {return <Home {...props} />} }
        />
        <Route path="/:id" component={Home} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default NavBar;
