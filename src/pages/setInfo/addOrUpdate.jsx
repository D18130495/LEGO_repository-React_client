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
    
    constructor(props) {
        super(props)
        this.picture = React.createRef() // get the picture from child component
        this.setDetailText = React.createRef() // get the detail from child component
    }
    
    // get release year list, and call the setOption to set the options date from api(getCategoryList)
    getCategory = async (parentId) => {
        const result = await getCategoryList(parentId) // send request to get category list, it can be them or year

        if(result.data.status === 0) {
            const category = result.data.data 
            if(parentId === '0') { // if parentId === 0, get the theme list
                this.setOption(category)
            }else { // if parentId is one of the Id from ParentId, get year list
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
            options: option // set the first(parent) list to the theme option
        })
    }

    // set options list, year list
    setChildren = (category) => {
        const childrenOption = category.map(childrenOption => ({
            value: childrenOption._id,
            label: childrenOption.name,
            isLeaf: true, // it is not the leaf, so no more leaf appear
        }))
        this.setState({
            childrenOptions: childrenOption // set the second(children) list to the year option
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
        const {name, desc, price, setYears} = this.state // get value from state
        const imgs = this.picture.current.getImgs() // get the image array
        const detail = this.setDetailText.current.getSetDetail() // get the detail
        var pCategoryId, categoryId
        if(setYears.length === 1) { // if length === 1, mean only have theme
            pCategoryId = '0'
            categoryId = setYears[0]
        }else { // if length !== 1, mean two value in the array, one is theme, one is year
            pCategoryId = setYears[0]
            categoryId = setYears[1]
        }

        const set = {name, desc, price, imgs, detail, categoryId, pCategoryId} // store all data in set
        var result = ''

        if(this.props.location.state) { // if do have have value, mean add set info
            set._id = this.props.location.state._id // add the update setId
            result = await updateSetInfo(set) // send request to update set info
        }else {
            result = await addSetInfo(set) // send request to add set info
        }
        
        // display the result message if add or update and success or not
        if(result.data.status === 0 && !this.props.location.state) {
            message.success("Successfully add the set")
            this.props.history.goBack()
        }else if(result.data.status === 0 && this.props.location.state) {
            message.success("Successfully update the set")
            this.props.history.goBack()
        }else if(!(result.data.status === 0) && !this.props.location.state) {
            message.error("Add the set failed")
        }else {
            message.error("Update the set failed")
        }
    }

    // get the release year before load the page
    componentDidMount() {
        this.getCategory('0')
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
                        <Input
                        placeholder={this.props.location.state? this.props.location.state.name : 'Please input set name'}
                        value={name} onChange={event => this.setState({name:event.target.value})}/>
                    </Form.Item>

                    <Form.Item label="Set description"
                        name="setdesc"
                        rules={[
                            { required: true, whitespace: true, message: 'Please input set description' }
                        ]}
                    >
                        <Input
                        placeholder={this.props.location.state? this.props.location.state.desc : 'Please input set description'}
                        value={desc} onChange={event => this.setState({desc:event.target.value})}/>
                    </Form.Item>

                    <Form.Item label="Set price"
                        name="setprice"
                        rules={[
                            { required: true, whitespace: true, message: 'Please input set price' },
                            { validator: this.validatePrice }
                        ]}
                    >
                        <Input type='number' addonAfter='€'
                        placeholder={this.props.location.state? this.props.location.state.price : 'Please input set price'}
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
                        <Button type='primary' htmlType="submit" style={{marginTop:'15px'}}>
                            submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}