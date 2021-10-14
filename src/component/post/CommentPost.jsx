import { Form } from '../common/Form';
import  Joi  from 'joi-browser';

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
    
    //TODO: handle rendering coments
    //TODO: handle submi2ing comments mate
    //TODO: optimistic re render and updata maate
    //TODO: update the main state

    renderComments = () => {
        const jsxComments = this.props.data.map( (com) => {
            return (
                <div key={com._id}>
                    <p> {com.content} </p>
                </div>
            )
        } )
        return (jsxComments)
    }

    //submit loggic 

    submitForm = () => {
    }

    render() {
        return (
            <div>
              <form onSubmit={this.handleSubmit }>
                    {console.log(this.props.handleCommentState())}
                    {this.renderComments()}
                    {this.renderInput("content" , "Comment" )} 
                    {this.formButton("icon here also func change")} 
              </form>
            </div>
        )
    }
}

export default CommentPost
