import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import {
  Form,
  Tree,
  Input
} from 'antd'
import menuList from '../../config/menuConfig'

const Item = Form.Item
const { TreeNode } = Tree;

class AuthForm extends PureComponent {

  static propTypes = {
    role: PropTypes.object
  }
  constructor(props) {
    super(props)
    //根据传入角色的menus生成初始状态
    const { menus } = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }


  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )

      return pre
    }, [])
  }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  //选中某个node时的回调
  onCheck = (checkedKeys, info) => {
    //点击的时候，checkedKeys拿到的是本次所有选择的项
    this.setState({
      checkedKeys
    })

  };
  /**
   * 为父组件提交获取最新menus数据的方法
   */
  getMenus = () => {
    return this.state.checkedKeys
  }


  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList)
  }
  //根据新传入的role来更新checkedKeys状态
  componentWillReceiveProps(nextProps) {
    const menus = nextProps.role.menus;
    this.setState({
      checkedKeys: menus
    })
  }

  render() {
    const { role } = this.props
    const { checkedKeys } = this.state
    const formItemLayout = {
      labelCol: { span: 4 },  //左侧label的宽度
      wrapperCol: { span: 18 }, //指定右侧包裹的宽度
    };
    return (
      <div>
        <Item label="角色名称"  {...formItemLayout}>
          <Input value={role.name} disabled></Input>
        </Item>
        <Item>
          <Tree
            checkable
            defaultExpandAll={true}
            checkedKeys={checkedKeys}
            onCheck={this.onCheck}
          >
            <TreeNode title="平台权限" key="all">
              {this.treeNodes}
            </TreeNode>
          </Tree>
        </Item>
      </div>
    );
  }
}

export default AuthForm;
