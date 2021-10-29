// page for main => category
// page for main => home
import React from "react";

import { Card, Table, Button } from 'antd' // antd card, table and button component
import { PlusSquareOutlined } from '@ant-design/icons'; // antd icon

export default class Category extends React.Component {
    render() {

        const dataSource = [
            {
                "parentId": '0',
                "_id": "123456",
                "theme": "City",
            },
            {
                "parentId": '0',
                "_id": "1234563",
                "theme": "INJIAGO",
            },
            {
                "parentId": '0',
                "_id": "1234563",
                "theme": "Architecture",
            },
            {
                "parentId": '0',
                "_id": "1234563",
                "theme": "Creator 3-in-1",
            },
            {
                "parentId": '0',
                "_id": "1234563",
                "theme": "LEGO® Super Mario™",
            },
        ];
          
          const columns = [
            {
              title: 'Theme name',
              dataIndex: 'theme',
            },
            {
              title: 'operation',
              width: 250,
              render: () => (
                <span>
                    <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer' }}>Modify theme</button>
                    <button style={{color: '#d0021b', background: 'transparent', border: 'none', cursor: 'pointer', marginLeft: 30 }}>View year</button>
                </span>
              )
            },
          ];

        const addButton = (
            <Button type='primary'>
                <PlusSquareOutlined />
                Add
            </Button>
        )

        return (
            <Card title="Lego set theme" extra={addButton}>
                <Table dataSource={dataSource} columns={columns} rowKey='_id' bordered/>;
            </Card>
        )
    }
}