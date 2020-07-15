<template>
  <div class="home"
       id="home">
    <nav-bar title="标题"
             left-text="返回"
             right-text="按钮"
             left-arrow
             @click-left="onClickLeft"
             @click-right="onClickRight">
      <template #left>
        <Icon name="search"
              size="18" />
      </template>
      <template #right>
        <span class="iconfont icon-wode"></span>
      </template>
      <template #title>
        <span class="title">{{title}}</span>
      </template>
    </nav-bar>
    <swipe class="my-swipe"
           indicator-color="blue">
      <swipe-item>
        <grid>
          <grid-item v-for="(item,index) in swiperList1"
                     :key="index">
            <van-image width="0.84rem"
                       height="0.84rem"
                       fit="cover"
                       :src="'http://fuss10.elemecdn.com'+item.image_url"></van-image>
            <span>{{item.title}}</span>
          </grid-item>

        </grid>
      </swipe-item>
      <swipe-item>
        <grid>
          <grid-item v-for="(item,index) in swiperList2"
                     :key="index">
            <van-image width="0.84rem"
                       height="0.84rem"
                       fit="cover"
                       :src="'http://fuss10.elemecdn.com'+item.image_url"></van-image>
            <span>{{item.title}}</span>
          </grid-item>

        </grid>
      </swipe-item>
    </swipe>
    <ShopList :shopListArr="shopListArr" />
  </div>
</template>

<script>
import { NavBar, Icon, Swipe, SwipeItem, Grid, GridItem, Image } from 'vant'
import { getPosition, getBannerData, getListData } from "@/api/data"
import ShopList from '@/components/shopList'
export default {
  name: 'home',
  data () {
    return {
      title: '',
      swiperList1: [],
      swiperList2: [],
      shopListArr: []
    }
  },
  created () {
    getPosition().then((res) => {
      // console.log(res)
      this.title = res.name
    })
    getBannerData().then((res) => {
      // console.log(res)
      this.swiperList1 = res.slice(0, 8)
      this.swiperList2 = res.slice(8, 16)
    })
    getListData().then((res) => {
      console.log(res)
      this.shopListArr = res
    })
		/*  
			Promise.all异步请求，并行同时执行多个异步函数参数
			如：Promise.all([getPosition(), getBannerData(), getListData()]).then()
			
			也可以用async和await异步实现同步，如：
			async function test(){
			  let res = await ajax('www.baidu.com', params);
			  if(res){
			    // do something 实现同步请求
			  }
			}
			*/
  },
  components: { NavBar, Icon, Swipe, SwipeItem, Grid, GridItem, vanImage: Image, ShopList },
  methods: {
    onClickLeft () {

    },
    onClickRight () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 3.5rem;
  width: 6.5rem;
  background: skyblue;
}
.h1 {
  font-size: 1rem;
}
.van-nav-bar {
  background: #3190e8;
}
.van-icon {
  color: white;
}
.title {
  color: white;
}
.icon-wode {
  color: white;
}
.my-swipe {
  height: 3.4rem;
}
</style>
