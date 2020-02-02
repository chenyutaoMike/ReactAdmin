import React, { Component } from 'react';
import { reqRoles, reqAddRole, reqUpateRole } from '../../api'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { formateDate } from '../../utils/dateUtils'
class Role extends Component {

  state = {
    roles: [], //所有角色的列表
    role: {}, //选中的role
    isShowAdd: false, //是否显示添加界面
    isShowAuth: false, //是否显示设置权限界面
  }
  constructor(props) {
    super(props)
    this.auth = React.createRef()
  }

  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: (anth_time) => formateDate(anth_time)
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
    ]
  }
  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }
  onRow = (role) => {
    return {
      onClick: event => {  //点击的行数
        this.setState({
          role
        })
      }
    }
  }
  /**
   * 添加角色
   */
  addRole = () => {

    this.form.validateFields(async (err, values) => {
      //进行表单验证，通过了才向下处理
      if (!err) {
        this.setState({
          isShowAdd: false
        })
        // 收集输入数据
        const { roleName } = values
        this.form.resetFields()
        // 请求添加
        const result = await reqAddRole(roleName)

        if (result.status === 0) {
          //更新数据
          // this.getRoles()
          message.success('添加角色成功')

          const data = result.data
          //更新roles状态：基于原本状态数据更新
          this.setState(state => ({
            roles: [...state.roles, data]
          }))
        } else {
          message.error('添加角色失败')
        }
      }
    })
  }
  /**
   * 更新角色
   */
  updateRole = async () => {
    this.setState({
      isShowAuth: false
    })
    let role = this.state.role
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username
    //请求更新

    const result = await reqUpateRole(role)
    if (result.status === 0) {

      //如果当前更新的是自己的角色的权限，强制退出
      if (role._id === memoryUtils.user.role._id) {
        storageUtils.removeUser()
        memoryUtils.user = {}
        this.props.history.replace('/login')
        message.success('当前用户角色权限修改了，重新登录')
      } else {
        message.success('设置角色权限成功')
        this.getRoles()
      }
    } else {
      message.error('设置权限失败')
    }
  }

  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getRoles()
  }
  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state
    const title = (
      <span>
        <Button type="primary" style={{ marginRight: 10 }} onClick={() => this.setState({ isShowAdd: true })}>创建角色</Button>
        <Button type="primary" disabled={!role._id} onClick={() => this.setState({ isShowAuth: true })}>设置角色权限</Button>
      </span>
    )

    return (
      <Card
        title={title}
      >
        <Table
          dataSource={roles}
          columns={this.columns}
          bordered
          rowKey='_id'
          pagination={{ defaultPageSize: 5, pageSize: 3 }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            onSelect: (role) => { //选择某个radio的时候的回调
              this.setState({ role })
            }
          }}
          onRow={this.onRow}
        >
        </Table>
        <Modal
          visible={isShowAdd}
          title="添加角色"
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false })
            this.form.resetFields()
          }}
        >
          <AddForm
            setForm={(form) => this.form = form}
          />
        </ Modal>
        <Modal
          visible={isShowAuth}
          title="设置角色权限"
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <AuthForm role={role} ref={this.auth} />
        </ Modal>
      </Card>
    );
  }
}

export default Role;