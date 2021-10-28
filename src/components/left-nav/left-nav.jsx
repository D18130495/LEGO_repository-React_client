import React, {Component} from "react";
import './left-nav.less' // less style

import lego from '../../assets/images/LEGO.png' // LEGO logo
import { Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
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

                <Menu
                mode="inline"
                theme="light"
                >
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        Option 1
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                        <Menu.Item key="5">Option 3</Menu.Item>
                        <Menu.Item key="6">Option 4</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}