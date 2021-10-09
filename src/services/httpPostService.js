import { getApi } from "./httpService";

const url = 'post/'

const getPosts = async() => {
    const res = await getApi(url) 
    console.log(res)
}

getPosts()
export {
    getPosts
}
 