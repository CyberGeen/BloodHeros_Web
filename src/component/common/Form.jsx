import { Component } from 'react'
import Joi from 'joi-browser'
import FormInput from '../common/FormInput';
import FormRadio from '../common/FormRadio';
import FormDropdown from '../common/FormDropdown'
import FormTextArea from '../common/FormTextArea';

export class Form extends Component {
     //state
     state = {
         data: {} ,
         errors: {}
     }

     //validation
     validator = () => {
        const {error} = Joi.validate( this.state.data , this.schema , {abortEarly:false} )        
        if (!error) return null;
         let errors = {} ;         
         error.details.forEach(err => {
             errors[err.path[0]] = err.message
         });         
         return(errors) 
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.errors) return ;
        //if there is any error we quite and send norhinng to the 
        
        //TODO: add a func to be called by the child later so they call the server (dealing with submiting)
        console.log(this.state.data)
        this.submitForm()
    }

    handleChange = ({currentTarget:input}) => {
        //updating the state than validation for sync error real time showing (some big brain stuff)
        const data = this.state.data
        data[input.name]=input.value
        this.setState({...this.state , data })

        const errors = this.validator();
        this.setState({...this.state , errors:errors || {}  })
    }


    //form button "universal for submiting"
    formButton = (label) => {
        return(<button type="submit" disabled={this.validator()} >{label} </button>)
    }

    //input render for uptimisation and avoiding DRY concept
    renderInput = (name , label , type = 'text' , value= this.state.data[name] , handleChange=this.handleChange) => {
        return(
            <FormInput
                type={type} 
                label={label}
                name={name} 
                value={value || ''} 
                handleChange={handleChange} 
                error={this.state.errors[name] || '' }   />
        )
    }

    //render Radio input type // putted on its own to not make the input func over complicated
    renderRadio = (name , value ) => {
        return (
            <FormRadio
                name={name}  
                value={value} 
                handleChange={this.handleChange}
                error={this.state.errors[name] || '' }
             />
        )
    }

    //render drop down list 
    renderDropdown = (name , value) => {
        return(
        <FormDropdown 
            name={name}
            value={value}
            error={this.state.errors[name] || '' }
            handleChange={this.handleChange}
        />
        )

    }


    //render textAreas
    renderTextArea = (name , label , value= this.state.data[name] , error=this.state.errors[name] || ''  ,handleChange=this.handleChange ) => {
        return(
            <FormTextArea 
                name={name}
                value={value}
                label={label}
                handleChange={handleChange} 
                error={error}
            />
        )
    }
}

export default Form

