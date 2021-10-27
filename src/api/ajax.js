// Use axios to send asynchronous ajax requests(GET, POST)
import { message } from 'antd'
import axios from 'axios'

export default function ajax(url, data={}, type) {
    return new Promise((resolve, reject) => {
        var promise
        
        // Ajax requests
        if(type === 'GET') {
            promise = axios.get(url, {
                params : data
            })
        }
        
        if(type === 'POST') {
            promise = axios.post(url, data)
        }

        // global exception handle
        // if success, call resolve()
        // if unsuccess, call reject()
        promise.then(response => {
            resolve(response)
        }).catch(error => {
            message.error(error.message)
        })
    })
}