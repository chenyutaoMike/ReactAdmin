import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './login.less';
import logo from '../../assets/images/logo.png'
/**
 *  登陆的路由组件
 */

class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault(); //阻止事件的默认行为
    const valus = this.props.form.getFieldsValue();
    console.log(valus)
  };
  render() {
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
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {/* username:标识名称，以后收集表单数据的时候用到的，username的下一个参数就是表单验证规则*/}
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(<Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />)}

            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your username!' }],
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
export default WrapLogin;
