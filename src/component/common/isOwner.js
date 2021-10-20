import { getUser } from "../../services/httpService";

//detect ownership

const isOwner = (id) => {
    const {_id} = getUser()
    if(id !== _id) {
      return false
    }
    return true
  }
  export default isOwner