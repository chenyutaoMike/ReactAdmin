import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Form,
  Select,
  Input
} from 'antd'
const Item = Form.Item
const Option = Select.Option
/**
 * 添加分类的form组件
 */
class AddForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired, //用来传递form对象的函数
    categorys: PropTypes.array.isRequired, //一级分类数组
    parendtId: PropTypes.string.isRequired  //父分类ID
  }
  componentWillMount() {
    this.props.setForm(this.props.form)
  }
  render() {
    const { categorys, parendtId } = this.props
    const { getFieldDecorator } = this.props.form
    console.log(parendtId)
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('parendtId', {
              initialValue: parendtId
            })(
              <Select>
                <Option value="0">一级分类</Option>
                {
                  categorys.map(item => <Option value={item._id} key={item._id}>{item.name}</Option>)
                }
              </Select>
            )
          }

        </Item>
        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: '',
              rules: [
                { required: true, message: '分类名称必须输入' }
              ]
            })(
              <Input placeholder="请输入分类名称"></Input>
            )
          }
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
