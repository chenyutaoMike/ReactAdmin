/**
 * 发送异步ajax请求的函数模块
 * 封装axios库
 * 函数的返回值是promise对象
 * 1. 优化：统一处理请求异常
 *    在外层包一个自己创建的Promise对象
 *    在请求出错时，不reject(error)，而是显示错误提示
 * 2. 优化2：异步得到不是reponse,而是response.data
 *    在请求成功resolve时: resolve(response.data)
 */
import axios from 'axios'
import { message } from 'antd'
export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {  //返回一个promise函数
    let promise;
    if (type === 'GET') {   //发送get请求
      promise = axios.get(url, {  //配置对象
        params: data   //指定请求参数 
      })
    } else {  //发送post请求
      promise = axios.post(url, data)
    }
    promise.then(response => {   //成功的回调
      resolve(response.data)
    }).catch(error => {   //请求出错，在这里处理请求错误，而不是用reject返回错误
      message.error('请求出错:' + error.message)
    })

  })
  
}