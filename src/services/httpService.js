import axios from 'axios'
import config from '../component/json/config.json'
import jwtDecode from 'jwt-decode'

//api url
const apiUrl = config.apiUrl

//get token 
const getJWT = () => {
    return  localStorage.getItem('token')
}

//sending token everytime we need to as a default header in every CRUD operation

axios.defaults.headers.common['x-auth-token'] = getJWT() 

//universall post function
const callApi = async (data , url) => {
    try {
        const res = await axios.post( apiUrl + url , data)
        return(res)
    } catch (error) {
        return (error)
    }
}

const getApi = async (url) => {
    try {
        const res = await axios.get( apiUrl + url)
        return(res)
    }
    catch (error) {
        return (error)
    }
}

const deleteApi = async (url) => {
    try {
        const res = await axios.delete( apiUrl + url)
        return(res)
    }
    catch (error) {
        return (error)
    }
}

//put api
const putApi = async (url , data = null) => {
    try {
        const res = await axios.put( apiUrl + url , data)
        return(res)
    } catch (error) {
        return (error)
    }
}

//get user attribut
const getUser = () => {
    const token = localStorage.getItem('token')
    if( token !== null ) {
        return jwtDecode(token)
    }
    return null
}


//exports 
export {
    callApi ,
    getUser ,
    getApi , 
    deleteApi ,
    putApi
}

