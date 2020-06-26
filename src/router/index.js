import Vue from 'vue'
import VueRouter from 'vue-router'

import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'

import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'

import RatePF from '../views/评分/RatePF.vue'


Vue.use(VueRouter)

const routes = [
	/* 朝夕教育Ace直播-三次vue购物车
	【手机商城】
		搜索功能：使用回调函数：getProducts(fun) {
														if (fun != null) {
																fun();
														}
													}
		排序功能：综合、销量、浏览：
			1、使用sort函数排序、includes、filter等
			2、传递参数：
				a)、routerlink传参：<router-link :to="'/productDetail?pid='+product.id">
				b)、route接收：var pid = this.$route.query.pid;
			3、锚点：document.documentElement.scrollTop
		购物车：添加购物车
	 */
	/* {
    path: '/',
    name: 'productList',
    component: ProductList
  },
  {
    path: '/productDetail',
    name: 'productDetail',
    component: ProductDetail
  },
	{
	  path: '/shoppingCart',
	  name: 'shoppingCart',
	  component: ShoppingCart
	}, */


	/* 朝夕教育Ace直播-四次vue专题课
		实体搭建与指令讲解：基础，位置：public/Demo
		首页（朝夕集市网图片)：
			
		详情：
			qs使用
	 */
	/* {
	  path: '/',
	  name: 'home',
	  component: Home
	},
	{
	  path: '/detail',
	  name: 'detail',
	  component: Detail
	}, */


	//评分组件
	{
		path: '/',
		name: 'RatePF',
		component: RatePF
	}
]

const router = new VueRouter({
	routes
})

export default router
