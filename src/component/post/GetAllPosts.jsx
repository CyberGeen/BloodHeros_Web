import { Post } from './../common/Post';


export class GetAllPosts extends Post {
    componentDidMount() {
        //if id ? get a single post : get all posts
        //normal one , there is no id and we requested the main home page
        /* 
          conclusion ; force a re fetch if the first request is a single post 
          if the firt req is the home page we get the data from the array of the state 
          nothing of these causes a re render or a refrech neither any uncessary api call
        */
        if(!this.props.id){
          this.getAllPosts(this.props.id  )
        }
        else {
          this.getAllPosts(this.props.id  )
        }
      }
    render() {
        if (!this.state) {
            return (
              <div>
                loading.. //loading component
              </div>
            )
          }

          if(!this.props.id){
            return (
                <div>
                    {this.renderAllPosts()}
                </div>
            )
          }
          if(this.state.redirect === true) {
            return(
              
              <div>redirect</div>
            )
          }
          return (
            <div> 
                
                {this.renderPost(this.props.id)}
            </div>
        )
        
    }
}

export default GetAllPosts
