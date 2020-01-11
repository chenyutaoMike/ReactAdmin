import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'  //导航配置数组
import './index.less'
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;
class LeftNav extends Component {

  /**
   * 根据menu的数据数组生成对应的标签数组
   * 使用map() + 递归调用
   */

  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
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
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        //查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(citem => citem.key === path)
        if (cItem) {
          //如果存在，说明当前item的子列表需要打开
          this.openKey = item.key
        }
        console.log(this.openKey)
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
    const path = this.props.location.pathname
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

export default withRouter(LeftNav);