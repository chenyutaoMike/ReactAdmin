import React, { Component } from 'react';
import { Button, message } from 'antd';

class App extends Component {
  handlClick = () =>{
    message.success('成功拉')
  }
  render() {
    return (
      <div className="App">
        <Button type="primary" onClick={this.handlClick}>Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
      </div>
    );
  }

}

export default App;
