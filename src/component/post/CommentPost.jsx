import { Form } from '../common/Form';
import  Joi  from 'joi-browser';
import {postComment , deleteComment} from '../../services/httpPostService'
import isOwner from '../common/isOwner';

export class CommentPost extends Form {
    state = {
        data:{
            content:""
        } ,
        errors:{} ,
        comments:[]
    }
    schema = {
        content : Joi.string().required()
    }
    
    //TODO: handle rendering coments **done**
    //TODO: handle submi2ing comments mate *done*
    //TODO: optimistic re render and updata maate *done*
    //TODO: update the main state *done*
    //TODO: add 2 btns for delete and update


    componentDidMount() {
        if(this.state.comments.length === 0 ){
            //quit if the state of comments is already their we dont wanna over right it every time we mount the component
            this.setState({...this.state , comments:this.props.data})
        }
    }

    // rendering a comment logic
    //FIXME: show only by owner
    renderComments = () => {
        const jsxComments = this.state.comments.map( (com) => {
            return (
                <div key={com._id}>
                    <p> {com.content} </p>
                    {isOwner(com.postedBy) &&  <button onClick={(e) => this.handleDelete(e , com._id) } >DELETE</button>}
                </div>
            )
        } )
        return (jsxComments)
    }
    //handle deleting a comment
    handleDelete = async (e , id) => {
        //taking the event and the id of the comment to be able to handle it
        e.preventDefault()
        //optimistic aproach
        const oldData = this.state.comments    
        //update the comp inner state
        let comments = this.state.comments 
        comments = comments.filter((comment)=> {return comment._id!==id})
        this.setState({comments})

        this.props.handleCommentState('DELETE' , id )
        //post id + cmnt id
        const res = await deleteComment(this.props.postId , id) 
        //in case of anny error we reverce changes by returning org values
        if(!res.data){
            this.props.handleCommentState('POST' , oldData)
        }
        console.log(res)

    }

    //submit loggic 

    submitForm = async () => {
        //posting data
        //a way to get the post id
        const res = await postComment(this.state.data , this.props.postId )
        //check res status
        if(!res.data){
            //error here
            //FIXME: handle error with toastify 
            console.log("eroor while submiting a comment , react toastify kicks in")
            //we quit the fun without doing anything
            return ;
        }
        this.setState({...this.state ,  comments:res.data , data : { content : ''} })
        this.props.handleCommentState('POST' , res.data )
    }

    render() {
        return (
            <div>
              <form onSubmit={this.handleSubmit }>
                    {this.renderComments()}
                    {this.renderInput("content" , "Comment" )} 
                    {this.formButton("icon here also func change")} 
              </form>
            </div>
        )
    }
}

export default CommentPost
