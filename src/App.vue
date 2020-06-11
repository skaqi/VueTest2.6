<!-- <template>
	<div id="app">
		test
		<img alt="Vue logo" src="./assets/logo.png">{{test}}
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
	import HelloWorld from './components/HelloWorld.vue'

	export default {
		name: 'app',
		data() {
			return {
				test: process.env.VUE_APP_NAME
			}
		},
		components: {
			HelloWorld
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style> -->



<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
</style>



