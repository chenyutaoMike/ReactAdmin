import React, { Component } from 'react';
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Modal
} from 'antd';
// 商品分类路由
import { reqCategorys, reqUpdataCategorys } from '../../api'
import LinkButton from '../../components/link-button'
import AddForm from './add-form'
import UpdateForm from './update-form'


class Category extends Component {

  state = {
    loading: false,  //是否正在获取数据中
    categorys: [], // 一级分类列表
    subCategorys: [], //二级分类列表
    parentId: '0', //当前需要显示的分类列表的父分类ID
    parentName: '', //当前需要显示的分类列表的父分类名称
    showStatus: 0, //标识添加/更新的确认框是否显示, 0:都不显示,1:显示添加,2:显示更新
  }

  /**
   * 响应点击取消:隐藏确定框
   * 
   */
  handleCancel = () => {
    //清除输入数据
    this.form.resetFields()
    this.setState({
      showStatus: 0
    })
  }
  /**
   * 显示添加的确认框
   */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  /**
   * 添加分类
   */
  addCategory = () => {

  }
  /**
  *  显示修改的确认框
  */
  showUpdate = (category) => {
    //保存分类对象
    this.category = category

    //更新状态
    this.setState({
      showStatus: 2
    })

  }
  /**
   * 更新分类
   */
  updateCategory = async () => {
    //1.隐藏确认框
    this.setState({
      showStatus: 0
    })
    //准备数据
    const categoryId = this.category._id
    const categoryName = this.form.getFieldValue('categoryName')
    //清除输入数据
    this.form.resetFields() 
    //2.发请求更新列表
  
    const result = await reqUpdataCategorys({ categoryId, categoryName })
    if (result.status === 0) {
      //3.重新显示列表
      this.getCategorys()
    }

  }

  //初始化Table所有列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',  //指定显示数据对应的属性名
      },
      {
        title: '操作',
        width: 300,   //指定宽度
        render: (category) => (   //指定返回需要显示的界面标签
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
            {/* 向事件回调函数传递参数:先定义一个匿名函数，在函数调用处理的函数传入参数 */}
            {/* 判断是否是二级列表，如果是二级列表就不显示 */}
            {
              this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null
            }

          </span>

        )
      },

    ];
  }
  /**
   * 异步获取一级/二级分类列表
   */
  getCategorys = async () => {

    //在发请求前，显示loading
    this.setState({ loading: true })
    const { parentId } = this.state
    //发异步ajax请求，获取数据
    const result = await reqCategorys(parentId)

    //请求完成后，隐藏loading
    this.setState({ loading: false })
    if (result.status === 0) {
      //取出分类数组(可能是以及也可能是二级的)
      const categorys = result.data
      //更新分类状态
      if (parentId === '0') {  //进入这里就代表更新一级的
        this.setState({ categorys })
      } else {    //进入这里就代表更新二级的
        this.setState({ subCategorys: categorys })
      }

    } else {
      message.error('获取分类列表失败')
    }
  }
  /**
   * 显示指定一级分类对象的二级子列表
   */
  showSubCategorys = (category) => {
    console.log(category)
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {  //在状态更新且重新render()后执行
      this.getCategorys()
    })
    //setState() 不能立即获取

  }
  /**
   * 显示一级分类列表
   */
  showCategorys = () => {
    //更新为显示一级列表的状态
    this.setState({
      subCategorys: [],
      parentId: '0',
      parentName: ''
    })
  }
  /**
   * 为第一次render()准备数据
   */
  componentWillMount() {
    //获取一级分类列表
    this.initColumns()
  }
  /**
   * 执行异步任务：发异步ajax请求
   */
  componentDidMount() {
    this.getCategorys()
  }
  render() {
    //读取状态数据
    const { categorys, loading, parentId, subCategorys, parentName, showStatus } = this.state
    const category = this.category || {} //如果还没有就指定一个空对象
    console.log(category)
    //card的左侧
    const title = parentId === 0 ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type="arrow-right" style={{ marginRight: '10px' }}></Icon>
        <span>{parentName}</span>
      </span>
    )
    //card的右侧
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type='plus'></Icon>
        添加
      </Button>
    )


    return (
      <Card title={title} extra={extra} style={{ width: '100%' }}>
        <Table
          dataSource={parentId === '0' ? categorys : subCategorys}
          columns={this.columns}
          bordered
          rowKey='_id'
          loading={loading}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />;
        <Modal
          visible={showStatus === 1}
          title="添加分类"
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm />

        </Modal>
        <Modal
          visible={showStatus === 2}
          title="更新分类"
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => this.form = form}
            // 保存子组件传递过来的form,并保存到this中
          />
        </Modal>
      </Card>
    );
  }
}

export default Category;