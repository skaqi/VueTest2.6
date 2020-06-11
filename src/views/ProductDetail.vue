<template>
<div id="productDetailPage">
    <div class="header">
        <div class="head-pad">
            <div class="head-left">
                <i>
                </i>
            </div>
            <div class="head-center">
                <span @click="toPosition(1)">商品</span>
                <span @click="toPosition(2)">规格</span>
                <span @click="toPosition(3)">详情</span>
            </div>
        </div>
    </div>
    <div class="product-info">
        <p class="p-img">
            <img :src="product.productImage" alt="">
        </p>
        <p class="p-name">{{product.productName}} {{selectSize}}</p>
        <p class="p-decoration">{{product.decoration}}</p>
        <p class="p-price">&yen;<b>{{product.price}}</b></p>
        <p class="p-org-price">原价：&yen;{{product.orgPrice}}</p>
    </div>

    <div class="product-prop">
        <div class="prop-item">
            <h3>尺寸</h3>
            <ul>
                <li v-for="size in sizeList" :key="size" @click="selectSize = size" :class="{'prop-sel':selectSize == size}">{{size}}</li>
            </ul>
            <div style="clear:both"></div>
        </div>
        <div class="prop-item">
            <h3>数量</h3>
            <div class="sale-num">
                <span @click="subNum()">-</span>
                <input type="text" :value="buyNum" @change="changeNum($event)">
                <span @click="addNum()">+</span>
            </div>
            <div style="clear:both"></div>
        </div>
    </div>
    <div class="product-noti" id="productNoti">
        <h3>商品介绍</h3>
    </div>
    <div class="footer">
        <div class="foot-pad">
            <button class="buy-now">立即购买</button>
            <button class="add-cart" @click="addCart()">加入购物车</button>
            <button class="in-cart">
                <i></i>
                <span>购物车</span>
            </button>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            product: {},
            sizeList: [],
            selectSize: null,
            buyNum: 1,
        }
    },
    mounted() {
        this.getProductById();
    },
    methods: {
        getProductById() {
            var pid = this.$route.query.pid;
            var that = this;
            axios.get("http://localhost:1665/Products/GetProductById", {
                params: {
                    pid: pid
                }
            }).then(function (res) {
                that.product = res.data;
                that.sizeList = that.product.size.split(",");
                that.selectSize = that.sizeList[0];
                console.log(that.sizeList);
            });

        },
        subNum() {
            if (this.buyNum > 1) {
                this.buyNum--;
            }
        },
        addNum() {
            this.buyNum++;
        },
        changeNum(e) {
            //判断非数字 isNAN is:是不是 NA:不是/非 N:数字
            //console.log(event.target);
            var currNum = e.currentTarget.value;
            if (!isNaN(currNum) && currNum >= 1) {
                this.buyNum = currNum;
            } else {
                e.currentTarget.value = this.buyNum;
            }
        },
        toPosition(index) {
            switch (index) {
                case 1:
                    document.querySelector("#productDetailPage").scrollIntoView();
                    break;
                case 2:
                    document.documentElement.scrollTop = document.querySelector(".product-prop").offsetTop-45;
                    break;
                case 3:
                     document.documentElement.scrollTop = document.querySelector("#productNoti").offsetTop-45;
                    break;
                default:
                    break;
            }
        },
        addCart(){
            var that = this;
            var psotData = new URLSearchParams()
            psotData.append("pid",this.product.id);
            psotData.append("pName",this.product.productName);
            psotData.append("pImg",this.product.productImage);
            psotData.append("props",this.selectSize);
            psotData.append("count",this.buyNum);
            axios.post("http://localhost:1665/ShoppingCarts/AddCart",psotData).then(function(res){
               if (res.data == "success") {
                   that.$router.push("/shoppingCart");
               }
            });
        }
    }
}
</script>

<style scoped>
a {
    color: #333;
    text-decoration: none;
}

#productDetailPage {
    background-color: #e8e8ed;
}

.header {
    background-color: #fff;
    height: 45px;
}

.header .head-pad {
    background-color: #fff;
    height: 45px;
    border-bottom: 1px #e5e5e5 solid;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 5;
}

.header .head-pad .head-left {
    position: absolute;
    width: 45px;
    height: 45px;
    text-align: left;
    left: 0;
}

.header .head-pad .head-left i {
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzRCQTEyN0IzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzRCQTEyN0MzOTcwMTFFODk1OEZCOEVCMEE2QUU1NkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NEJBMTI3OTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NEJBMTI3QTM5NzAxMUU4OTU4RkI4RUIwQTZBRTU2RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PulQWg8AAAF/SURBVHja7Ni9SsRAEAfwnd1wldiIlqK1td4LiL7CFQaFCHZWgmVqH+GK4FejryA+gPcA9vZ2YnVkd5yAcBLOYJKZ3UWyRbIchPsxSzb/HUBEFfPQKvIxAP89MGn7wPHpuTLOtXoGMdl1WF4rUBug9cX25tpdnufRVHBssXxGhTu0Y6yjs1P6bRTLEo9Lp56ohquLasKcbk5sifvgAMBRRc5oWoau4FIcfRJOaPoQ+i1uwt2H3mZYcdxAdhwnUATHBRTDcQBFcX2B4rg+QC+4rsA9X7gunzpQ1j7S3QuudQWz7HKFjjBbNXNR4QhaYcMCi+LqkwxvtbSX0SWNJVGjAZhQ1T4W8Qk11e2GpkexRP5ZotVBHUmXWwlk122mCZnGAPwV+b3caQxAL0iOsCCK5IpbYkjOwCqC5I787EiJQxMrUurY2YScxNI8Woq0qKZtUpR062NmQB/+RALgqM3/+mgevRhI9imMvVIcewdtqtbH/M8BdOhRD8DA40uAAQDL2thNJDxLvAAAAABJRU5ErkJggg==") no-repeat 50%;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 12px 0 0 12px;
    background-position: 0 0;
    background-size: contain;
}

.header .head-pad .head-center {
    height: 45px;
    margin: 0 52px;
}

.header .head-pad .head-center span {
    float: left;
    width: 33%;
    display: inline-bloak;
    height: 45px;
    text-align: center;
    line-height: 45px;
    font-size: 14px;
}

.header .head-pad .head-center .txt-search {
    background: #f7f7f7;
    height: 30px;
    border: 0;
    width: 100%;
    border-radius: 15px;
    box-sizing: border-box;
    padding-left: 36px;
    position: relative;
    margin-top: 8px;
    outline: none;
}

.header .head-pad .head-right {
    position: absolute;
    width: 45px;
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    text-align: left;
    right: 0;
    top: 0;
}

.product-info {
    background-color: #f7f7f7;
    padding-bottom: 10px;
}

.product-info img {
    height: 366px;
    width: 80%;
    margin-left: 10%;
    margin-top: 10px;
}

.product-info .p-img {
    width: 100%;
    height: 388px;
    background-color: #fff;
}

.product-info .p-name {
    padding: 10px;
}

.product-info .p-decoration {
    font-size: 12px;
    color: rgb(218, 0, 0);
    padding: 0 10px;
}

.product-info .p-price {
    padding: 10px 0 10px 10px;
    font-size: 12px;
    color: rgb(218, 0, 0);
}

.product-info .p-price b {
    font-size: 16px;
}

.product-info .p-org-price {
    font-size: 12px;
    color: #999;
    padding: 0 10px;
    text-decoration: line-through;
}

.product-prop {
    margin-top: 10px;
    background-color: #f7f7f7;
    padding: 10px;

}

.product-prop .prop-item {
    position: relative;
    margin-top: 10px;
}

.product-prop .prop-item h3 {
    float: left;
    font-size: 14px;
    font-weight: normal;
    position: absolute;
    left: 0px;
    top: 3px;
    color: #999
}

.product-prop .prop-item ul {
    float: left;
    list-style: none;
    padding-left: 30px;
}

.product-prop .prop-item ul li {
    float: left;
    margin-left: 10px;
    border: 1px solid #eee;
    background-color: #fff;
    padding: 5px 10px 4px;
    text-align: center;
    color: #666;
}

.product-prop .prop-item ul li.prop-sel {
    border: 1px crimson solid;
    color: crimson;
}

.product-prop .prop-item .sale-num {
    float: left;
    list-style: none;
    padding-left: 30px;
    margin-left: 10px;
}

.product-prop .prop-item .sale-num input[type=text] {
    width: 36px;
    height: 22px;
    outline: none;
    border: 1px solid #ccc;
    border-right: 0 none;
    border-left: 0 none;
    float: left;
    text-align: center;
    color: #666;
}

.product-prop .prop-item .sale-num span {
    float: left;
    width: 22px;
    height: 22px;
    border: 1px solid #ccc;
    display: inline-block;
    text-align: center;
    line-height: 22px;
    color: #666;
    background-color: #fff;
}

.product-noti {
    margin-top: 10px;
    background-color: #f7f7f7;
    padding: 10px;
    height: 600px;
}

.product-noti h3 {
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    padding: 0;
}

.footer {
    height: 50px;
    width: 100%;
}

.footer .foot-pad {
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
}

.footer .foot-pad button {
    float: right;
    height: 50px;
    width: 33%;
    border: 0 none;
    color: #fff;
    font-size: 14px;
}

.footer .foot-pad .add-cart {
    background-color: rgb(255, 136, 0);
}

.footer .foot-pad .buy-now {
    background-color: rgb(228, 0, 0);
}

.footer .foot-pad .in-cart {
    width: 33%;
    background-color: #fff;
}

.footer .foot-pad .in-cart i {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURUdwTGZmZmpqamZmZmdnZ2ZmZmZmZmZmZmZmZmZmZmZmZkpWnhIAAAAKdFJOUwDpHqZGaoS60pfVa5fYAAAA+UlEQVQoz5WSKRPCMBSEQ2i5FIeLgsGhAIlCoKrAMVXVVWgUAw6FRlHoAfsraZMUkjTDDE807TdNdt++kBDZkJjFgEsFhkC3AomDexUSllhg+LDASWSBLRh1zKFrwlcOqQm5BtONhmnx3OtGPW7xGmvQ559+qsEF3+hlGjzfLO5FQB2oiVLsREtLBbqYFksTawW2ERRLQ8te/uLioMCaOMzBTU1SyFJtIB6kM3Ug/lP2oPa5l/0tMnW4STn7j1G6KQUmWvBB2YQxIV7bLzstyd817s2l+GxQZksZIvE+AvoS1nOBqWhDXgWe1kreXBZ70S9o3W4VMi29AabPf4enbQFkAAAAAElFTkSuQmCC) 50% no-repeat;
    position: relative;
    display: block;
    width: 20px;
    height: 26px;
    margin: 5px auto 0;
    background-size: auto 20px !important;
}

.footer .foot-pad .in-cart span {
    color: #666;
    font-size: 12px;
}
</style>
