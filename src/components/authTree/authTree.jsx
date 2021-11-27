import React from "react";
import PropTypes from 'prop-types'; // use to get the data from user
import { Tree } from "antd"; // component from ant design


export default class AuthTree extends React.Component {
    static propTypes = {
        user : PropTypes.object // get the selected user row from user list
    }

    state = {
        treeList: []
    }

    constructor (props) {
        super(props)
        this.state = {
            treeList: this.props.user.menus // init the default value
        } 
    }

    // use to get the data of treeList 
    getMenus = () => this.state.treeList

    // click on the option and reset the value of tree
    onCheck = treeList => {
        this.setState({
            treeList
        })
    }

    // when the authTree receive the props update the default option of the list
    componentWillReceiveProps (nextProps) {
        this.setState({
            treeList: nextProps.user.menus
        })
    }

    render() {
        const treeData = [
            {
              title: 'All permissions',
              key: '/all',
              children: [
                {
                    title: 'Home',
                    key: '/home'
                },
                {
                    title: 'Manage LEGO sets',
                    key: '/manageSet',
                    children: [
                        {
                            title: 'Add theme',
                            key: '/manageSet/theme',
                        },
                        {
                            title: 'Add set information',
                            key: '/manageSet/setinfo',
                        },
                    ],
                },
                {
                    title: 'Manage user',
                    key: '/manageUser',
                    children: [
                        {
                            title: 'Add user',
                            key: '/manageUser/user',
                        },
                    ],
                },
                {
                    title: 'GitHub',
                    key: '/github',
                },
              ],
            },
          ];
          
        return (
            <Tree 
                checkable // tree can be click
                treeData={treeData} // the data of the tree
                defaultExpandAll={true} // display all the tree leaf
                checkedKeys={this.state.treeList} // display the init permissions list
                onCheck={this.onCheck} // click the option and reset the treeList
            ></Tree>
        )
    }
}