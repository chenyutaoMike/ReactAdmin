const { override, fixBabelImports , addLessLoader} = require('customize-cra');
module.exports = override( 
  //针对antd实现按需打包: 根据import来打包(使用babel-plugin-import这个插件进行的)
  fixBabelImports('import', { 
    libraryName: 'antd', 
    libraryDirectory: 'es', 
    style: true, 
  }), 
  addLessLoader({ 
    javascriptEnabled: true,
     modifyVars: {'@primary-color': '#1DA57A'},
     }),
);


