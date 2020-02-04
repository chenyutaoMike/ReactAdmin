import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'  //导航配置数组

import './index.less'
import { Menu, Icon } from 'antd'
import { setHeaderTitle } from '../header/store/actionCreator'

const { SubMenu } = Menu;
class LeftNav extends Component {
  /**
   * 判断当前登陆用户对item是否有权限
   */
  hasAyth = (item) => {
    const { key, isPublic } = item
    const menus = this.props.user.role.menus
    const username = this.props.user.username
    /**
     * 1.如果当前用户是admin
     * 2.如果当前item是公开的，直接返回true
     * 3.当前用户有此item的权限：key
     */
    if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
      return true
    } else if (item.children) { //4.如果当前用户有此item的某个子item的权限，这个item也要显示出来
      return !!item.children.find(child => menus.indexOf(child.key) !== -1)
    }
    return false
  }

  /**
   * 根据menu的数据数组生成对应的标签数组
   * 使用map() + 递归调用
   */

  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key} >
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }

    })
  }
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {

      //如果当前用户有item对应的权限，才需要显示对应的菜单项
      if (this.hasAyth(item)) {
        //判断item是否是当前对应的item
        if (item.key === path || path.indexOf(item.key) === 0) {
          //更新redux中的headerTitle状态
          this.props.setHeaderTitle(item.title)
        }

        if (!item.children) {
          pre.push(
            <Menu.Item key={item.key}>
              <Link to={item.key} onClick={() => this.props.setHeaderTitle(item.title)}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          )
        } else {
          //查找一个与当前请求路径匹配的子Item
          const cItem = item.children.find(citem => path.indexOf(citem.key) === 0)
          if (cItem) {
            //如果存在，说明当前item的子列表需要打开
            this.openKey = item.key
          }

          pre.push((
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
          ))
        }
      }


      return pre
    }, [])
  }
  /**
   * 在第一次render()之前执行一次
   * 为第一个render()准备数据(必须同步的)
   */
  componentWillMount() {

    this.menuNodes = this.getMenuNodes(menuList)
  }
  render() {
    //得到当前的路径
    let path = this.props.location.pathname
    if (path.indexOf('/product') === 0) { //说明当前请求的是商品或其子路由路径
      path = '/product'
    }
    const openKey = this.openKey
    console.log(path)
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt='' />
          <h1>后台管理</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          mode="inline"
          theme="dark"
          defaultOpenKeys={[openKey]}
        >
          {this.menuNodes}
        </Menu>
      </div>


    );
  }
}

export default connect(state =>({user:state.userReducer}), { setHeaderTitle })(withRouter(LeftNav));