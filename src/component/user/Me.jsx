import React, { Component } from 'react'
import {getUserPage} from '../../services/httpUserService'
import moment from 'moment'

export class Me extends Component {
    currentDate = moment().format('YYYY-MM-DD')
    componentDidMount() {
        this.handleGetUser()
    }

    handleGetUser = async () => {
        const res = await getUserPage()
        let idk = res.data.last_donation
        let result = this.calculateDateDiff(idk)
        //TODO: u got the max val and this is what left for the dono 
        // if true he is set 
        //look for a way to show days once the desing is set
        console.log(result)
    }

    calculateDateDiff = (date) => {
        if(date === null){
            return true
        }
        date = date.split('T')
        date = date[0].split('-')
        
        //current date 
        
        let oldHours = new Date(date[0] , date[1] , date[2] )
        let currentHours = new Date()
        let fourMonths = 10519200000
        let timeLeft = currentHours.getTime() - oldHours.getTime() - fourMonths
        if(timeLeft<0){
            return -timeLeft
        }
        else{
            return true
        }
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Me
