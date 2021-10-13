import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../services/httpPostService";

export class Post extends Component {
    //handle getting data Logic
    
  getAllPosts = async (id='') => {
    
      getPosts(id).then(({ data }) => {
        if(!data){
          this.setState({redirect:true})
        }
        else {
          this.setState({ ...this.state, data , singlePostStatus:id});
        }
          
      })
  }

  //handle rendering and maping the posts 
  renderAllPosts = () => {
    if (this.state.singlePostStatus == '' ) {
      return this.state.data.map((post) => (
        this.convertPost(post)
      ))
    } else {
      this.getAllPosts()
    }
    
  }

  //handle obj to JSX 
  convertPost = (post) => {
      return (
        <Link key={post._id} to={location => ({ ...location, pathname: post._id })}>
        <div key={post._id} id={post._id}>
            <div> {post.title} </div>
            <div> {post.description} </div>
            <div> {post.blood_type} </div>
            <div> {post.city} </div>
        </div>
        </Link>
      )
  }

  //handle getting a single post
  renderPost = () => {
    if(this.state.singlePostStatus != "" ) {
      return this.convertPost(this.state.data)
    }
    else{
      let tempPostHolder = this.state.data.filter( (post) => {
        if(post._id === this.props.id){
          return post
        }
      } )
      return this.convertPost(tempPostHolder[0] )
    }
  }


}

export default Post;
