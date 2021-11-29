// setInfo detail page
import React from "react";

import './detail.less' // less style

import { Card, List } from "antd"; // antd component
import { LeftOutlined } from '@ant-design/icons'; // antd icon

import { getSetReleaseYear } from "../../api"; // api to get release year

export default class Detail extends React.Component {
    
    state = {
        year: '', // set release year
    }

    // send categoryId to find year of the set release
    async componentDidMount() {
        const categoryId = this.props.location.state.categoryId
        const result = await getSetReleaseYear(categoryId)
        this.setState({year : result.data.data.name })
    }

    render() {
        const set = this.props.location.state // get set from setInfoHome history.push()

        // title of the detail page
        const title = (
            <span>
                <LeftOutlined style={{ color: "#d0021b"}} onClick={() => this.props.history.goBack()}/> {/* back to the setInfoHome */}
                <span style={{ marginLeft: '10px'}}>Set detail</span>
            </span>
        )

        return (
            <Card title={title} className="setDetail"> {/* list to display each information of the set */}
                <List>
                    <List.Item style={{ justifyContent: 'left'}}>
                        <span className="leftList">Set name: </span>
                        <span>{set.name}</span>
                    </List.Item>

                    <List.Item style={{ justifyContent: 'left'}}>
                        <span className="leftList">Set description: </span>
                        <span>{set.desc}</span>
                    </List.Item>

                    <List.Item style={{ justifyContent: 'left'}}>
                        <span className="leftList">Set price: </span>
                        <span>{'€' + set.price}</span>
                    </List.Item>

                    <List.Item style={{ justifyContent: 'left'}}>
                        <span className="leftList">Set release year: </span>
                        <span>{this.state.year}</span>
                    </List.Item>

                    <List.Item style={{ justifyContent: 'left'}}>
                        <span className="leftList">Set pictures: </span>
                        
                        <span>
                            {
                                set.imgs.map(img => (
                                    <img key={img} src={'http://localhost:41571/images/' + img} alt="img" style={{height : '200px', width : "350px"}}/>
                                ))
                            }
                        </span>
                    </List.Item>

                    <List.Item style={{ justifyContent: 'left'}}>
                        <span className="leftList">Set detail: </span>
                        
                        <span dangerouslySetInnerHTML={{__html: set.detail}}/>
                    </List.Item>
                </List>
            </Card>
        )
    }
}