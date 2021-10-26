import { getApi , putApi } from "./httpService"

const url = 'reports/'

//get all reported posts
const getReported = async (id = '' ) => {
    return await getApi(url + id) 
}

//decline a false report 
const declinePostReport = async (id) => {
    return await putApi(url + id)
}

export {
    getReported ,
    declinePostReport
}