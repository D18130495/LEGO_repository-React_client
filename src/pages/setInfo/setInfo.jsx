// page for main => setInfo
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SetInfoHome from './home'
import SetInfoDetail from './detail'
import SetInfoAddOrUpdate from './addOrUpdate'

export default class SetInfo extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/setInfo' component={SetInfoHome} exact/>
                <Route path='/setInfo/addOrUpdate' component={SetInfoAddOrUpdate}/>
                <Route path='/setInfo/detail' component={SetInfoDetail}/>
                <Redirect to='/setInfo'/>
            </Switch>
        )
    }
}