// Main page
import React, {Component} from "react";
import { Redirect } from "react-router"; // redirect the page
import { Layout } from 'antd'; // antd layout component

// components of header, left-nav
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";
import storeUser from '../../utils/storeUserName' // store user, use to display user information
import memoryUser from "../../utils/memoryUser"; // store user

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
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}