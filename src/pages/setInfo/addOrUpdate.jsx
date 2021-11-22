// setInfo add or update page
import React from "react";
import { Card, Form, Input, Cascader, Button, message } from 'antd'; // antd compoment
import { LeftOutlined } from '@ant-design/icons'; // antd icon

import { getCategoryList } from '../../api' // to get category and year list, for the input of release year
import { addSetInfo } from '../../api' // add set information
import { updateSetInfo } from '../../api' // update set information

import Wysiwyg from "../../components/wysiwyg/wysiwyg"; // set details text additer
import UploadImage from "../../components/uploadImage/uploadImage"; // use to upload image

export default class AddOrUpdate extends React.Component {
    state = {
        name: '', // set name from input
        desc: '', // set desc from input
        price: '', // set price from input
        setYears: [], // set year from input
        options: [], // release year list
        childrenOptions: [], // release year children list
    }
    
    // get the picture from child component
    constructor(props) {
        super(props)
        this.picture = React.createRef()
        this.setDetailText = React.createRef()
    }
    setPrice
    // get release year list, and call the setOption to set the options date from api(getCategoryList)
    getCategory = async (parentId) => {
        const result = await getCategoryList(parentId)
        if(result.data.status === 0) {
            const category = result.data.data 
            if(parentId === '0') { // if parentId === 0, get the first list
                this.setOption(category)
            }else { // if parentId is one of the Id from ParentId, get children list
                this.setChildren(category)
            }   
        }
    }

    // set options list, use map to traverse the result from api(getCategoryList) and put the data in the display format
    setOption = (category) => {
        const option = category.map(option => ({
            value: option._id,
            label: option.name,
            isLeaf: false,
        }))
        this.setState({
            options: option
        })
    }

    setChildren = (category) => {
        const childrenOption = category.map(childrenOption => ({
            value: childrenOption._id,
            label: childrenOption.name,
            isLeaf: true, // it is not the leaf, so no more leaf appear
        }))
        this.setState({
            childrenOptions: childrenOption // set the second(children) list to the childrenOptions
        })
    }

    // price input validator
    validatePrice = (rule, value, callback) => {
        if(value * 1 > 0) {
            callback()
        }else {
            callback('price must greater then 0')
        }
    }

    // relase year list
    loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        this.getCategory(targetOption.value) // when get the first list, use the parenId to send request and get the second list 
        
        // load options lazily
        setTimeout(() => {
          targetOption.loading = false;
          targetOption.children = this.state.childrenOptions; // set the children list
          this.setState({
            options: this.state.options,
          });
        }, 500); // slow 500ms to get the request back and set it on the second list
    };

    onFinish = async () => {
        const {name, desc, price, setYears} = this.state
        const imgs = this.picture.current.getImgs()
        const detail = this.setDetailText.current.getSetDetail()
        var pCategoryId, categoryId
        if(setYears.length === 1) {
            categoryId = '0'
            pCategoryId = setYears[0]
        }else {
            categoryId = setYears[0]
            pCategoryId = setYears[1]
        }

        const set = {name, desc, price, imgs, detail, categoryId, pCategoryId}
        console.log(set)
        const result = await addSetInfo(set)
        console.log(result)
        if(result.data.status === 0) {
            message.success("ok")
        }else {
            message.error("no")
        }  
    }

    addSetInfo = async() => {
        // console.log(this.state)
        this.props.history.goBack()
    }

    // get the release year before load the page
    componentDidMount() {
        this.getCategory('0')
        console.log( this.props.location.state)
    }
    
    render() {
        const { name, desc, price, setYears } = this.state // get each element from state

        // layout of the input item
        const formItemLayout = {
            labelCol: { span:3 },
            wrapperCol:  { span:6 },
        };

        // title left part
        const title = (
            <span>
                <LeftOutlined style={{ color: "#d0021b"}} onClick={() => this.props.history.goBack()}/> {/* back to the setInfoHome */}
                <span style={{ marginLeft: '10px'}}>Add or update set information</span>
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
                        <Input placeholder='Please input set name'
                        defaultValue={this.props.location.state? this.props.location.state.name : null}
                        value={name} onChange={event => this.setState({name:event.target.value})}/>
                    </Form.Item>

                    <Form.Item label="Set description"
                        name="setdesc"
                        rules={[
                            { required: true, whitespace: true, message: 'Please input set description' }
                        ]}
                    >
                        <Input placeholder='Please input set description'
                        defaultValue={this.props.location.state? this.props.location.state.desc : null}
                        value={desc} onChange={event => this.setState({desc:event.target.value})}/>
                    </Form.Item>

                    <Form.Item label="Set price"
                        name="setprice"
                        rules={[
                            { required: true, whitespace: true, message: 'Please input set price' },
                            { validator: this.validatePrice }
                        ]}
                    >
                        <Input type='number' placeholder='Please input set price' addonAfter='€'
                        defaultValue={this.props.location.state? this.props.location.state.price : null}
                        value={price} onChange={event => this.setState({price:event.target.value})}/>
                    </Form.Item>

                    <Form.Item label="Set release year"
                        name="setYears"
                        rules={[
                            { required: true, message: 'Please select set year' }
                        ]}
                    >
                        <Cascader options={this.state.options} loadData={this.loadData}
                        value={setYears} onChange={(value) => this.setState({setYears:value})}/>
                    </Form.Item>

                    <Form.Item label="Set pictures" labelCol={{span:2}} wrapperCol={{span:8}}>
                        <UploadImage ref={this.picture} defaultValue={this.props.location.state? this.props.location.state.imgs : null}/>
                    </Form.Item>

                    <Form.Item label="Set detail" labelCol={{span:2}} wrapperCol={{span:20}}>
                        <Wysiwyg ref={this.setDetailText} defaultValue={this.props.location.state? this.props.location.state.detail : null}/>
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