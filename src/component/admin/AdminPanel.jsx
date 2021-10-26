import { GetAllPosts } from './../post/GetAllPosts';
import { getReported , declinePostReport } from '../../services/httpAdminService';

export class AdminPanel extends GetAllPosts {
    getAllPosts = async (id = '') => {
        getReported(id).then(({ data }) => {
            if(!data){
              this.setState({redirect:true})
            }
            else {
              this.setState({ ...this.state, data , singlePostStatus:id});
            }
          })
    
  }

  declineReport = (id) => {
    return (<button onClick={ () => this.decline(id) }>Decline Report</button>)
  }

    decline =async (id) => {
      const oldState = {...this.state.data}
      let data = this.state.data.filter( (post)=>{
        return post._id !== id
      } )
      this.setState({...this.state.data , data})
      try {
        const res = await declinePostReport(id)
        if(res.response){
          this.setState({...this.state.data , data:oldState})
        }
      } catch (err) {
        console.log(err)
      }
    }
}

export default AdminPanel
