import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal } from 'antd';
import { reqWeather } from '../../api/index'
import { formateDate } from '../../utils/dateUtils'
import {logout} from '../../pages/login/store/actionCreator'
import menuList from '../../config/menuConfig'

import LinkButton from '../../components/link-button'
import './index.less'
class Header extends Component {

  state = {
    currentTime: formateDate(Date.now())  //当前时间字符串
  }

  getReqWeather = async () => {
    const result = await reqWeather()
    console.log(result)
  }
  getTime = () => {
    //每隔1s获取当前时间，并更新状态数据currentTime
    this.Timer = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }
  getTitle = () => {
    //得到当前请求路径
    const path = this.props.location.pathname;
    let title;
    menuList.forEach(item => {
      if (path === item.key) {  //如果当前item对象的key与path一样，item的title就是需要显示的title
        title = item.title
      } else if (item.children) {
        //在所有的子item中查找匹配的
        const cItem = item.children.find(childrenitem => path.indexOf(childrenitem.key) === 0)
        //如果有cItem，那么说明有匹配的
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }
  /**
   * 退出登录
   * 
   */
  logout = () => {
    //显示确认框
    Modal.confirm({
      content: '确定退出码',
      onOk: () => {  //点击了确定
        //删除保存的user数据
        this.props.logout()
        //跳转到login页面
        
      },
      onCancel() { //点击了取消
        console.log('Cancel');
      },
    });
  }
  /**
   * 第一次render()之后执行一次
   * 一般在此执行异步操作: 发ajax请求/启动定时器
   */
  componentDidMount() {
    this.getTime()
  }
  componentWillUnmount() {
    clearInterval(this.Timer)
  }
  render() {
    const { currentTime } = this.state
    // const title = this.getTitle()
    const { headerTitle } = this.props
    const username = this.props.user.username

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{headerTitle}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src="" alt="" />
            <span>晴天</span>
          </div>

        </div>

      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    headerTitle: state.headerTitle,
    user: state.userReducer
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout(){
      dispatch(logout())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Header));
