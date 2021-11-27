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
        setListID: 0, // the row ID, use to position the delete row
    }

    componentWillMount () {
        this.initColumns() // init page columns
    }

    componentDidMount() {
        this.getSetList(1) // display set list
    }

    // get set info list
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

    // delete set info
    deleteSet = (setList) => {
        Modal.confirm({
            content: 'Are you sure to delete this set information?',
            onOk: async () => {
                const result = await deleteSetInfo(setList._id) // send request to delete the set info
            
                if(result.data.status === 0) {
                    message.success("Successfully delete set")
                    this.getSetList(1) // reload the set list
                }else {
                    message.error("Delete set failed")
                }
            },
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
                            <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer', marginLeft: 30 }} onClick={() => this.deleteSet(setList)}>Delete</button>
                        </span>
                    )
                }
            },
          ];
    }

    render() {
        const { setList, total } = this.state

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
            </Card>
        )
    }
}