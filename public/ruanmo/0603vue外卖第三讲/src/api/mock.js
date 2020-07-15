import Mock from 'mockjs'
import Position from './mockServer/position'
import BannerData from './mockServer/index'
import ListData from './mockServer/restaurant'
Mock.setup({
  timeout: 1000

})

Mock.mock('/api/getUser', {
  username: '@cname',
  "age|18-33": 18,
  genner: '男',
  content: '赶紧来软谋教育前端vip的课程 起飞'
})

Mock.mock('/api/getPosition', Position)
Mock.mock('/api/getBannerData', BannerData)
Mock.mock('/api/getListData', ListData)

// mock模块可以模拟数据

