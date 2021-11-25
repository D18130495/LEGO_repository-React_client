// page for main => user
import React from "react";
import { Card, Button, Table, message, Modal } from 'antd';
import { PlusSquareOutlined, SafetyCertificateOutlined } from '@ant-design/icons'; // antd icon
import { getUserList } from "../../api"; // api to get user list
import AuthTree from '../../components/authTree/authTree' // used to set user permissions and specify the functions that users can use

export default class User extends React.Component {
    state = {
        userList: [], // users list
        rowSelected: {}, // the row selected
        showAuthTable: 0, // show authority table, 0 is invisible, 1 is visible
    }

    // Column format
    initUserCol = () => {
        this.userCol = [
            {
                title: 'User name',
                dataIndex: 'username'
            },
            {
                title: 'Create time',
                dataIndex: 'create_time'
            },
            {
                title: 'Phone number',
                dataIndex: 'phone'
            },
            {
                title: 'Email',
                dataIndex: 'email'
            },
        ]
    }

    // get the user list from back end
    getUserList = async () => {
        const result = await getUserList() // send the request
        
        if(result.data.status === 0) {
            const userList = result.data.data
            this.setState({ // set the userList with the data from the result
                userList
            })
        }else {
            message.error("Get user list failed")
        }
    }
    // update user Authority
    updateAuth = () => {
        
    }

    // open authority table
    openAuthTable = () => {
        this.setState({
            showAuthTable: 1
        })
    }

    // invisible authority table
    closeAuthTable = () => {
        this.setState({
            showAuthTable: 0
        })
    }

    // init the user column before the render
    componentWillMount() {
        this.initUserCol()
    }

    // get the users from api and init the user list after render 
    componentDidMount() {
        this.getUserList()
    }

    selectedRow = (rowSelected) => {
        return {
            onClick: event => {
                console.log(rowSelected)
                this.setState({
                    rowSelected
                })
            }
        }
    }

    render() {
        const { userList, rowSelected, showAuthTable } = this.state

        const title = (
            <span>
                <Button type='primary' disabled={!rowSelected._id} style={{border: 'none', cursor: 'pointer', marginLeft: 30 }} onClick={() => (this.openAuthTable())}>
                    <SafetyCertificateOutlined />
                    Authority
                </Button>    
            </span>
        )
        
        const extra = (
            <span>
                <Button type='primary'>
                    <PlusSquareOutlined />
                    Add
                </Button>
            </span>
        )

        return (
            <Card title={title} extra={extra}>
                <Table rowKey='_id' dataSource={userList} columns={this.userCol} pagination={{defaultPageSize: 5}} rowSelection={{type:'radio', selectedRowKeys: [rowSelected._id]}} onRow={this.selectedRow}></Table>
                    
                <Modal title="Authority" visible={showAuthTable === 1} onOk={this.updateAuth} onCancel={this.closeAuthTable}>
                    <AuthTree user={rowSelected}/>
                </Modal>
            </Card>
        )
    }
}