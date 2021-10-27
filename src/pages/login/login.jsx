// login page
import React, {Component} from "react";
// antd form
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less'
import lego from './images/LEGO.png'
import {userLogin} from '../../api'

export default class Login extends Component {

    onFinish = (valuse) => {
        userLogin(valuse).then(Response => {
                console.log(Response.data)
            })
    };

    render() {
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
                                { min: 6, message: 'Password must be at least 6 character'},
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
            </div>
        )
    }
}