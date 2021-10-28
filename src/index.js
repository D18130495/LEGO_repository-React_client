// render APP.js to the ../public/index.html div root
import React from "react";
import ReactDOM from "react-dom";

import storeUser from '../src/utils/storeUserName' 

import App from "./App";

storeUser.loadUser()

ReactDOM.render(<App />, document.getElementById('root'))