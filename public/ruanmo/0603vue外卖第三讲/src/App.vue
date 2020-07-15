<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
// 整合了Vant组件（NavBar, Icon, Swipe, SwipeItem, Grid, GridItem, Image）、Loading和评星组件
import Home from './pages/home'

export default {
  name: 'App',
  components: {
    Home
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
}
</style>
