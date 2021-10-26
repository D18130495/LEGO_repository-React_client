// login part router
import React, {Component} from "react";

import './login.less'
import lego from './images/LEGO.png'

export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={lego} alt="lego-logo"/>
                    <h1>LEGO Repositories, help you find all Lego sets.</h1>
                </header>

                <section className="login-form">
                    <h2>User login</h2>
                    <div>form</div>
                </section>
            </div>
        )
    }
}