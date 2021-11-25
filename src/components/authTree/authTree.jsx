import React from "react";
import PropTypes from 'prop-types'; // use to get the data from user
import { Input, Tree } from "antd";


export default class AuthTree extends React.Component {
    static propTypes = {
        user: PropTypes.object
    }

    render() {
        const treeData = [
            {
              title: 'All permissions',
              key: '0-0',
              children: [
                {
                    title: 'Home',
                    key: '0-0-0',
                },
                {
                    title: 'Manage LEGO sets',
                    key: '0-0-1',
                    children: [
                        {
                            title: 'Add theme',
                            key: '0-0-0-0',
                        },
                        {
                            title: 'Add set information',
                            key: '0-0-0-1',
                        },
                    ],
                },
                {
                    title: 'Manage user',
                    key: '0-0-2',
                    children: [
                        {
                            title: 'Add user',
                            key: '0-0-0-1',
                        },
                    ],
                },
                {
                    title: 'GitHub',
                    key: '0-0-3',
                },
              ],
            },
          ];
          
        return (
            <Tree checkable treeData={treeData} defaultExpandAll={true}/>
        )
    }
}