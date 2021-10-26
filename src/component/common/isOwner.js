import { getUser } from "../../services/httpService";
import {isAdmin} from "./isAdmin";
//detect ownership

const isOwner = (id) => {
    const admin = isAdmin() 
    if(admin) return true
    const {_id} = getUser()
    return id === _id
  }
  export default isOwner