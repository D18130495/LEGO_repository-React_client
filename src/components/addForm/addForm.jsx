// add form component
import React from "react";
import { Form, Select, Input } from 'antd'

export default class AddForm extends React.Component {
    render() {
        return (
            <Form>
                <Form.Item>
                    <Select defaultValue='theme'>
                        <Select.Option value='0'>Theme</Select.Option>
                        <Select.Option value='1'>Theme2</Select.Option>
                    </Select>
                </Form.Item>
                
                <Form.Item>
                    <Input placeholder='Please input theme name'/>
                </Form.Item>
            </Form>
        )
    }
}