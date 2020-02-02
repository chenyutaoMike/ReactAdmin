/**
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */
import jsonp from 'jsonp'
import ajax from './ajax'
import { message } from 'antd'
// export function reqLogin(username,password){
//  return ajax('/login',{username,password},'POST')
// }
//简写
const BASE = ''
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')



//获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId }, 'GET')
//添加分类
export const reqAddCategorys = (parentId, categoryName) => ajax(BASE + '/manage/category/add', { parentId, categoryName }, 'POST')
//更新分类
export const reqUpdataCategorys = ({ categoryId, categoryName }) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')

//获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', { categoryId })

//获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize })

//更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', { productId, status }, 'POST')

/**
 * 搜索商品分页列表(根据商品名称/商品描述)
 * searchType:搜索的类型,productName/priductDesc
 * 
 */
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName
})

//删除指定名称的图片
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', { name }, 'POST')

//添加商品
export const reqAddProduct = (product) => ajax(BASE + '/manage/product/add', product, 'POST')
//修改商品
export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST')

//添加修改商品接口合并
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')

//获取所有角色的列表
export const reqRoles = () => ajax(BASE + '/manage/role/list')

//添加角色
export const reqAddRole = (roleName) => ajax(BASE + '/manage/role/add', { roleName }, 'POST')

//更新角色
export const reqUpateRole = (role) => ajax(BASE + '/manage/role/update', role, 'POST')

//获取所有用户的列表
export const reqUsers = () => ajax(BASE + '/manage/user/list')

//删除指定用户
export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete', { userId }, 'POST')

//添加用户
export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST')


/**
 * json请求的接口函数
 */

export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&ou tput=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        resolve(data)
      } else {
        message.error('获取天气信息失败')
      }
    })
  })
}

