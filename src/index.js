// render APP.js to the ../public/index.html div root
import React from "react";
import ReactDOM from "react-dom";

import storeUser from '../src/utils/storeUserName'
import memoryUser from "./utils/memoryUser";

import App from "./App";

const user = storeUser.loadUser()
memoryUser.user = user

ReactDOM.render(<App />, document.getElementById('root'))