import { getApi } from "./httpService";

const url = 'post/'

//handle getting posts
const getPosts = async(id='') => {
    return await getApi(url + id) 
}

//handle getting a single post
const getPost = async(id) => {
    return await getApi(url + id )
}

getPosts()
export {
    getPosts ,
    getPost
}
 