<template>
<div>
<h2>{{supply.supplyDemandTitle}}</h2>
<pre>
    {{supply.supplyDemandDetail}}
</pre>
</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
export default {
    data() {
        return {
            supply:{},
        }
    },
    mounted() {
        this.getSupplyById();
    },
    methods: {
        getSupplyById() {
            var sid = this.$route.query.id;
            // axios.get("http://localhost:7330/Home/GetSupplyById/",{params:{id:sid}}).then(function(res){
            //     console.log(res);
            //     console.log(res.data);
            // })
            $.post("http://localhost:7330/Home/GetSupplyById/",{id:sid},function(){
                console.log(this);
            });

            //var postData = `id=${sid}`;
            //var postData = "id="+sid;
            // var postData = new URLSearchParams();
            // postData.append("id",sid);
            var that = this;
            axios.post("http://localhost:7330/Home/GetSupplyById/", qs.stringify({id:sid})).then(function(res){
                
                that.supply = res.data;
            })
            //  axios.post("http://localhost:7330/Home/GetSupplyById/", qs.stringify({id:sid})).then(res =>{
            //     this.supply = res.data;
            // })
        }
    }
}
</script>

<style scoped>
div{
width: 1200px;
margin: auto;
}
h2{
    margin: 20px;
    text-align: center;
    font-size: 18px;
}

</style>
