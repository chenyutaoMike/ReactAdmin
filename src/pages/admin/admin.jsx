import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils'
import { Redirect, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Bar from '../charts/bar'
import Pie from '../charts/pie'
import Line from '../charts/line'
import Role from '../role/role'

const { Footer, Sider, Content } = Layout;
/**
 * 后台管理路由组件
 */

class Admin extends Component {
  render() {
    const user = memoryUtils.user

    //如果内存没有存储user ===> 证明当前没有登陆
    if (!user || !user._id) {
      return <Redirect to="/login" />
    }
    //store中的登录信息
    // if (!this.props.user || !this.props.user._id) {
    //   return <Redirect to="/login" />
    // }
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin:'20px',backgroundColor: '#fff' }}>

            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/line" component={Line} />
              <Route path="/role" component={Role} />
              <Redirect to="/home" />
            </Switch>

          </Content>
          <Footer style={{ textAlign: 'center', color: '#ccc' }}>推荐使用谷歌浏览器</Footer>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}
export default connect(mapStateToProps)(Admin);