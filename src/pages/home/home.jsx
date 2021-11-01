// page for main => home
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SetInfoHome from './setInfoHome'
import SetInfoDetail from './detail'

export default class SetInfo extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/home' component={SetInfoHome} exact/>
                <Route path='/home/detail' component={SetInfoDetail}/>
                <Redirect to='/home'/>
            </Switch>
        )
    }
}