// login page
import React, {Component} from "react";
import { Redirect } from "react-router-dom"; // redirect the page
import { Form, Input, Button, message, Result} from 'antd'; // antd form 
import { UserOutlined, LockOutlined } from '@ant-design/icons'; // antd form

import './login.less' // less style
import lego from '../../assets/images/LEGO.png' // lego logo

import {userLogin} from '../../api' // userLogin api
import storeUser from '../../utils/storeUserName' // use to store information for login and display user name on the main page
import memoryUser from '../../utils/memoryUser' // store user

export default class Login extends Component {
    // after form submit, handle the data pass to the back-end
    onFinish = (valuse) => {
        const {username, password} = valuse
        userLogin(username, password).then(Response => {
            // console.log(Response.data)
            // 0 success, 1 unsuccess
            if(Response.data.status === 0) {
                message.success('Login successful')
                // store the user to memory
                memoryUser.user = Response.data
                // store user info
                storeUser.saveUser(Response.data)
                // router to main page
                console.log(this)
                this.props.history.replace('/main')
            }else {
                message.error('Login failed')
            }
        })
    };

    render() {
        // auto login, if localStorage has user value
        const user = memoryUser.user.data
        console.log(user)
        if(user && user._id) {
            return <Redirect to='/main'/>
        }

        return (
            <div className="login">
                <header className="login-header">
                    <img src={lego} alt="lego-logo"/>
                    <h1>LEGO Repositories, help you find all Lego sets.</h1>
                </header>

                <section className="login-content">
                    <h2>User login</h2>
                    <Form name="normal_login" className="login-form" onFinish={this.onFinish}>
                        <Form.Item name="username" 
                            rules={[
                                { required: true, whitespace: true, message: 'Please input your Username!' },
                                { min: 3, message: 'Username must be at least 3 character'},
                                { max: 10, message: 'Username can not exceed 10 character'},
                                { pattern: /^[a-zA-Z0-9]+$/, message: 'Username must be character or numbers'}
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>

                        <Form.Item name="password" 
                            rules={[
                                { required: true, whitespace: true, message: 'Please input your Password!' },
                                { min: 5, message: 'Password must be at least 5 character'},
                                { max: 14, message: 'Password can not exceed 14 character'},
                                { pattern: /^[a-zA-Z0-9]+$/, message: 'Password must be character or numbers'}
                            ]}
                        >
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>

                <footer className="login-footer">
                    <p>Created by Yushun Zeng 2021</p>
                </footer>
            </div>
        )
    }
}