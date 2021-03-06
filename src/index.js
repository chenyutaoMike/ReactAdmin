import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
import { Provider } from 'react-redux'

import store from './store'
//读取local中保存user,保存在内存中
memoryUtils.user = storageUtils.getUser()


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
