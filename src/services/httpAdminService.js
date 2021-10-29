import { getApi , putApi , deleteApi , callApi } from "./httpService"

const url = 'reports/'
const createUrl = 'create/'

//get all reported posts
const getReported = async (id = '' ) => {
    return await getApi(url + id) 
}

//decline a false report 
const declinePostReport = async (id) => {
    return await putApi(url + id)
}

//add admin

const addAdmin = async (data) => {
    return await callApi( data , createUrl + 'admin/' )
}

//delete admin

const deleteAdmin = async (id) => {
    return await deleteApi(createUrl + 'admin/' + id)
}

//add doc

const addDoc = async (data) => {
    return await callApi(   data , createUrl + 'doc/')
}

//delete doc

const deleteDoc = async (id) => {
    return await deleteApi(createUrl + 'doc/' + id)
}

export {
    getReported ,
    declinePostReport ,
    addAdmin , 
    deleteAdmin ,
    addDoc ,
    deleteDoc
}