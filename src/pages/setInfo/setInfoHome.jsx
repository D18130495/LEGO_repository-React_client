// setInfo main page
import React from "react";
import { Card, Button, Table, message, Modal } from 'antd'; // antd component
import { PlusSquareOutlined } from '@ant-design/icons'; // antd icon
import { getSetList } from '../../api' // api to send request
import { deleteSetInfo } from "../../api"; // api to delete set info

export default class SetInfoHome extends React.Component {

    state = {
        total: 0, // total data
        setList: [], // lego set list        
        showTable: 0, // invisible delete inform table 0, visible delete inform table 1
        setListID: 0, // the row ID, use to position the delete row
    }

    componentWillMount () {
        this.initColumns() // init page columns
    }

    componentDidMount() {
        this.getSetList(1) // display set list
    }

    getSetList = async (pageNum) => { // send get set list request
        const result = await getSetList(pageNum, 5) // 5 is page size

        if(result.data.status === 0) { // query the data and store in the setList
            const { total, list } = result.data.data
            this.setState({
                total,
                setList: list
            })
        }
    }

    deleteSetInfo = async (setID) => { // send request to delete set info
        this.setState({ // after delete, invisiable delete inform table
            showTable: 0
        })

        const result = await deleteSetInfo(setID) // call the api to delete row

        if(result.data.status === 0) {
            message.success("Successfully delete")
            this.getSetList(1) // after delete, reload the list
        }else {
            message.error("Delete failed")
        }
    }

    showDelete = (setListID) => { // show delete inform table
        this.setListID = setListID // set the delete row, use to position the delete row
        this.setState({
            showTable: 1 // 1 is to show the delete inform table
        })
    }

    // set state showTable to 0, make delete inform table invisible
    removeDelete = () => {
        this.setListID = 0 // close delete inform table, set the delete row to 0
        this.setState({
            showTable: 0 // make delete inform table invisible
        })
    }

    // init table
    initColumns = () => {
        this.columns = [
            {
                width: 400,
                title: 'Set name',
                dataIndex: 'name',
            },
            {
                title: 'Set description',
                dataIndex: 'desc',
            },
            {
                width: 120,
                title: 'Set price',
                dataIndex: 'price',
                render: (price) => '€' + price
            },
            {
                width: 250,
                title: 'operation',
                render: (setList) => {
                    return (
                        <span>
                            <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => this.props.history.push('/setInfo/detail', setList)}>Detail</button>
                            <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer', marginLeft: 30 }} onClick={() => this.props.history.push('/setInfo/addOrUpdate', setList)}>Modify</button>
                            <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer', marginLeft: 30 }} onClick={() => (this.showDelete(setList._id))}>Delete</button>
                        </span>
                    )
                }
            },
          ];
    }
// () => this.deleteSetInfo(setList._id)
    render() {
        const { setList, total, showTable } = this.state

        const title = (
           <span>Manage the LEGO sets.</span>
        )

        const extra = (
            <Button type='primary' style={{marginLeft: 10}} onClick={() => this.props.history.push('/setInfo/addOrUpdate')}>
                <PlusSquareOutlined />
                Add
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table pagination={{total, defaultPageSize: 5, showQuickJumper: true, onChange: this.getSetList}} bordered rowKey='_id' dataSource={setList} columns={this.columns} />
                
                {/* Delete inform table */}
                <Modal title="Delete inform" visible={showTable === 1} onOk={() => this.deleteSetInfo(this.setListID)} onCancel={this.removeDelete}>
                    Are you sure to delete the information of this set?
                </Modal>
            </Card>
        )
    }
}