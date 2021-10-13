import React, { Component } from "react";
import GetAllPosts from "../post/GetAllPosts";
import { getUser } from "../../services/httpService";

export class Home extends Component {
  user = getUser()
  render() {
    if(!this.user){
      return(
        <div>
          welcome to blood heros component
        </div>
      )
    }
    if(this.props.match.path === '/:id'){
      return (
        <div>
          <GetAllPosts id={this.props.match.url.substring(1)} />
        </div>
        );
    }
    return (
      <div>
        <GetAllPosts  />
      </div>
    );
  }
}

export default Home;
