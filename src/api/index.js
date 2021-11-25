// Encapsulate all request modeles, to make the call more convenient

import ajax from "./ajax";

// server port => package.json("proxy") 41571
const PORT = ''

// login
export function userLogin(username, password) {
    return ajax(PORT + '/login', {username, password}, 'POST')
}

// add user
export function addUser(user) {
    return ajax(PORT + '/manage/user/add', user, 'POST')
}

//--------------------------operation with category------------------------------------
// get category list
export function getCategoryList(parentId) {
    return ajax(PORT + '/manage/category/list', {parentId}, 'GET')
}

// add category
export function addCategory(name, parentId) {
    return ajax(PORT + '/manage/category/add', {name, parentId}, 'POST')
}

// update category
export function updateCategory(name, parentId) {
    return ajax(PORT + '/manage/category/update', {name, parentId}, 'POST')
}

// get a category(year)
// for redisplay the data in the detail
export function getSetReleaseYear(categoryId) {
    return ajax(PORT + '/manage/category/year', {categoryId}, 'GET')
}

// delete year category
export function deleteCategoryYear(yearID) {
    return ajax(PORT + '/manage/category/year/delete', {yearID}, 'GET')
}
//-------------------------------------------------------------------------------------




//--------------------------operation with set list------------------------------------
// set list pagination, get the data back from database
export function getSetList(pageNum, pageSize) {
    return ajax(PORT + '/manage/set/list', {pageNum, pageSize}, 'GET')
}

// search set info
export function searchSetInfo(pageNum, pageSize, searchName) {
    return ajax(PORT + '/manage/set/search', {pageNum, pageSize, searchName}, 'GET')
}

// add set info
export function addSetInfo(set) {
    return ajax(PORT + '/manage/set/add', set, 'POST')
} 

// update set info
export function updateSetInfo(set) {
    return ajax(PORT + '/manage/set/update', set, 'POST')
}

// delete set info
export function deleteSetInfo(setID) {
    return ajax(PORT + '/manage/set/delete', {setID}, 'GET')
}
//-------------------------------------------------------------------------------------


//--------------------------operation with user list------------------------------------
// get user list
export function getUserList() {
    return ajax(PORT + '/manage/user/list', {}, 'GET')
}

// remove the picture
export function removePicture(name) {
    return ajax(PORT + '/manage/img/delete', {name}, 'POST')
}

