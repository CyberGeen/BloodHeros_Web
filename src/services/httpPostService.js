import { getApi , callApi , deleteApi, putApi  } from "./httpService";

const url = 'post/'

//handle getting posts
const getPosts = async(id='') => {
    return await getApi(url + id) 
}

//handle deleting a post
const deletePost = async(id) => {
    return await deleteApi(url + id)
}

//handle posting a post
const postPost = async(data) => {
    return await callApi(data , url + 'create')
}

//handle editing a post
const editPost = async(data , id) => {
    return await putApi(url + id , data)
}

//handle posting a comment
const postComment = async (data , id) => {
    return await callApi(data , url + id + '/comment')
}

//handle deleting a comment
const deleteComment = async (postID , commentId) => {
    return await deleteApi(url + postID + '/comment/' + commentId )
}

//handle UpDown votes
const vote = async (postId , key ) => {
    switch (key) {
        case 'U':
            return await getApi(url + postId + '?vote=1')
        case 'D':
            return await getApi(url + postId + '?vote=-1')                
        default:
            break;
    }
}

//handle report
const reportPost = async(postId) => {
    return await getApi(url + postId + '?report=1')
}

getPosts()
export {
    getPosts ,
    deletePost ,
    postPost ,
    editPost ,
    postComment ,
    deleteComment ,
    vote ,
    reportPost
}
 