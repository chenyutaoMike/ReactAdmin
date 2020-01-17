import React, { Component } from 'react';
import {
  Card,
  Form,
  Input,
  Cascader,
  Upload,
  Button,
  Icon
} from 'antd'
import LinkButton from '../../components/link-button';
const { Item } = Form
const { TextArea } = Input
/**
 * product的添加和更新的子路由组件
 */
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
];
class ProductAddUpdate extends Component {

  state = {
    options,
  }
  /**
   * 用于加载下一级列表的回调函数
   */
  loadData = selectedOptions => {
    //得到选择的option对象
    const targetOption = selectedOptions[0]
    //显示loding
    targetOption.loading = true

    //模拟发送请求列表并更新
    setTimeout(() => {
      //隐藏loding
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ]
      //更新 options状态
      this.setState({
        options: [...this.state.options],
      })
    }, 1000);
  }
  /**
   * 验证价格的自定义验证函数
   */
  validatePrice = (rule, value, callback) => {
    if (value * 1 > 1) {
      callback()
    } else {
      callback('价格必须大于0')
    }
  }
  submit = () => {
    //进行表单验证，如果通过了，才发送请求
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('GG思密达')
      }
    })
  }

  render() {
    //指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 2 },  //左侧label的宽度
      wrapperCol: { span: 8 }, //指定右侧包裹的宽度
    };

    const title = (
      <span>
        <LinkButton>
          <Icon type="arrow-left" style={{ fontSize: 20 }}></Icon>
        </LinkButton>
        <span>添加商品</span>
      </span>
    )
    const { getFieldDecorator } = this.props.form
    return (
      <Card title={title}>
        <Form {...formItemLayout} >
          <Item label='商品名称'>
            {
              getFieldDecorator('name', {
                initialValue: '',
                rules: [
                  { required: true, message: '必须输入商品名称' }
                ]
              })(<Input placeholder="商品名称" />)
            }

          </Item>
          <Item label='商品描述'>
            {
              getFieldDecorator('desc', {
                initialValue: '',
                rules: [
                  { required: true, message: '必须输入商品描述' }
                ]
              })(<TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }} />)
            }

          </Item>
          <Item label='商品价格'>
            {
              getFieldDecorator('price', {
                initialValue: '',
                rules: [
                  { required: true, message: '必须输入商品价格' },
                  { validator: this.validatePrice }
                ]
              })(<Input placeholder="商品名称" type='number' addonAfter="元" />)
            }

          </Item>
          <Item label='商品分类'>
            <Cascader
              options={this.state.options}  //需要显示的列表数据数组
              loadData={this.loadData} //当选择某个列表项目，加载下一级列表的监听回调
           
            />
          </Item>
          <Item label='商品图片'>
            <div>商品图片</div>
          </Item>
          <Item label='商品详情'>
            <div>商品详情</div>
          </Item>
          <Button type="primary" onClick={this.submit}>提交</Button>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(ProductAddUpdate);