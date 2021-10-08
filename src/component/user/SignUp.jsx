import React from 'react'
import Form from './../common/Form';
import Joi from 'joi-browser';
import bloodTypesJson from '../json/bloodType.json'
import citiesJson from '../json/cities.json'
import moment from 'moment';
import {signUp} from '../../services/httpUserService'


export class SignUp extends Form {
    //TODO: add browser Language once language is settled

    currentDate = moment().format('YYYY-MM-DD')

    schema = {
        name: Joi.string().required() ,
        email: Joi.string().required() ,
        password: Joi.string().required() ,
        gender: Joi.string().required() ,
        city: Joi.number().min(1) ,
        blood_type: Joi.string().required() ,
        last_donation: Joi.date().allow("").max(this.currentDate) ,
        emergency_info: Joi.object().keys({
            emergencyCall: Joi.number().optional().allow('') ,
            emergencyInfo: Joi.string().optional().allow('')
        }) 
    }

    
    constructor(props) {
        super(props)
        this.state={
            data :{
                name: "" ,
                email: "" ,
                password: "" ,
                gender: "" ,
                city: 0 ,
                blood_type: "" ,
                last_donation: "" ,
                emergency_info: {
                    emergencyCall: "" , 
                    emergencyInfo: ""
                }
            }
            ,
            errors:{}
        }
    }

    handleEIChange = ({currentTarget:input}) => {
        const data = this.state.data
        data.emergency_info[input.name]=input.value
        this.setState({...this.state , data })
        const errors = this.validator();
        this.setState({...this.state , errors:errors || {}  })
    }

    submitForm = async () => {
        this.setState({...this.state , 
            log: false
        })
        const res =  await signUp(this.state.data)
       
        if(res === null) {return}
        //handle errors 
        console.log(res.response.data)
        this.setState({...this.state , 
            log: true
        })
     }
    
    render() {
        return (
            <div>
                name , email , password , gender , city , blood_type , last_donation , emergency_ingo - emergencyCall , emergencyingo -
                <h1>SignUp</h1>
                <form onSubmit={this.handleSubmit}>
                name label type
                {this.renderInput("name" , "Name" )}
                
                {this.state.log && <div>invalid email.</div>}
                {this.renderInput("email" , "Email" , "email")}
                {this.renderInput("password" , "Password" , "password")}
                    
                {this.renderRadio("gender" , ["male" , "female"])}

                {this.renderDropdown("blood_type" ,bloodTypesJson)}
                {this.renderDropdown("city" , citiesJson)}

                <div>
                {this.renderInput("emergencyCall" ,"unter an emergency number to call" ,"number" , this.state.data.emergency_info.emergencyCall , this.handleEIChange  )}
                {this.renderTextArea("emergencyInfo" , "add your emergency information" , this.state.data.emergency_info.emergencyInfo || '' , null , this.handleEIChange)}
                </div>

                {this.renderInput("last_donation" , "Last Donation Date" , "date")}

                {console.log(this.currentDate)}

                {this.formButton("SignUp")}
                </form>
            </div>
        )
    }
}

export default SignUp
