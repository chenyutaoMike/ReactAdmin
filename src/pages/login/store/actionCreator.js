import { RECEIVE_USER, SHOW_ERROR_MSG,RESET_USER } from './actionTypes'
import { reqLogin } from '../../../api'
import storageUtils from '../../../utils/storageUtils'



/**
 * 
 * 接收用户的同步action 
 */
export const receiveUser = (user) => ({
   type: RECEIVE_USER,
   user
})


/**
 * 显示错误信息的同步action
 * 
 */
export const showErrorMsg = (errorMsg) => ({
   type: SHOW_ERROR_MSG,
   errorMsg
})

/**
 * 退出登陆的同步action
 */
export const logout = () =>{
   //删除local中的user
   storageUtils.removeUser()
   //返回action对象
  return {type:RESET_USER}
}

/**
 * 登陆的异步action
 */

export const login = (username, password) => {
   return async dispatch => {
      //1.执行异步ajax请求
      const result = await reqLogin(username, password)
      if (result.status === 0) {
         //2.1 如果成功，分发成功的同步action
         const user = result.data
         //保存到local中
         storageUtils.saveUser(user)
         //分发接收用户的同步action
         dispatch(receiveUser(user))
      } else {
         //2.2 如果失败，分发失败的同步action
         const msg = result.msg
         dispatch(showErrorMsg(msg))
      }
   }
}