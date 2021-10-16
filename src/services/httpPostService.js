import { getApi , callApi , deleteApi } from "./httpService";

const url = 'post/'

//handle getting posts
const getPosts = async(id='') => {
    return await getApi(url + id) 
}

//handle posting a comment
const postComment = async (data , id) => {
    return await callApi(data , url + id + '/comment')
}

//handle deleting a comment
const deleteComment = async (postID , commentId) => {
    return await deleteApi(url + postID + '/comment/' + commentId )
}

getPosts()
export {
    getPosts ,
    postComment ,
    deleteComment
}
 