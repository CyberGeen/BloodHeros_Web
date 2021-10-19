import  Form  from '../common/Form';
import  Joi  from 'joi-browser';

import {login} from '../../services/httpUserService'

export class Login extends Form {
    schema = {
        email: Joi.string().required().label('Email') ,
        password: Joi.string().required().min(5).label('Password')
    }

    submitForm = async () => {
        this.setState({...this.state , errors:{
            log:''
        }})
       const res =  await login(this.state.data)
        
       // if promise is resolved we quite the app 
        if(res === null) return

        //handle errors 
        this.setState({...this.state , errors:{
            log:res.response.data
        }})
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div>{this.state.errors.log}</div>
                <form onSubmit={this.handleSubmit}>
                    {this.state.errors.gen && <div>wrong email or password</div> }
                    {this.renderInput("email" , "Email" , "email")}
                    {this.renderInput("password" , "Password" , "password")}
                    {this.formButton("Login")}
                </form> 
            </div>
        )
    }
}

export default Login
