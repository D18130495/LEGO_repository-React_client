// Main page
import React, {Component} from "react";
import { Redirect } from "react-router"; // redirect the page
import { Layout } from 'antd'; // antd layout component

// components of header, left-nav
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";
import storeUser from '../../utils/storeUserName' // store user, use to display user information

const { Footer, Sider, Content } = Layout;

export default class Main extends Component {
    render() {
        // if not login, and there do not have user info in the localstorage, redirect to login page
        if(!storeUser.loadUser().data) {
            return <Redirect to='/login'/>
        }
        // console.log(user)
        
        return (
            <Layout style={{height : '100%'}}>
                <Sider style={{background : '#ffcf00'}}>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}