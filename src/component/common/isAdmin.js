import { getUser } from "../../services/httpService";

const isAdmin = () => {
    const user = getUser();
    if(user){
        let role = user.role
        if(role &&  role === 'admin') {
            return true
        }
    }
    return false
}

export {
    isAdmin
}