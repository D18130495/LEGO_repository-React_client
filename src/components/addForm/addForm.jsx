// add form component
import React from "react";
import { Form, Input } from 'antd'

import PropTypes from 'prop-types'

export default class AddForm extends React.Component {

    static propTypes = { parentId: PropTypes.string }

    render() {
        const { parentId } = this.props
        return (
            <Form>
                <Form.Item>
                    {/* pass parentId and input value use ref to give them back */}
                    <Input placeholder='Please input theme name' text={parentId} ref={this.props.getInputAdd}/>
                </Form.Item>
            </Form>
        )
    }
}