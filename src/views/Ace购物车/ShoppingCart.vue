<template>
<div>
    <div class="header">
        <div class="head-pad">
            <div class="head-left">
                <i>
                </i>
            </div>
            <div class="head-center">
                购物车
            </div>
        </div>
    </div>
    <div class="shopping-list">
        <ul>
            <li v-for="shoppingCart in shoppingCarts" :key="shoppingCart.id">
                <div :class="['p-check',{'p-check-ed':isSelect(shoppingCart.id)}]" @click="selectProduct(shoppingCart.id)">√</div>
                <img :src="shoppingCart.productImage" alt="">
                <div class="p-info">
                    <p class="p-name">{{shoppingCart.productName}}</p>
                    <p class="p-price">&yen;{{shoppingCart.price}} <span>x{{shoppingCart.count}}</span> </p>
                </div>
            </li>

        </ul>
    </div>
    <div class="footer">
        <div class="foot-pad">
            <button>结算 <span>({{selectCart.length}})</span></button>
            <div class="total-price">
                总计：<b>{{totalPrice}}</b>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            shoppingCarts: [],
            totalPrice: 0,
            selectCart: [],
        }
    },
    mounted() {
        this.getShoppingCarts();
        alert(i);
    },
    methods: {
        getShoppingCarts() {
            var that = this;
            axios.get("http://localhost:1665/ShoppingCarts/GetShoppingCarts").then(function (res) {
                that.shoppingCarts = res.data;
                console.log(that.shoppingCarts);
            });
        },
        selectProduct(cid) {
            if (this.selectCart.includes(cid)) {
                for (let i = 0; i < this.selectCart.length; i++) {
                    const currCid = this.selectCart[i];
                    if (currCid == cid) {
                        this.selectCart.splice(i, 1);
                    }
                }
            } else {
                this.selectCart.push(cid);
            }

            this.getTotalPrice();
            var i = this.resTest();
            alert(i);
            console.log(this.selectCart)
        },
        isSelect(cid) {
						// includes包含用法
            return this.selectCart.includes(cid);
        },
        getTotalPrice() {
            var tPrice = 0;
            for (let i = 0; i < this.selectCart.length; i++) {
                const cid = this.selectCart[i];
                var cart = this.shoppingCarts.filter(m => m.id == cid)[0];
                tPrice += cart.price * cart.count;
            }
            this.totalPrice = tPrice.toFixed(2);
        },
        
    },

}
</script>

<style scoped>
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
    text-align: center;
    font-size: 14px;
    line-height: 45px;
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

.shopping-list {
    padding: 10px;
}

.shopping-list ul li {
    list-style: none;
    margin-bottom: 26px;
    height: 86px;
}

.shopping-list ul li img {
    float: left;
    width: 75px;
    height: 75px;
    margin-left: 6px;
    margin-right: 10px;
}

.shopping-list ul li .p-info {
    float: left;
    width: 66%;
    min-width: 50%;
    font-size: 14px;
}

.shopping-list ul li .p-info .p-price {
    color: crimson;
    font-size: 16px;
    margin-top: 6px;

}

.shopping-list ul li .p-info .p-price span {
    font-size: 12px;
    color: #999;
}

.shopping-list ul li .p-check {
    float: left;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #fff;
    border-radius: 10px;
    height: 20px;
    width: 20px;
    margin-top: 25px;
    text-align: center;
    line-height: 25px;
    font-size: 12px;
}

.shopping-list ul li .p-check-ed {
    background-color: crimson;
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
    border-top: 1px solid #e5e5e5;
}

.footer .foot-pad button {
    float: right;
    height: 51px;
    width: 33%;
    border: 0 none;
    color: #fff;
    margin-top: -1px;
    background-color: coral;
    font-size: 16px;
}

.footer .foot-pad button span {
    font-size: 12px;
}

.footer .foot-pad .total-price {
    width: 33%;
    background-color: #fff;
    float: right;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
}

.footer .foot-pad .total-price b {
    color: crimson;
}
</style>
