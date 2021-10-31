// setInfo main page
import React from "react";
import { Card, Select, Input, Button, Table } from 'antd'; // antd component
import { PlusSquareOutlined } from '@ant-design/icons'; // antd icon
import { getSetList } from '../../api' // api to send request

export default class SetInfoHome extends React.Component {

    state = {
        total: 0, // total data
        setList: [], // lego set list
    }

    componentWillMount () {
        this.initColumns() // init page columns
    }

    componentDidMount() {
        this.getSetList(1) // display set list
    }

    getSetList = async (pageNum) => { // send get set list request
        const result = await getSetList(pageNum, 1) // 1 is page size
        if(result.data.status === 0) {
            const { total, list } = result.data.data
            this.setState({
                total,
                setList: list
            })
        }
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
                width: 180,
                title: 'operation',
                render: (setList) => {
                    return (
                        <span>
                            <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer' }}>Detail</button>
                            <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer', marginLeft: 30 }}>Modify</button>
                        </span>
                    )
                }
            },
          ];
    }

    render() {
        const {setList, total} = this.state

        const title = (
            <span>
                <Select value='1' style={{width: 150}}>
                    <Select.Option value='1'>123</Select.Option>
                    <Select.Option value='2'>1234</Select.Option>
                </Select>
                <Input placeholder='gunjianzi' style={{width: 150, marginLeft: 10}}/>
                <Button type='primary' style={{marginLeft: 10}}>Search</Button>
            </span>
        )

        const extra = (
            <Button type='primary' style={{marginLeft: 10}}>
                <PlusSquareOutlined />
                Add
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table pagination={{total, defaultPageSize: 1, showQuickJumper: true, onChange: this.getSetList}} bordered rowKey='_id' dataSource={setList} columns={this.columns} />
            </Card>
        )
    }
}