import {callApi} from './httpService'

const login = async (data) => {
    return setToken(await callApi(data , 'user/login' )) 
}

const signUp = async (data) => {
    return setToken(await callApi(data , 'user/signup' ))
}

const setToken = async (res) => {
    //if the status is okey we should save the token
    if (res.status === 202 || res.status === 201 ){
         await localStorage.setItem("token" , res.headers['x-auth-token'])
         //reload the page to reload the state and navbar (react being react)
         window.location = '/'
         //returning null because the promise is resolved 
         return null
    }
    //else we return the error obj to be handled as an error msg/popUp 
    else {
        return res
    }
 
    //this.props.history.push('/')
}

export {
    login ,
    signUp
}

