import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";

export default class App extends React.Component {

    render() {
       return(
            <BrowserRouter>
                <switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/admin' component={Admin}></Route>
                </switch>
            </BrowserRouter>
       )
    }
}