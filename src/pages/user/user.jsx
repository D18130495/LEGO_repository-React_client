// page for main => user
import React from "react";
import { Card, Button, Table, message, Modal } from 'antd'; // component from ant design
import { PlusSquareOutlined, SafetyCertificateOutlined } from '@ant-design/icons'; // antd icon
import { getUserList, updateUser, addUser, deleteUser } from "../../api"; // api to get user list, update user info, delete user
import AuthTree from '../../components/authTree/authTree' // used to set user permissions and specify the functions that users can use
import { formateTime } from '../../utils/currentTime' // use to formate the date
import AddOrUpdateUser from '../../components/addOrUpdateUser/addOrUpdateUser' // use to add or update user

export default class User extends React.Component {
    state = {
        userList: [], // users list
        rowSelected: {}, // the row selected
        showAuthTable: 0, // show authority table, 0 is invisible, 1 is visible
        showAddOrUpdateTable: 0, // show add or update table, 0 is invisible, 1 is visible
    }

    constructor (props) {
        super(props)
        this.menus = React.createRef() // use to get the result from authTree
        this.user = React.createRef() // use to get the result from addOrUpdateUser
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
            {
                width: 175,
                title: 'operation',
                render: (rowSelected) => {
                    return (
                        <span>
                            {/* admin can not be operated */}
                            {rowSelected.username === 'admin' ? null :
                            <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => this.openUpdateTable()}>Modify</button>}
                            
                            {rowSelected.username === 'admin' ? null : 
                            <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer', marginLeft: 30 }} onClick={() => this.deleteUser(rowSelected)}>Delete</button>}
                        </span>
                    )
            }
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
            message.success("Successfully update user auth")
            this.getUserList() // reload the user list
        }else {
            message.error("Update user auth failed")
        }
    }

    // add or update user
    addOrUpdateUser = async () => {
        this.closeAddOrUpdateTable() // close the add or update table
        const user = this.user.current.getUser() // get the user from addOrUpdateUser component
        
        var result = '' 
        if(!user._id) { // if menus is empty, mean this is new user
            result = await addUser(user) // send the request to add the user
        }else { // if menus is not empty, update user
            result = await updateUser(user) //send the request to update the user
        }
        
        // display the result message, if add or update success or not
        if(result.data.status === 0 && !user._id) {
            message.success("Successfully add user")
            this.getUserList() // reload the user list
        }else if(result.data.status === 0 && user._id) {
            message.success("Successfully update user")
            this.getUserList() // reload the user list 
        }else if(!result.data.status === 0 && !user._id) {
            message.error("Add user failed")
        }else {
            message.error("Update user failed")
        }
    }

    // delete user
    deleteUser = (rowSelected) => {
        Modal.confirm({
            content: 'Are you sure to delete this user?',
            onOk: async () => {
                const result = await deleteUser(rowSelected._id) // send request, to delete user
            
                if(result.data.status === 0) {
                    message.success("Successfully delete user")
                    this.getUserList() // reload the user list
                }else {
                    message.error("Delete user failed")
                }
            },
        })
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

    // open add or update table
    openAddOrUpdateTable = () => {
        this.setState({
            showAddOrUpdateTable: 1
        })
    }

    // invisible add or update table
    closeAddOrUpdateTable = () => {
        this.setState({
            showAddOrUpdateTable: 0
        })
        this.user.current.getUser() // use to reset the input box
    }

    // when some row are selected, set the rowSelected to null
    openAddTable = () => {
        this.openAddOrUpdateTable()
        this.setState({
            rowSelected: {}
        })
    }

    // 
    openUpdateTable = () => {
        
        this.openAddOrUpdateTable()
        console.log(this.user)
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
        const { userList, rowSelected, showAuthTable, showAddOrUpdateTable } = this.state

        const title = (
            <span>
                {/* admin can not be authorized */}
                <Button type='primary' disabled={!rowSelected._id || rowSelected.username === 'admin'} style={{border: 'none', cursor: 'pointer', marginLeft: 30 }} onClick={() => this.openAuthTable()}>
                    <SafetyCertificateOutlined />
                    Authority
                </Button>    
            </span>
        )
        
        const extra = (
            <span>
                <Button type='primary' onClick={() => this.openAddTable()}>
                    <PlusSquareOutlined />
                    Add
                </Button>
            </span>
        )

        return (
            <Card title={title} extra={extra}>
                <Table bordered rowKey='_id' dataSource={userList} columns={this.userCol} pagination={{defaultPageSize: 5}} rowSelection={{type:'radio', selectedRowKeys: [rowSelected._id]}} onRow={this.selectedRow}></Table>
                    
                <Modal title="Authority" visible={showAuthTable === 1} onOk={this.updateAuth} onCancel={this.closeAuthTable}>
                    <AuthTree user={rowSelected} ref={this.menus}/>
                </Modal>

                <Modal title="User" visible={showAddOrUpdateTable === 1} onOk={this.addOrUpdateUser} onCancel={this.closeAddOrUpdateTable}>
                    <AddOrUpdateUser user={rowSelected} ref={this.user}/>
                </Modal>
            </Card>
        )
    }
}