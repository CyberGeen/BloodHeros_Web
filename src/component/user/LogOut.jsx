import  { Component } from 'react'

export class LogOut extends Component {
    componentDidMount() {
        localStorage.removeItem('token')
        window.location = '/'
    }
    render() {
        return null
        
    }
}

export default LogOut



