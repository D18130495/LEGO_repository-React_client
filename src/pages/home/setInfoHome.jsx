// setInfo main page
import React from "react";
import { Card, Input, Button, Table } from 'antd'; // antd component
import { getSetList, searchSetInfo } from '../../api' // api to send request

export default class SetInfoHome extends React.Component {

    state = {
        total: 0, // total data
        setList: [], // lego set list
        searchName: '', // search name
    }

    componentWillMount () {
        this.initColumns() // init page columns
    }

    componentDidMount() {
        this.getSetList(1) // display set list, display first page
    }

    getSetList = async (pageNum) => { // send get set list request
        const {searchName} = this.state
        var result

        if(searchName) { // after search display list, or just display list
            result = await searchSetInfo(pageNum, 5, searchName) // 5 is page size, use to search set info
        }else {
            result = await getSetList(pageNum, 5) // 5 is page size, without search input
        }

        if(result.data.status === 0) { // if successfully get the data back, set total and setList with result 
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
                width: 100,
                title: 'operation',
                render: (setList) => {
                    return (
                        <span>
                            <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => this.props.history.push('/home/detail', setList)}>Detail</button>
                        </span>
                    )
                }
            },
          ];
    }

    render() {
        const {setList, total, searchName} = this.state

        const title = (
            <span>
                <Input placeholder='Search by set name' style={{width: 150, marginLeft: 10}} value={searchName} onChange={event => this.setState({searchName:event.target.value})}/>
                <Button type='primary' style={{marginLeft: 10}} onClick={() => this.getSetList(1)}>Search</Button>
            </span>
        )

        return (
            <Card title={title}>
                <Table pagination={{total, defaultPageSize: 5, showQuickJumper: true, onChange: this.getSetList}} bordered rowKey='_id' dataSource={setList} columns={this.columns} />
            </Card>
        )
    }
}