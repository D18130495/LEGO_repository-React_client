// store user name after successfully login, put in the localstorage
export default {
    saveUser(user) { // save user
        localStorage.setItem("user", JSON.stringify(user))
    },
    loadUser() {  // load user
        return JSON.parse(localStorage.getItem("user") || "{}")
    },
    deleteUser() { // delete user
        localStorage.removeItem("user")
    }
}