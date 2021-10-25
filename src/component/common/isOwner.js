import { getUser } from "../../services/httpService";

//detect ownership

const isOwner = (id) => {
    const {_id} = getUser()
    return id === _id
  }
  export default isOwner