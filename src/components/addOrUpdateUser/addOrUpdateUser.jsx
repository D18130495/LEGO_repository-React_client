// add or update user component
import React from "react";
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

export default class AddOrUpdateUser extends React.Component {
    static propTypes = {
        user : PropTypes.object // get the selected user row from user list
    }

    state = {
        username: '', // user name
        password: '', // user password
        phone: '', // user phone number
        email: '', // user email address
    }

    constructor (props) {
        super(props)
        this.formRef = React.createRef(); // use to get the form object, to reset the form input
    }

    // use to return user to the user.jsx
    getUser = () => {
        const { username, password, phone, email } = this.state // get all the data from state
        const user = { username, password, phone, email } // set all the data in user
        
        if(this.props.user) {
            user._id = this.props.user._id // if this.props.user is exist, mean update, add _id
        }

        this.resetForm() // after add user, reset the input value

        return user // return user object
    }

    // after finish input data in the input box, reset to the default value null
    resetForm = () => {
        this.formRef.current.setFieldsValue({
            username: null,
            password: null,
            phone: null,
            email: null,
        })
    }

    render() {
        const { username, password, email, phone } = this.state
        
        const formItemLayout = {
            labelCol: { span:6 },
            wrapperCol:  { span:14 },
        };

        return (
            <Form {...formItemLayout} ref={this.formRef} initialValues={{username, phone}}>
                <Form.Item label="User name"
                    name="username"
                    rules={[
                        { required: true, whitespace: true, message: 'Please input user name' }
                    ]}
                >
                    <Input
                    placeholder={this.props.user.username? this.props.user.username : 'Please input user name'}
                    value={username}
                    onChange={event => this.setState({username:event.target.value})}
                    />
                </Form.Item>

                <Form.Item label="password"
                    name="password"
                    rules={[
                        { required: true, whitespace: true, message: 'Please input password' },
                        { min: 5, message: 'Password must be at least 6 character'},
                        { max: 14, message: 'Password can not exceed 14 character'},
                        { pattern: /^[a-zA-Z0-9]+$/, message: 'Password must be character or numbers'}
                    ]}
                >
                    <Input
                    type='password'
                    placeholder={this.props.user.password? this.props.user.password : 'Please input password'}
                    value={password}
                    onChange={event => this.setState({password:event.target.value})}
                    />
                </Form.Item>

                <Form.Item label="phone"
                    name="phone"
                    rules={[
                        { whitespace: true, message: 'Please input valid phone number' },
                        { len: 10, message: 'Please input valid phone number'}
                    ]}
                >
                    <Input
                    placeholder={this.props.user.phone? this.props.user.phone : 'Please input user phone number'}
                    value={phone}
                    onChange={event => this.setState({phone:event.target.value})}
                    />
                </Form.Item>

                <Form.Item label="email"
                    name="email"
                    rules={[
                        { whitespace: true, type:'email', message: 'Please input valid email address' }
                    ]}
                >
                    <Input
                    placeholder={this.props.user.email? this.props.user.email : 'Please input user email address'}
                    value={email}
                    onChange={event => this.setState({email:event.target.value})}
                    />
                </Form.Item>
            </Form>
        )
    }
}