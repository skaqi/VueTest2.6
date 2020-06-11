<template>
<div id="productListPage">
    <div class="header">
        <div class="head-pad">
            <div class="head-left">
                <i>
                </i>
            </div>
            <div class="head-center">
                <i></i>
                <input type="text" class="txt-search" placeholder="点击搜索" v-model="searchText">
            </div>
            <div class="head-right" @click="search()">
                <span>搜索</span>
            </div>

        </div>
    </div>
    <div class="filter">
        <div class="filter-pad">
            <div class="filter-item" @click="compre()" :class="{'filter-select':sortIndex == 1}">
                <span>综合</span>
            </div>
            <div class="filter-item" @click="saleTimes()" :class="{'filter-select':sortIndex == 2}">
                <span>销量</span>
            </div>
            <div class="filter-item" @click="browseTimes()" :class="{'filter-select':sortIndex == 3}">
                <span>浏览</span>
            </div>
        </div>
    </div>
    <div class="products">
        <ul>
            <li v-for="product in productList" :key="product.id">
                <router-link :to="'/productDetail?pid='+product.id">
                    <img :src="product.productImage" alt="">
                    <p class="p-name">{{product.productName}}</p>
                    <p class="p-price">&yen;<b>{{product.price}}</b></p>
                </router-link>
            </li>
        </ul>
        <div class="clear-tag"></div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            productList: [],
            sortIndex: 1,
            searchText: null
        }
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        getProducts(fun) {
            var that = this;
            axios.get("http://localhost:1665/Products/GetProducts").then(function (res) {
                that.productList = res.data;
                that.productList.forEach(m => {
                    m["compre"] = m.saleTimes * 1.5 + m.clickTimes
                })
                if (fun != null) {
                    fun();
                }
                console.log(that.productList);
            })
        },
        compre() {
            this.sortIndex = 1;
            this.productList.sort((a, b) => {
                //return (b.saleTimes*1.5+b.clickTimes) - (a.saleTimes*1.5+a.clickTimes);
                return b.compre - a.compre;
            });
        },
        saleTimes() {
            this.sortIndex = 2;
            this.productList.sort((a, b) => {
                return b.saleTimes - a.saleTimes;
            });
        },
        browseTimes() {
            this.sortIndex = 3;
            this.productList.sort((a, b) => {
                return b.clickTimes - a.clickTimes;
            });
        },

        search() {
            var that = this;
            //var searchText = document.querySelector(".txt-search").value;
            this.getProducts(function () {
                if (that.searchText != null && that.searchText != "") {
                    that.productList = that.productList.filter(m => m.productName.includes(that.searchText));
                }
            });
        }
    }
}
</script>

<style scoped>
a{
    color:#333;
    text-decoration: none;
}
.header {
    height: 45px;
}

.header .head-pad {
    height: 45px;
    border-bottom: 1px #e5e5e5 solid;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
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

.header .head-pad .head-center i {
    display: block;
    background: url("/img/icons/sprites.png");
    background-position: -80px 0;
    background-size: 200px;
    width: 18px;
    height: 16px;
    position: absolute;
    z-index: 2;
    top: 16px;
    left: 60px;
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
    text-align: left;
    right: 0;
    top: 0;
    line-height: 45px;
    font-size: 14px;
}

.filter {
    height: 42px;
    line-height: 42px;
    font-size: 14px;
}

.filter .filter-pad {
    background-color: #fff;
    position: fixed;
    left: 0;
    top: 45px;
    width: 100%;
    border-bottom: 1px #e5e5e5 solid;
}

.filter .filter-pad .filter-item {
    float: left;
    width: 33%;
    height: 42px;
    text-align: center;
}

.filter .filter-pad .filter-select {
    color: red;
}

.products {
    background-color: #eee;
}

.products ul {
    list-style: none;

}

.products ul li {
    float: left;
    width: 48%;
    background-color: #fff;
    margin: 0 5px 5px 0;
}

.products ul li img {
    width: 100%;
}

.products ul li .p-name {
    font-size: 14px;
    padding: 3px 10px;
    overflow: hidden;
    height: 20px;
}

.products ul li .p-price {
    padding: 3px 10px;
    color: rgb(188, 0, 0);
    font-size: 12px;
}

.products ul li .p-price b {
    font-size: 15px;
}

.clear-tag {
    clear: both;
}

.right-pad {
    position: fixed;
    /* right: -85%; */
    right: 0;
    top: 0;
    width: 85%;
    height: 100%;
    background-color: #f7f7f7;
    z-index: 103;
    transition: 580ms;
    z-index: 101;
}

.right-pad ul {
    list-style: none;
}

.right-pad .f-type-list>li {
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;
}

.right-pad .f-type-list>li p {
    font-size: 14px;
}

.right-pad .f-item-list>li {
    float: left;
    margin: 10px 10px 0 0;
    background: #eee;
    padding: 5px 0;
    width: 29.9%;
    text-align: center;
    border-radius: 6px;
    font-size: 14px;
}

.cover {
    background-color: rgba(0, 0, 0, 0.36);
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}
</style>
