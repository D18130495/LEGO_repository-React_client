// update form component
import React from "react";
import { Form, Input } from 'antd'

import PropTypes from 'prop-types'

export default class UpdateForm extends React.Component { 

    // use to get the theme name from parent component
    static propTypes = { category : PropTypes.string }

    render() {
        const {category} = this.props
        return (
            <Form>                
                <Form.Item>
                    {/* display the category name which pass from parent category.jsx and use ref to give the input back */}
                    <Input placeholder={category} ref={this.props.getInput}/>
                </Form.Item>
            </Form>
        )
    }
}