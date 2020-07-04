<template>
<div id="homePage">
    <aside>
        <div class="left-pad">
            <p class="left-title">推荐信息</p>
            <ul>
                <li v-for="supply in getSupplyByRecommend" :key="supply.id">
                    {{supply.supplyDemandTitle}}
                </li>
            </ul>
        </div>
        <div class="left-pad">
            <p class="left-title">搜索信息</p>
            <div class="search-pad">
                <p>输入关键字</p>
                <input type="text" v-model="searchText" placeholder="请输入需要搜索的关键字" />
                <button v-on:click="search()">搜索</button>
            </div>
        </div>
        <div class="left-pad">
            <p class="left-title">联系我们</p>
            <div class="contact-pad">
                <p>朝夕教育科技有限公司</p>
                <p>联系电话：18664876671</p>
                <p>QQ：2251610468</p>
                <p>微信号：zhaoxiNet007</p>
            </div>
        </div>
    </aside>
    <article v-show="showSearch == false">
        <div class="art-pad" v-for="type in types" :key="type.id">
            <p class="art-title">{{type.typeName}}</p>
            <ul>
                <li v-for="supply in getSupplysByTypeId(type.id)" :key="supply.id">
                    <router-link :to="'/detail?id='+supply.id">
                        {{supply.supplyDemandTitle}}
                    </router-link>

                </li>
            </ul>
        </div>

    </article>
    <article v-show="showSearch == true">
        <p class="art-title">搜索内容</p>
        <div class="back-all" v-on:click="backAll()" v-text="'<< 返回'"></div>
        <ul v-if="searchRes.length > 0 ">
            <li v-for="supply in searchRes" :key="supply.id">
                {{supply.supplyDemandTitle}}
            </li>
        </ul>
        <div v-else>
            您搜索的内容尚不存在
        </div>
    </article>

    <div class="clear-float"></div>
</div>
</template>

<script>
export default {
    data() {
        return {
            types: [],
            supplys: [],
            searchText: null,
            searchRes: [],
            showSearch: false,
        }
    },
    mounted() {
        this.getTypes();
        this.getSupplys();
    },
    methods: {
        getTypes() {
            var that = this;
            $.get("http://localhost:7330/Home/GetNavs", {}, function (res) {
                that.types = res;
            })
        },
        getSupplys() {
            var that = this;
            $.get("http://localhost:7330/Home/GetSupplys", {}, function (res) {
                that.supplys = res;
            })
        },
        search() {
            if (this.searchText == null) {
                layer.msg("您尚未输入内容");
            } else {
                this.searchRes = this.supplys.filter(m => m.supplyDemandTitle.includes(this.searchText));
                this.showSearch = true;
            }

        },
        backAll() {
            this.showSearch = false;
            this.searchText = null;
        }
    },
    computed: {
        getSupplyByRecommend() {
            return this.supplys.filter(m => m.isRecommend == true);
        },
        getSupplysByTypeId() {
            return function (typeId) {
                return this.supplys.filter(m => m.typeId == typeId);
            }
        }
    }
}
</script>

<style scoped>
#homePage {
    width: 1240px;
    margin: auto;
    background-color: #fff;
    padding: 0 20px;
}

#homePage aside {
    float: left;
    width: 300px;
    margin-top: 6px;
    border-left: 2px solid #134398;
    border-right: 2px solid #134398;
    border-bottom: 2px solid #134398;
    border-radius: 6px;
}

#homePage aside .left-pad p.left-title {
    background-color: #134398;
    color: #fff;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
}

#homePage aside ul li {
    padding: 2px 10px;
    list-style: none;
}

#homePage aside .search-pad p {
    padding-left: 6px;
    margin: 3px 10px !important;
}

#homePage aside .search-pad input {
    padding-left: 6px;
    margin: 3px 10px !important;
    border: 1px solid #ccc;
    width: 258px;
}

#homePage aside .search-pad .txt-none {
    border: 1px solid red;
}

#homePage aside .search-pad button {
    padding-left: 6px;
    margin: 3px 10px 16px 10px !important;
    width: 258px;
    background-color: #0094ff;
    border: 1px solid #0094ff;
    height: 30px;
    font-size: 13px;
    color: #fff;
}

#homePage aside .contact-pad p {
    margin: 3px 10px 3px 10px;
}

#homePage aside .contact-pad {
    padding-bottom: 10px;
}

#homePage .clear-float {
    clear: both;
}

#homePage article {
    float: left;
    margin-left: 0;
    width: 908px;
    margin-top: 6px;
}

#homePage article .art-pad {
    width: 440px;
    border: 2px solid #134398;
    height: 400px;
    float: left;
    margin-left: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
}

#homePage article .art-title {
    background-color: #134398;
    color: #fff;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
}

#homePage article ul li {
    list-style: none;
    padding: 6px 10px;
    cursor: pointer;
}

#homePage .back-all {
    font-size: 13px;
    padding: 12px;
    cursor: pointer;
}

#homePage .search-none {
    font-size: 13px;
    padding: 12px;
}
</style>
