import { Form } from './../common/Form';
import  Joi  from 'joi-browser';
import bloodTypesJson from '../json/bloodType.json'
import citiesJson from '../json/cities.json'
import tagsJson from '../json/tags.json'
import { postPost } from '../../services/httpPostService';
import moment from 'moment';


export class CreatePost extends Form {
    currentDate = moment().format('YYYY-MM-DD')
    //TODO: make the tag=urgent and date=currentDate
    state = {
        data:{
            title:"" ,
            description:"" , 
            blood_type:"" ,
            until_donation:"",
            tags:"" ,
            image:"" ,
            city:0
        }
        ,
        errors:{}
    }
    schema = {
        title: Joi.string().required() ,
        description: Joi.string().required() ,
        blood_type: Joi.string().required() ,
        until_donation: Joi.date().allow("").min(this.currentDate) ,
        tags: Joi.optional().allow('') ,
        city: Joi.number().min(1).error( (errors) => {
            return errors.map(error => {
                if(error.type === "number.min"){
                    return {message:"add your adress"}
                }
                return null
            })
        } ) ,
        image: Joi.optional().allow('')
    }

    submitForm = async() => {
        const res = await postPost(this.state.data)
        if(res.data){
            this.props.history.push('/')
        }
        else{
            //FIXME: toastify the error.response
        }
    }

    render() {
        return (
            <div>
                title , description , blood_type , tags(drop down) , city 
                <h1>Create a request for blood donation</h1> 
                <form onSubmit={this.handleSubmit}>
                {this.renderInput("title" , "Title" )}

                {this.renderTextArea("description" , "add your emergency information" )}

                {this.renderDropdown("tags" , tagsJson )}
                {this.renderDropdown("blood_type" ,bloodTypesJson)}
                {this.renderDropdown("city" , citiesJson)}

                {this.renderInput("until_donation" , "When Blood Needed" , "date")}

                {this.formButton("Create")}

                </form>
            </div>
        )
    }
}

export default CreatePost
