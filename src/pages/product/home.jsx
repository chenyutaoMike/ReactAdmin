import React, { Component } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message
} from 'antd';
import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api/index'
import { PAGE_SIZE } from '../../utils/constants'
/**
 * product的默认子路由组件
 */
const Option = Select.Option

class ProductHome extends Component {

  state = {
    total: 0, //商品的总数量
    products: [], //商品的数组
    loading: false,//是否加载中
    searchName: '', //搜索的关键字
    searchType: 'productDesc'  //搜索的类型
  }

  /**
   * 初始化表格列的数组
   */
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',

      },
      {
        title: '商品描述',
        dataIndex: 'desc',

      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price //当前指定了对应的属性，传入的是对应的属性值

      },
      {
        title: '状态',
        width: 100,
        // dataIndex: 'status',
        render: (product) => {
          const { status, _id } = product
          const newStatus = status === 1 ? 2 : 1
          return (
            <span>
              <Button
                type="primary"
                onClick={() => this.updataStatus(_id, newStatus)}
              >{status === 1 ? '下架' : '上架'}</Button>
              <span>{status === 1 ? '在售' : '以下架'}</span>
            </span>

          )
        }

      },
      {
        title: '操作',
        width: 100,
        render: (product) => (
          //将product对象使用state传递给目标路由组件 
          <span>
            <LinkButton onClick={() => this.props.history.push('/product/detail', { product })}>详情</LinkButton>
            <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>修改</LinkButton>
          </span>
        ),

      },
    ];
  }

  getProducts = async (pageNum) => {
    this.pageNum = pageNum  //保存pageNum，让其它方法可以看得到
    this.setState({
      loading: true
    })
    const { searchName, searchType } = this.state
    //如果搜索关键字有值，说明我们要做搜索分页
    let result
    if (searchName) {
      console.log('发送请求')
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
    } else {
      result = await reqProducts(pageNum, PAGE_SIZE)
    }
    console.log(result)
    this.setState({
      loading: false
    })
    if (result.status === 0) {
      const { total, list } = result.data
      //取出分页数据，更新状态，显示分页列表
      this.setState({
        total,
        products: list
      })
    }
  }

  /**
   * 更新指定商品的状态
   */
  updataStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status)
    if (result.status === 0) {
      message.success('更新商品成功')
      this.getProducts(this.pageNum)
    }
  }

  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getProducts('1')
  }

  render() {
    const { products, total, loading, searchName, searchType } = this.state



    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 150 }}
          onChange={value => this.setState({ searchType: value })}>
          <Option value='productName'>按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{ width: 150, margin: '0 15px' }}
          value={searchName}
          onChange={e => this.setState({ searchName: e.target.value })}
        />
        <Button type="primary" onClick={() => this.getProducts('1')}>搜索</Button>
      </span>
    )
    const extra = (
      <Button type="primary" onClick={() => this.props.history.push('/product/addupdate')}>
        <Icon type="plus"></Icon>
        添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          loading={loading}
          dataSource={products}
          columns={this.columns}
          rowKey="_id"
          bordered
          pagination={{
            current: this.pageNum,
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        />;
      </Card>
    );
  }
}

export default ProductHome;
