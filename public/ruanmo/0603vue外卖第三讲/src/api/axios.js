import axios from 'axios'
// baseUrl 往往根据开发 和 线上环境的不同
import config from '@/config'
// 怎么取出开发环境
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  getHeaderConfig () {
    return {
      baseURL: this.baseUrl
    }
  }
  interceptor (instance) {
    instance.interceptors.request.use((config) => {
      console.log('拦截处理的请求')
      config.data = {
        header: '头部'
      }
      return config
    })
    instance.interceptors.response.use((res) => {
      console.log('拦截响应的请求')
      return res.data
    }, (error) => {
      console.log(error)
      return {
        error: '网路请求错误'
      }
    })
  }
  request (options) {
    // 参数取出来
    options = { ...this.getHeaderConfig(), ...options } // 用了ES6解构写法进行合并参数
    // 做拦截的操作
    const instance = axios.create()
    this.interceptor(instance)
    return instance(options)
  }
}

export default new HttpRequest(baseUrl)