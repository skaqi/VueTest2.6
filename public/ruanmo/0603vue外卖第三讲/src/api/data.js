
import axios from './axios'

export const getBanner = () => {
  return axios.request({
    url: 'getBanner',
    method: 'get'
  })
}

export const getUser = () => {
  return axios.request({
    url: 'getUser',
    method: 'get'
  })
}

export const getPosition = () => {

  return axios.request({
    url: 'getPosition',
    method: 'get'
  })
}

export const getBannerData = () => {
  return axios.request({
    url: 'getBannerData',
    method: 'get'
  })
}

// 获取首页列表的函数

export const getListData = () => {
  return axios.request({
    url: 'getListData',
    method: 'get'
  })
}