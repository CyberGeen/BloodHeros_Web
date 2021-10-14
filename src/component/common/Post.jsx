import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../services/httpPostService";
import { CommentPost } from './../post/CommentPost';

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
    if (this.state.singlePostStatus === '' ) {
      return this.state.data.map((post) => (
        this.convertPost(post)
      ))
    } else {
      this.getAllPosts()
    }
    
  }

  //handle obj to JSX 
  convertPost = (post , comment='' , singlePost=false) => {
    if(!singlePost) {
      return (
        <div key={post._id}>
        <Link  to={location => ({ ...location, pathname: post._id })}>
          {this.postJSX(post)}          
        </Link>
        </div>
      )
    }
    return (
      <>
        {this.postJSX(post)}
        {comment}
      </>
    )
      
  }

  //quality of life changes
  postJSX = (post) => {
    return (
      <div key={post._id} id={post._id}>
            <div> {post.title} </div>
            <div> {post.description} </div>
            <div> {post.blood_type} </div>
            <div> {post.city} </div>
        </div>
    )
  }

  //handle getting a single post
  renderPost = () => {
    if(this.state.singlePostStatus !== "" ) {
      return this.convertPost(this.state.data , this.renderComment(this.state.data.comments) , true )
    }
    else{
      let tempPostHolder = this.state.data.filter( (post) => {
        // supreme ternary return :)
        return ((post._id === this.props.id) ? post : '' )
        // if(post._id === this.props.id){
        //   return post
        // }
      } )
      return this.convertPost(tempPostHolder[0] , this.renderComment(tempPostHolder[0].comments) , true )
    }
  }

  //----------------comment section----------------
  renderComment = (data) => {
    const handleCommentStateRef = (action='GET' , target=null ) => {
      return this.handleCommentState(action , data , target)
    }
    return (
      <CommentPost data={data} handleCommentState={handleCommentStateRef} />
    )
  }

  //avoid rep and over complicated children by simplifying params
  

  handleCommentState = (action = 'GET' , org , target=null) => {
    // comment state role : keep the state tact , handle jsx changes inside comment component
    //redux style
    switch (action) {
      case 'GET':
        return org
        break;
      case 'POST':
        //no optimistic needs a comment id
        break;
      case 'PUT':
        //opttimistic aproch
        break;
      case 'DELETE':
        //optimistic aptoch
        break;
      
      default: console.log('code is an art and i suck at it')
        break;
    }
  }


  //end of the class 
}



export default Post;
