// page for main => category
// page for main => home
import React from "react";

import { Card, Table, Button, message, Modal } from 'antd' // antd card, table and button component
import { PlusSquareOutlined, RightSquareOutlined } from '@ant-design/icons'; // antd icon

import {getCategoryList, updateCategory, addCategory} from '../../api' // api to get category list
import AddForm from "../../components/addForm/addForm"; // add form component
import UpdateForm from '../../components/updateForm/updateForm' // update form component

export default class Category extends React.Component {
    // create cname use get input from update form component
    constructor(props) {
        super(props)
        this.cname = React.createRef()
        this.addcate = React.createRef()
    }

    state = {
        categoryList: [], // theme list
        yearList: [], // year list
        parentId: '0', // parentId use to display years
        parentName: '', // theme name
        showTable: 0, // invisible add form and update form 0, visible add form 1, visible update form 2 
    }

    // init to get theme list
    componentDidMount() {
        this.getCategory()
    }

    getCategory = async () => {
        const {parentId} = this.state
        const result = await getCategoryList(parentId) // send get category request
        if(result.data.status === 0) { // successful get list
            const categoryList = result.data.data
            if(parentId === '0') { // if result is 0, display theme list
                this.setState({categoryList : categoryList})
            }else { // result is parentId and not 0, display year list belong that parentId
                this.setState({yearList : categoryList})
            }
        }else {
            message.error('Failed to get category.')
        }
    }

    // get the year list, get categoryList after click view year button, 
    // pass the categoryList and set state parentId to theme Id, and call the getCategory to display year list
    getYearList = (categoryList) => {
        this.setState({
            parentId: categoryList._id,
            parentName: categoryList.name
        }, () => {
            this.getCategory()
        })
    }

    // use to get back to the theme list, set state to 0, and call getCategory to display theme list
    backCategory = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            yearList: []
        })
    }

    //-----------------------------------------------------------
    // set state showTable to 0, make two forms invisible
    handleCancel = () => {
        this.setState({
            showTable: 0
        })
    }

    addCategory = async () => {
        this.setState({ // after add, invisiable update form
            showTable: 0
        })

        const categoryName = this.addcate.current.state.value
        const parentId = this.addcate.current.props.text
        
        // send add request
        await addCategory(categoryName, parentId) 

        this.getCategory() // reload theme list
    }

    // update category
    updateCategory = async () => {
        this.setState({ // after update, invisiable update form
            showTable: 0
        })
       
        // get categoryId and categoryName(from child component use creatRef)
        const categoryId = this.category._id
        const categoryName = this.cname.current.state.value

        // send update request
        await updateCategory(categoryId, categoryName)

        this.getCategory() // reload theme list
    }

    // set state showTable to 1, make add form visible
    showAdd = () => {
        this.setState({
            showTable: 1
        })
    }

    // set state showTable to 2, make update form visible
    // give the request result to category
    showUpdate = (categoryList) => {
        this.category = categoryList
        this.setState({
            showTable: 2
        })
    }
    
    render() {
        const {categoryList, yearList, parentId, parentName, showTable} = this.state

        const category = this.category || {}

        const title = parentId === '0' ? 'Lego set theme' : (
            <span>
                {/* go back to the theme list */}
                <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer', marginRight: 10, paddingLeft : 0 }} onClick={this.backCategory}>Lego set theme</button>
                <RightSquareOutlined />
                <span style={{marginLeft: 18}}>{parentName}</span>
            </span>
        )
          
        const columns = [
            {
                title: 'Theme name',
                dataIndex: 'name',
            },
            {
                title: 'operation',
                width: 250,
                render: (categoryList) => (
                <span> 
                    <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => (this.showUpdate(categoryList))}>{this.state.parentId === '0' ? 'Modify theme' : 'Modify year'}</button>
                    {this.state.parentId === '0' ? 
                    <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer', marginLeft: 30 }} onClick={() => (this.getYearList(categoryList))}>View year</button> : null}
                </span>
                )
            },
        ];

        // use to add theme or year
        const addButton = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusSquareOutlined />
                Add
            </Button>
        )

        return (
            <Card title={title} extra={addButton}>
                <Table dataSource={parentId === "0" ? categoryList : yearList} columns={columns} rowKey='_id' pagination={{defaultPageSize: 5, showQuickJumper: true}}/>
            
                <Modal title="Add category" visible={showTable === 1} onOk={this.addCategory} onCancel={this.handleCancel}>
                    <AddForm parentId={parentId} getInputAdd={this.addcate}></AddForm>
                </Modal>

                {/* update category, give the category name to the update form and get input back from update form */}
                <Modal title="Update category" visible={showTable === 2} onOk={this.updateCategory} onCancel={this.handleCancel}>
                    <UpdateForm category={category.name}  getInput={this.cname}></UpdateForm>
                </Modal>
            </Card>
        )
    }
}