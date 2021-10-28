import React, {Component} from "react";
import './header.less' // less style file

import {formateTime} from '../../utils/currentTime' // util to formate and get current time
import storeUser from '../../utils/storeUserName' // use to store information for login and display user name on the main page

export default class Header extends Component {

    // set the state
    state = {
        currentTime: formateTime(Date.now()),
        username: storeUser.loadUser().data.username
    }

    // refash the time, start timer and set interval for 1 second
    refashTime = () => {
        setInterval(() => {
            var currentTime = formateTime(Date.now())
            this.setState({currentTime})
        }, 1000)
    }

    // timer, after first render run this function
    componentDidMount() {
        this.refashTime()
    }

    render() {

        const { currentTime, username } = this.state

        return (
            <div className="header">
                <div className="header-top">
                    <span>Hello, {username}</span>
                    <a href="www">logout</a>
                </div>

                <div className="header-bottom">
                    <div className="header-bottom-title">title</div>
                    <div className="header-bottom-time">{currentTime}</div>
                </div>
            </div>
        )
    }
}