//component imports
import React from "react";
//higher functional imports
import { NavLink } from "react-router-dom";

function NavBar({user}) {
  return (
    <nav>
      {
        !user && 
        <>
        <NavLink to="login">Login </NavLink>
        <NavLink to="/signup">SignUp </NavLink>
        </>

      }
      {
        user &&
        <>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/lol">Bruh page </NavLink> 
        <NavLink to="/create">CreatePost</NavLink> 
        <NavLink to="/comment">comment</NavLink> 
        <NavLink to="/logout">Log out</NavLink>
      </>
      }
      
    </nav>
  );
}

export default NavBar;
