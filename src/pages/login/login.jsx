import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from './store/actionCreator'
import './login.less'
import logo from '../../assets/images/logo.png'
/**
 *  登陆的路由组件
 */

class Login extends Component {

  handleSubmit = (event) => {
    event.preventDefault(); //阻止事件的默认行为
    //对所有表单字段进行校验
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        //没有错误，就代表校验成功
        const { username, password } = values
        //调用分发异步action的函数 => 发登陆的异步请求，有了结果后更新状态
        this.props.login(username, password)
        // const result = await reqLogin(username, password)
        // if (result.status === 0) {
        //   //提示登陆成功
        //   message.success('登陆成功')
        //   const user = result.data
        //   memoryUtils.user = user
        //   this.props.setUserDispath(user)
        //   storageUtils.saveUser(user)
        //   //跳转到管理页面(不需要再回退到登陆)
        //   this.props.history.replace('/home')
        // } else {
        //   //提示登陆失败
        //   message.error(result.msg)
        // }
      } else {
        //校验失败
        console.log('校验失败')
      }
    });
  };

  /**
   * 对密码进行自定义验证
   */

  validatePwd = (rule, value, callback) => {
    // callback()  //不传递参数，代表验证成功
    // callback('xxx') //传递参数，代表验证失败，传递过去的是提示内容
    if (!value) {
      callback('密码必须输入')
    } else if (value.length < 4) {
      callback('密码长度不能小于4位')
    } else if (value.length > 12) {
      callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    }
    callback()
  }


  render() {

    //如果用户已经登陆，自动跳转到管理界面
    // const user = memoryUtils.user
    const user = this.props.user

    if (user && user._id) {
      return <Redirect to="/" />
    }
    const errorMsg = this.props.user.errorMsg
    //redux的登录信息
    // if (this.props.user && this.props.user._id) {
    //   return <Redirect to="/" />
    // }
    //得到具收集表单验证，验证表单数据的对象form
    // const form =this.props.form;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="" />
          <h1>后台管理系统</h1>
        </header>
        <section className="login-content">
          <div className={user.errorMsg?'error-msg show':'error-msg'}>{errorMsg}</div>
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                //声明式验证：直接使用别人定义好的验证规则进行验证
                rules: [
                  { required: true, whitespace: true, message: '用户必须输入' },
                  { min: 4, message: '用户名至少4位' },
                  { max: 12, message: '用户名最多12位' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                ],
                initialValue: 'admin' //指定初始值
              })(<Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />)}

            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { validator: this.validatePwd }
                ],
              })(<Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />)}

            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
/**
 * 1.高阶函数
 *  1). 一类特别的函数
 *     a. 接收函数类型的参数
 *     b. 返回值是函数
 *  2). 常见的高阶函数
 *     a. 定时器: setTimeout() / setInterval()
 *     b. Promise: Promise(() => {})  then(res => {}, err => {})
 *     c. 数组遍历相关的方法:forEach()/filter()/map()/reduce()/find()/findIndex()
 *     d. 函数对象的bind()
 *     e. Form.create()(Login) / getFieldDecorator()()
 *  3). 高阶函数更加动态，更加具有扩展性
 * 2.高阶组件
 *  1). 本质就是一个函数
 *  2). 接收一个组件(被包装组件)，返回一个新的组件(包装组件),包装组件会向被包装组件传入特定属性
 *  3). 作用：扩展组件的功能
 *  4). 高阶组件也是高阶函数：接收一个组件函数，返回一个新的组件函数
 */
//包装Form组件生成一个新的组件Form(Login)
//新组件会向Form组件传递一个强大的对象属性: form
const WrapLogin = Form.create()(Login);

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}
const mapDispatchToprops = (dispatch) => {
  return {
    login: (username, password) => {
      dispatch(login(username, password))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToprops)(WrapLogin);
