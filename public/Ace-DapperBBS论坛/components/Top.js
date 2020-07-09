Vue.component("top",{
    template:`
     <div id="header">
         <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3689032668,2645360714&fm=11&gp=0.jpg" alt="">
         <div class="user-login" v-if="username == '' || username == null ">
             <span @click="showLoginPad">登录</span>
             <span>注册</span>
         </div>
         <div class="user-login" v-else>
             <span>{{username}}</span>
             <span>注销</span>
         </div>
     </div>
    `,
    props:["username"],
    methods: {
        showLoginPad(){
            this.$emit("showloginpad",true);
        }
    },
 })
 // 常规的：props接收、emit发射