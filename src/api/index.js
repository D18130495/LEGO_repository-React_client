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

// get category list
export function getCategoryList(parentId) {
    return ajax(PORT + '/manage/category/list', {parentId}, 'GET')
}

// add category
export function addCategory(categoryName, parentId) {
    return ajax(PORT + '/manage/category/add', {categoryName, parentId}, 'POST')
}

// update category
export function updateCategory(categoryId, categoryName) {
    return ajax(PORT + '/manage/category/update', {categoryId, categoryName}, 'POST')
}

// set list pagination
export function getSetList(pageNum, pageSize) {
    return ajax(PORT + '/manage/product/list', {pageNum, pageSize}, 'GET')
}

// search set info
export function searchSetInfo(pageNum, pageSize, searchName) {
    return ajax(PORT + '/manage/product/search', {pageNum, pageSize, searchName}, 'GET')
}