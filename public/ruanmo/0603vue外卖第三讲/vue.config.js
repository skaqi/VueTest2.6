module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4000',
        pathRewrite: {
          // 这里要和后端结合起来 后端的路径是以api开头的话 就不需要下下面的了 如果没有 则需要把前端带过去的api替换成空
          '^/api': ''
        }
      }
    }
  }
}

// 跨域时前端用配置文件中的proxy代理转发！！！