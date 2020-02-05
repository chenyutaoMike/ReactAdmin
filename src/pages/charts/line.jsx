import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import {
  Card,
  Button,
} from 'antd'
export class Line extends Component {

  state = {
    sales: [5, 20, 36, 10, 10, 20],  //销量的数组
    stores: [6, 25, 16, 20, 30, 10]  //库存的数组
  }

  /**
   * 更新数据
   */
  update = () => {
    this.setState(state => ({
      sales: state.sales.map(sale => sale + 1),
      stores: state.stores.reduce((pre, store) => {
        pre.push(store - 1)
        return pre
      }, [])
    }))
  }

  /**
   * 返回柱状图的对象配置
   */
  getOption = (sales, stores) => {
    return {
      title: {
        text: '异步数据加载示例'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'line',
          data: sales
        },
        {
          name: '库存',
          type: 'line',
          data: stores
        }
      ]
    }
  }
  render() {
    const { sales, stores } = this.state
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.update}>更新</Button>
        </Card>
        <Card title="柱状图一">
          <ReactEcharts option={this.getOption(sales, stores)} />
        </Card>
      </div>
    );
  }
}

export default Line;
