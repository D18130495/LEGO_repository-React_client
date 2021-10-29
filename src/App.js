// router for each page
import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'

// get the page location 
import Login from "./pages/login/login";
import Main from "./pages/main/main";

export default class App extends React.Component {

    render() {
       return(
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Main}></Route>
                </Switch>
            </BrowserRouter>
       )
    }
}