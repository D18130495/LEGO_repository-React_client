import React, {Component} from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'
import './left-nav.less' // less style

import lego from '../../assets/images/LEGO.png' // LEGO logo
import { Menu } from 'antd'; // ante style
import {
    AppstoreOutlined,
    ApartmentOutlined,
    AppstoreAddOutlined,
    ClusterOutlined,
    UserAddOutlined,
    UserOutlined,
    GithubOutlined,
  } from '@ant-design/icons';
  import memoryUser from '../../utils/memoryUser'

  const { SubMenu } = Menu

class LeftNav extends Component {
    render() {
        const menus = memoryUser.user.data.menus // get current user, use to ge menus and display the function

        var path = this.props.location.pathname // use to show the second path

        if(path.indexOf('/home') === 0)
        {
            path = '/home'
        }

        if(path.indexOf('/setInfo') === 0)
        {
            path = '/setInfo'
        }

        return (
            <div className="left-nav">
                <header className="left-nav-header">
                    <img src={lego} alt="lego-logo"/>
                    <h1>LEGO Backstage</h1>
                </header>

                <Menu mode="inline" theme="light" selectedKeys={path} defaultOpenKeys={['sub1', 'sub2']}>
                    { menus.map((index) => (!index.indexOf('/home')?
                        <Menu.Item key="/home" icon={<AppstoreOutlined />}>
                            <Link to='/home'>
                                Home
                            </Link>
                        </Menu.Item> : null))
                    }

                    <SubMenu key="sub1" icon={<ClusterOutlined />} title="Manage LEGO sets">
                        { menus.map((index) => (!index.indexOf('/manageSet/theme')? 
                            <Menu.Item key="/theme" icon={<ApartmentOutlined />}>
                                <Link to='/theme'>
                                    Add theme
                                </Link>
                            </Menu.Item> : null))
                        }

                        { menus.map((index) => (!index.indexOf('/manageSet/setinfo')? 
                            <Menu.Item key="/setInfo" icon={<AppstoreAddOutlined />}>
                                <Link to='/setInfo'>
                                    Add set information
                                </Link>
                            </Menu.Item> : null))
                        }
                    </SubMenu>
                    
                    { menus.map((index) => (index.indexOf('/manageUser/user')? null :
                        <SubMenu key="sub2" icon={<UserOutlined />} title="Manage user">
                            <Menu.Item key="/user" icon={<UserAddOutlined />}>
                                <Link to='/user'>
                                    Add user
                                </Link>
                            </Menu.Item>
                        </SubMenu>))
                    }
                        

                    { menus.map((index) => (index.indexOf('/github')? null :
                        <Menu.Item key="/github" icon={<GithubOutlined />}>
                            <a href="https://github.com/D18130495/LEGO_repository-React_client" src="github" target='blank'><span>GitHub</span></a>        
                        </Menu.Item>))
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)