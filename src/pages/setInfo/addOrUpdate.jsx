// setInfo add or update page
import React from "react";
import { Card, Form, Input, Cascader, Upload, Button } from 'antd'; // antd compoment
import { LeftOutlined } from '@ant-design/icons'; // antd icon

export default class AddOrUpdate extends React.Component {
    state = {
        setName: '', // set name from input
        setDesc: '', // set desc from input
    }

    onFinish = () => {
        console.log('ok')
    }

    addSetInfo = async() => {
        // console.log(this.state)
    }
    
    render() {
        const { setName, setDesc } = this.state // get each element from state

        // layout of the input item
        const formItemLayout = {
            labelCol: { span:2 },
            wrapperCol:  { span:6 },
        };

        // title left part
        const title = (
            <span>
                <LeftOutlined style={{ color: "#d0021b"}} onClick={() => this.props.history.goBack()}/> {/* back to the setInfoHome */}
                <span style={{ marginLeft: '10px'}}>Add set information</span>
            </span>
        )

        return (
            <Card title={title}>
                <Form {...formItemLayout} onFinish={this.onFinish}>
                    <Form.Item label="Set name"
                        name="setname"
                        rules={[
                            { required: true, whitespace: true, message: 'Please input set name' }
                        ]}
                    >
                        <Input placeholder='Please input set name' value={setName} onChange={event => this.setState({setName:event.target.value})}/>
                    </Form.Item>

                    <Form.Item label="Set description"
                        name="setdesc"
                        rules={[
                            { required: true, whitespace: true, message: 'Please input set description' }
                        ]}
                    >
                        <Input placeholder='Please input set description' value={setDesc} onChange={event => this.setState({setDesc:event.target.value})}/>
                    </Form.Item>

                    <Form.Item label="Set price">
                        <Input type='number' placeholder='Please input set price' addonAfter='€'/>
                    </Form.Item>

                    <Form.Item label="Set release year">
                        <Input type='number' placeholder='Please input set price'/>
                    </Form.Item>

                    <Form.Item label="Set pictures">
                        <Input type='number' placeholder='Please input set price'/>
                    </Form.Item>

                    <Form.Item label="Set detail">
                        <Input type='number' placeholder='Please input set price'/>
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType="submit" style={{marginTop:'15px'}} onClick={() => this.addSetInfo()}>
                            submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}