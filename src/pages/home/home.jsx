import React, { Component } from 'react';
import {
  Icon,
  Card,
  Statistic,
  DatePicker,
  Timeline,
  Row,
  Col

} from 'antd'
import HomeLine from './line'
import HomeBar from './bar'
import './home.less'
import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';


class Home extends Component {
  state = {
    isActive: 1
  }
  handleChange = (num) => {
    this.setState({
      isActive: num
    })
  }
  render() {
    const { isActive } = this.state
    const title = (
      <div className="content-title">
        <span
          style={{ marginRight: 20 }}
          className={isActive === 1 ? "active" : ''}
          onClick={() => this.handleChange(1)}
        >访问量</span>
        <span
          className={isActive === 2 ? "active" : ''}
          onClick={() => this.handleChange(2)}
        >销售量</span>
      </div>
    )
    const extra = (
      <RangePicker
        defaultValue={[moment('2020/01/01', dateFormat), moment('2020/12/31', dateFormat)]}
        format={dateFormat}
      />
    )
    return (
      <div className="home">
        <Row gutter={16}>
          <Col span={12}>
            <Card
              className="home-card"
              style={{ width: 250 }}
              title="商品总量"
              extra={<Icon style={{ color: 'rgba(0,0,0,.45)' }} type="question-circle" />}
              headStyle={{ color: 'rgba(0,0,0,.45)' }}
            >
              <Statistic
                value={1128163}
                valueStyle={{ fontWeight: 'bolder' }}
                suffix="个"
              />
              <Statistic
                value='15'
                valueStyle={{ fontSize: 15 }}
                prefix="周同比"
                suffix={(<div> % <Icon style={{ color: 'red', marginLeft: 10 }} type="arrow-down" /></div>)}
              />
              <Statistic
                value='10'
                valueStyle={{ fontSize: 15 }}
                prefix="日同比"
                suffix={(<div> % <Icon style={{ color: '#3f8600', marginLeft: 10 }} type="arrow-up" /></div>)}
              />
            </Card>
          </Col>
          <Col span={12}>
            <HomeLine />
          </Col>
        </Row>
        <Card
          title={title}
          className="home-content"
          extra={extra}
        >
          <Row gutter={16}>
            <Col span={14} >
              <Card
                bordered
                title={isActive === 1 ? '访问趋势' : '销售趋势'}
                bodyStyle={{ padding: 0, height: 275 }}
                extra={<Icon type="reload" />}
              >
                <HomeBar />
              </Card>
            </Col>
            <Col span={8} offset={2}>
              <Card
                title='任务'
                extra={<Icon type="reload" />}
              >
                <Timeline>
                  <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                  <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                  <Timeline.Item color="red">
                    <p>联调接口</p>
                    <p>功能验收</p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <p>登录功能设计</p>
                    <p>权限验证</p>
                    <p>页面排版</p>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default Home;