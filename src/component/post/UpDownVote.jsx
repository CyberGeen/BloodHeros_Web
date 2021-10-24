import { debounce } from 'lodash';
import { Form } from './../common/Form';
import { getUser } from '../../services/httpService';


export class UpDownVote extends Form {

    componentDidMount() {
        //TODO: check if he is on any of the two arrays and update the display
        //set init state
        const {_id} = getUser()
        const data  = {
             _id ,
            up:this.props.state.up_votes ,
            down:this.props.state.down_votes 
        }
        this.setState({   data   })
        
    }

    
    updateState = async (vote) => {
        await this.props.vote(vote)
        .then( () => {
            const data  = {
                ...this.state.data ,
               up:this.props.state.up_votes ,
               down:this.props.state.down_votes ,
           }
           this.setState({   data   })
        } )
        
    }

    renderVote = () => {
        if(!this.state.data.up){
            return(
                <div>
                    loading..
                </div>
            )
        }
        return(
            <div>
                up : {this.state.data.up.length}
                <button onClick= {debounce((e) => this.updateState('U') , 300) }>UP</button> 
                down : {this.state.data.down.length}
                <button onClick= {debounce((e) => this.updateState('D') , 300) }>DOWN</button>
                
            </div>
        )
    }

    render() {
        if(!this.state.data){
            return(
                <div>
                    loading
                </div>
            )
        }
        return (
            <div>
                {this.renderVote()}
            </div>
        )
    }
}

export default UpDownVote
//coding is kinda exciting ngl 