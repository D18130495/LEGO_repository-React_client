// page for main => user
import React from "react";
import { Card, Button, Table, message, Modal } from 'antd';
import { PlusSquareOutlined, SafetyCertificateOutlined } from '@ant-design/icons'; // antd icon
import { getUserList, updateUser } from "../../api"; // api to get user list, update user info
import AuthTree from '../../components/authTree/authTree' // used to set user permissions and specify the functions that users can use
import { formateTime } from '../../utils/currentTime' // use to formate the date

export default class User extends React.Component {
    state = {
        userList: [], // users list
        rowSelected: {}, // the row selected
        showAuthTable: 0, // show authority table, 0 is invisible, 1 is visible
    }

    constructor (props) {
        super(props)
        this.menus = React.createRef() // use to get the result from authTree
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
                dataIndex: 'create_time',
                render: formateTime // formate the date use utils
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
        const result = await getUserList() // send the request, to get user list
        
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
    updateAuth = async () => {
        this.closeAuthTable() // close the authTree table
        // get the updated authority treeList from authTree
        const menus = this.menus.current.getMenus()
        // set the selected user menus to the updated authority treeList
        this.state.rowSelected.menus = menus

        const result = await updateUser(this.state.rowSelected) // send the request, to update the user info
        
        if(result.data.status === 0) {
            message.success("Successfully update user info")
            this.getUserList() // reload the user list
        }else {
            message.error("Update user failed")
        }
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

    // when click the row, it will set the rowSelected to targeting the row we selected, this will use for rowSelection in table tag
    selectedRow = (rowSelected) => {
        return {
            onClick: event => {
                // console.log(rowSelected)
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
                    <AuthTree user={rowSelected} ref={this.menus}/>
                </Modal>
            </Card>
        )
    }
}