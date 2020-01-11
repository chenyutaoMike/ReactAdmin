/**
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */

import ajax from './ajax'

// export function reqLogin(username,password){
//  return ajax('/login',{username,password},'POST')
// }
//简写
const BASE = ''
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')