import { CreatePost } from './CreatePost';
import { editPost } from '../../services/httpPostService';

export class EditPost extends CreatePost {
    
    componentDidMount(){
        const {title , description , blood_type , until_donation , tags , image , city} = this.props.data
        this.setState({
            ...this.state.data ,
            data:{
                title ,
            description ,
            blood_type ,
            until_donation ,
            tags ,
            image ,
            city
            }
        })
        console.log(this.props.data._id)
    }
    
    submitForm = async () => {
        //handle edit
        try {
            const res = await editPost(this.state.data , this.props.data._id)
            if(res.data){
                //refreshing the data to make sure the data isnt correpted
                //its better to refresh a post after edit than push edits
                window.location = `/${this.props.data._id}`
            }
        } catch (err) {
            console.log(err)
        }
        console.log('test')
    }
    
}

export default EditPost
