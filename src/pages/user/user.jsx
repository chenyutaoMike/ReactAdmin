import React, { Component } from 'react';
import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/constants'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api'
import UserForm from './user-form'
import {
  Card,
  Table,
  Button,
  Modal,
  message
} from 'antd'
class User extends Component {
  state = {
    users: [], //所有的用户列表
    isShow: false,//是否显示确认框
    roles: [],//所有角色的列表

  }
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        // render: (role_id) => this.state.roles.find(role => role._id === role_id).name
        render: (role_id) => this.roleNames[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      },
    ]


  }
  /**
   * 根据role的数组，生成包含所有角色名的对象(属性名用角色id值)
   */
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    console.log(roleNames)
    this.roleNames = roleNames
  }
  /**
   * 删除指定用户
   */
  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除 ${user.username}吗 `,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success(`删除${user.username}成功`)
          this.getUsers()
        } else {
          message.error(`删除${user.username}失败`)
        }
      }
    })
  }
  /**
   * 添加/修改用户
   */
  addOrupdateUser = () => {
    this.setState({
      isShow: false
    })
    this.form.validateFields(async (err, values) => {
      if (!err) {
        //1.收集输入数据
        let user = values
        this.form.resetFields()

        //如果是更新，需要给user指定_id属性
        if (this.user) {
          user._id = this.user._id
        
        }
        console.log(this.user)
        //2.提交添加的请求
        const result = await reqAddOrUpdateUser(user)
        //3.更新列表显示
        if (result.status === 0) {
          message.success(`${user._id ? '修改' : '添加'}用户成功`)
          this.getUsers()
        }


      }
    })
  }
  /**
   * 显示修改界面
   */
  showUpdate = (user) => {
    this.user = user
    this.setState({
      isShow: true
    })
  }
  /**
   * 显示添加界面
   */
  showAdd = () => {
    this.user = null //去除user中的信息
    this.setState({ isShow: true })
  }
  getUsers = async () => {
    const result = await reqUsers()
    console.log(result)
    if (result.status === 0) {
      const { users, roles } = result.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles
      })
    }
  }
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getUsers()
  }
  render() {
    const { users, isShow, roles } = this.state
    const user = this.user || {}
    
    const title = <Button type="primary" onClick={this.showAdd}>创建用户</Button>
    return (
      <Card title={title}>
        <Table
          dataSource={users}
          columns={this.columns}
          bordered
          rowKey='_id'

          pagination={{ defaultPageSize: PAGE_SIZE }}
        />;
        <Modal
          visible={isShow}
          title={user._id ? "修改用户" : "添加用户"}
          onOk={this.addOrupdateUser}
          onCancel={() => {
            this.setState({ isShow: false })
            this.form.resetFields()
            }
          }
        >
          <UserForm
            setForm={form => this.form = form}
            user={user}
            roles={roles}

          />

        </Modal>
      </Card >
    );
  }
}

export default User;
