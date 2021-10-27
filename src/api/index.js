// Encapsulate all request modeles, to make the call more convenient

import ajax from "./ajax";

// server port => package.json("proxy")
const PORT = ''

// login
export function userLogin(username, password) {
    return ajax(PORT + '/login', {username, password}, 'POST')
}