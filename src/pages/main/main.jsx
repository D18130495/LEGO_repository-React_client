// Main page
import React, {Component} from "react";
import storeUser from '../../utils/storeUserName'

export default class Main extends Component {
    render() {
        const user = storeUser.loadUser().data
        console.log(user)
        return (
            <div>
                {user.username}
            </div>
        )
    }
}