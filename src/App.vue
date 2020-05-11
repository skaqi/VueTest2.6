<template>
	<div id="app">
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
</style>
