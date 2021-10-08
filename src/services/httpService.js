import axios from 'axios'
import config from '../component/json/config.json'
import jwtDecode from 'jwt-decode'

//api url
const apiUrl = config.apiUrl

//sending token everytime we need to as a default header in every CRUD operation

//universall post function
const callApi = async (data , url) => {
    try {
        const res = await axios.post( apiUrl + url , data)
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
    getUser
}
