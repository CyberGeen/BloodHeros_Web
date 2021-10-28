import  Form  from './../common/Form';
//json import 
import tagsJson from '../json/tags.json'
import bloodTypesJson from '../json/bloodType.json'
import citiesJson from '../json/cities.json'

export class SearchSortPost extends Form {
    state = {
        ...this.state ,
        search:{
            index:'' ,
            sort:'' ,
            filter:{
                city:'' ,
                blood_type:'',
                tags:''
            }
        }
    }
    

    handleChange = async ({currentTarget:input}) => {
        //rewriting the logic of handleChange so it works with this comp logic
        const filter = this.state.search.filter
        filter[input.name]=input.value
        await this.setState({...this.state.search , filter })
        this.sendState()
    }


    //sending the state to the home page
    sendState = () => {
        let search = {...this.state.search } 
        this.props.getSearch(search)
    }

    handleSortVal =async (val) => {
        await this.setState({...this.state , search:{...this.state.search , sort:val } })
        this.sendState()
    }
    handleSearchChange = async (e) => {
        await this.setState({...this.state , search:{...this.state.search , index:e.currentTarget.value } })
        this.sendState()
    }
    render() {
        if(this.state){
            return (
                <div>
                    <input onChange={(e)=>{this.handleSearchChange(e)}} value={this.state.search.index || ''}  />
                    <button onClick={()=>{this.handleSortVal('NEW')}} >Sort by New</button>
                    <button onClick={()=>{this.handleSortVal('UD')}} >Sort by Up Votes</button>

                    {this.renderDropdown("tags" , tagsJson )}
                    {this.renderDropdown("blood_type" ,bloodTypesJson)}
                    {this.renderDropdown("city" , citiesJson)}
                </div>
            )
        }
        return(
            <div>
                loading ...
            </div>
        )
    }
}

export default SearchSortPost
