import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getPosts , deletePost } from "../../services/httpPostService";
import { CommentPost } from './../post/CommentPost';
import isOwner from "./isOwner";
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
        {isOwner(post.posted_by) &&  <button onClick={(e) => {this.handleDeletePost(e , post._id)} } >DELETE</button>}
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

  //handle deleting a post
  handleDeletePost = async (e , id) => {
    e.preventDefault()
    const prevState = this.state
    //if a single post we dont need to optimise the state
    if(this.state.singlePostStatus !== ''){
      await deletePost(id)
      this.props.history.push('/')
      return
    }
    //optimistic aproach
    //filtering the data and deleting the post from the main state
    let data = prevState.data.filter( post =>  post._id!==id  )
    this.props.history.push('/')
    this.setState({data})
    const res = await deletePost(id)
    //if anything wrong we return the main state
    if(!res.data) {
      data = prevState
      this.setState({data})
      //FIXME: toastify + error : server is down or you have no authority to delete this
    }
  }


  //handle getting a single post
  renderPost = () => {
    if(this.state.singlePostStatus !== "" ) {
      return this.convertPost(this.state.data , this.renderComment(this.state.data.comments , this.state.data._id )  , true )
    }
    else{
      let tempPostHolder = this.state.data.filter( (post) => {
        // supreme ternary return :)
        return ((post._id === this.props.id) ? post : '' )
        // if(post._id === this.props.id){
        //   return post
        // }
      } )
      return this.convertPost(tempPostHolder[0] , this.renderComment(tempPostHolder[0].comments , tempPostHolder[0]._id )  , true )
    }
  }

  //----------------comment section----------------
  renderComment = (data , postId) => {
      //avoid rep and over complicated children by simplifying params
      //TODO: throw this func , became useless
    const handleCommentStateRef = (action='GET' , target=null ) => {
      return this.handleCommentState(action , data , target , postId)
    }
    return (
      <CommentPost data={data} handleCommentState={handleCommentStateRef} postId={postId} />
    )
  }

  
  //FIXME: throw this code away 
  handleCommentState = (action = 'GET' , org , target=null , postId ) => {
    // comment state role : keep the state tact , handle jsx changes inside comment component
    //redux style
    switch (action) {
      case 'GET':
        //TODO:  before that sort by time
        return this.handleGettingComment(postId)
      case 'POST':
        //no optimistic needs a comment id
        return this.handlePostingComment(target , postId)
      case 'PUT':
        //opttimistic aproch
        return this.handleUpdatingComment()
      case 'DELETE':
        //optimistic aptoch
        return this.handleDeletingComment(postId , target)
      
      default: console.log('code is an art and i suck at it')
        break;
    }
  }

  //miner func insode the switch
  handleGettingComment = (postID) => {
    //sort before sending // nvm its sorted
    if(this.state.singlePostStatus !== "" ) {
      console.log("2")
      return this.state.comments
    }
    else {
      return this.state
    }
  }

  handlePostingComment = (cmnts , postId) => {
    //apply a getting a post
    if (!cmnts) {
      //error accured   
      //TODO: handle data being null meaning an error (toastify)
      return ;
    }
    else if(this.state.singlePostStatus !== "" ) {
     //return no need for extra the data will be updated by itself once tabs are switched
     return;
    }
    else {
      //single sorce of truth     
      let data = this.state.data
      console.log(data)
      data =  data.map(( post ) => {
        if(post._id === postId) {
        post.comments = cmnts
        }
        return post
      })
      console.log(data)
      this.setState({   data   })

      console.log(this.state)
    }
  }

  handleUpdatingComment = () => {

  }

  handleDeletingComment = (postId , id) => {
    console.log('comment should be deleted')
    if(this.state.singlePostStatus !== "" ) {
     //return no need for extra the data will be updated by itself once tabs are switched
     return;
    }
    let data = this.state.data 
    data =  data.map(( post ) => {
      //get the post that we want
      if(post._id === postId) {
        //filter the comments
      post.comments = post.comments.filter( (comment) => {
        return comment._id!==id
      } )
      }
      return post
    })
    console.log(data)
    this.setState({   data   })

      console.log(this.state)

  }

 

  //end of the class 
}



export default Post;
