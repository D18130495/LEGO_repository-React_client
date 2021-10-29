import React, {Component} from "react";
import { Link } from "react-router-dom";
import './left-nav.less' // less style

import lego from '../../assets/images/LEGO.png' // LEGO logo
import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    ApartmentOutlined,
    AppstoreAddOutlined,
    ClusterOutlined,
    UserAddOutlined,
    UserOutlined,
    GithubOutlined,
  } from '@ant-design/icons';

  const { SubMenu } = Menu

export default class LeftNav extends Component {
    render() {
        return (
            <div className="left-nav">
                <header className="left-nav-header">
                    <img src={lego} alt="lego-logo"/>
                    <h1>LEGO Backstage</h1>
                </header>

                <Menu mode="inline" theme="light">
                    <Menu.Item key="home" icon={<AppstoreOutlined />}>
                        <Link to='/home'>
                            Home
                        </Link>
                    </Menu.Item>

                    <SubMenu key="sub1" icon={<ClusterOutlined />} title="Manage LEGO sets">
                        <Menu.Item key="category" icon={<ApartmentOutlined />}>
                            <Link to='/category'>
                                Add category
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="setInfo" icon={<AppstoreAddOutlined />}>
                            <Link to='/setInfo'>
                                Add set information
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub2" icon={<UserOutlined />} title="Manage user">
                        <Menu.Item key="user" icon={<UserAddOutlined />}>
                            <Link to='/user'>
                                Add user
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="github" icon={<GithubOutlined />}>
                        <span>GitHub</span><a href="https://github.com/D18130495/LEGO_repository-React_client" target='blank'/>        
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}