import React, {Component} from "react";
import { withRouter } from 'react-router-dom'
import './header.less' // less style file

import { Modal } from "antd"; // style for logout
import { ExclamationCircleOutlined } from '@ant-design/icons';

import {formateTime} from '../../utils/currentTime' // util to formate and get current time
import storeUser from '../../utils/storeUserName' // use to store information for login and display user name on the main page, and use to delete user information to logout
import memoryUser from "../../utils/memoryUser" // store user

const { confirm } = Modal;

class Header extends Component {

    // set the state
    state = {
        currentTime: formateTime(Date.now()),
        username: storeUser.loadUser().data.username
    }

    // refash the time, start timer and set interval for 1 second
    refashTime = () => {
        this.intervalId = setInterval(() => {
            var currentTime = formateTime(Date.now())
            this.setState({currentTime})
        }, 1000)
    }

    // timer, after first render run this function
    componentDidMount() {
        this.refashTime()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    logout = () => {
        confirm({
            title: 'Do you Want to logout?',
            icon: <ExclamationCircleOutlined />,
            content: 'Click "OK" to logout',
            onOk: () => {
                storeUser.deleteUser()
                memoryUser.user = {}
                this.props.history.replace('/login')
            }
        })
    }

    render() {

        const { currentTime, username } = this.state

        return (
            <div className="header">
                <div className="header-top">
                    <span>Hello, {username}</span>
                    <button onClick={this.logout}>logout</button>
                </div>

                <div className="header-bottom">
                    <div className="header-bottom-title">Explore</div>
                    <div className="header-bottom-time">{currentTime}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)