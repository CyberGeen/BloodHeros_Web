//component imports
import React from "react";
//higher functional imports
import { NavLink } from "react-router-dom";
import { isAdmin } from "../common/isAdmin";
function NavLinks({user}) {
  return (
    <nav>
      {
        !user && 
        <>
        <NavLink to="login"> Login </NavLink>
        <NavLink to="/signup"> SignUp </NavLink>
        </>
      }
      {
        user &&
        <>
        <NavLink to="/"> Home</NavLink>
        <NavLink to="/lol"> Bruh page </NavLink> 
        <NavLink to="/create"> CreatePost </NavLink> 
        <NavLink to="/me"> ME PAGE </NavLink> 
        <NavLink to="/logout"> Logout </NavLink>
      </>
      }
      {
        isAdmin() && 
        <NavLink to="/admin" > Admin Panel </NavLink>
      }
    </nav>
  );
}

export default NavLinks;
