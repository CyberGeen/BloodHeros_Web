import { GetAllPosts } from './../post/GetAllPosts';
import { getReported , declinePostReport , addAdmin , deleteAdmin , addDoc , deleteDoc } from '../../services/httpAdminService';

export class AdminPanel extends GetAllPosts {

  state = {
    ...this.state ,
    val:{}
  }

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

  adminStuff = () => {
    return(
      <>
        <>
          <label>doctor Modification</label>
          <input name='doc' onChange={this.handleAddingChange}  value={this.state.val.doc || '' } />
          <button onClick={this.handleAddDoc} >Add The Doc</button>
          <button onClick={this.handleDeleteDoc} >delete The Doc</button>
        </>
        <>
          <label>Admin Modification</label>
          <input name='admin' onChange={this.handleAddingChange} value={this.state.val.admin  || '' } />
          <button onClick={this.handleAddAdmin} >add the Admin</button>
          <button onClick={this.handleDeleteAdmin} >delete the Admin</button>
        </>
      </>
    )
  }

  handleAddingChange = ({currentTarget:input}) => {
    const val = this.state.val
    val[input.name] = input.value
    this.setState({...this.state , val})
  }

  deleteAdminState = () => {
    this.setState({
      ...this.state ,
      val:{
        ...this.state.val ,
        admin:''
      }
    })
  }

  deleteDocState = () => {
    this.setState({
      ...this.state ,
      val:{
        ...this.state.val ,
        doc:''
      }
    })
  }


  handleAddAdmin = async () => {
    try {
      const res = await addAdmin(this.state.val.admin)
      if(res.data){
        this.deleteAdminState()
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleAddDoc = async () => {
    try {
      const res = await addDoc (this.state.val.doc)
      if(res.data){
        this.deleteDocState()
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteAdmin = async () => {
    try {
      
      const res = await deleteAdmin(this.state.val.admin)
      if(res.data){
        this.deleteAdminState()
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteDoc = async () => {
    try {
      const res = await deleteDoc(this.state.val.doc)
      console.log(res.response)
      if(res.data){
        this.deleteDocState()
      }
    } catch (err) {
      console.log(err)
    }
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
