import { Form } from '../common/Form';
import  Joi  from 'joi-browser';

export class CommentPost extends Form {
    state = {
        data:{
            content:""
        } ,
        errors:{}
    }
    schema = {
        content : Joi.string().required()
    }
    render() {
        return (
            <div>
              <h1>Comment field</h1>

              <form onSubmit={this.handleSubmit }>
                    {this.renderInput("content" , "Comment" )} 

                    {this.formButton("icon here also func change")} 
              </form>
            </div>
        )
    }
}

export default CommentPost
