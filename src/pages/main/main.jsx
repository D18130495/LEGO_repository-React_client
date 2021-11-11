// Main page
import React, {Component} from "react";
import { Redirect, Route, Switch } from "react-router"; // redirect the page
import { Layout } from 'antd'; // antd layout component

// components of header, left-nav
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";

import memoryUser from "../../utils/memoryUser"; // get username

import Home from '../home/home'
import Category from "../category/category";
import SetInfo from "../setInfo/setInfo";
import User from "../user/user";

const { Footer, Sider, Content } = Layout;

export default class Main extends Component {
    render() {
        // if not login, and there do not have user info in the localstorage, redirect to login page
        const user = memoryUser.user.data
        if(!user || !user._id) {
            return <Redirect to='/login'/>
        }
        
        return (
            <Layout style={{height : '100%'}}>
                <Sider style={{background : '#ffcf00'}}>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content style={{background: '#fff', margin: 20}}>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/setInfo' component={SetInfo}></Route>
                            <Route path='/user' component={User}></Route>
                            <Redirect to='/home'/> {/* Automatically direct to home if no one be chosen */}
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}