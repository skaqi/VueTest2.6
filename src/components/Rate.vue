<template>
	<div class="rate" :class="{'disabled':disabled}">
		<i v-for="i in 5" :key="i" class="iconfont" @mouseenter="disabled?'':curScore=i" @mouseleave="disabled?'':curScore=0"
		 @click="disabled?'':setScore(i)" :class="getClass(i)">
			<i v-show="i==Math.ceil(score)" class="iconfont icon-star " :style="'width:'+width"></i>
		</i>
		<span v-show="showText" class="text">{{score}}分</span>
	</div>
</template>

<script>
	export default {
		name: "RowTable",
		props: {
			disabled: {
				type: Boolean
			},
			showText: {
				type: Boolean
			},
			score: {
				type: Number
			}
		},
		mounted() {
			this.getWidth();
		},
		methods: {
			getClass(i) {
				if (this.curScore) {
					return i <= this.curScore ? "icon-star" : "icon-star-o"
				}
				return i <= this.curScore ? "icon-star" : "icon-star-o"
			},
			getWidth() {
				this.width = (this.score - Math.floor(this.score)) * 100 + "%"
			},
			setScore(i) {
				/*第一个问题:这里可以不用常规的emit事件接收,而在外面使用sync修饰符也可以直接改update:score更简便*/
				//this.$emit("set-score",i);
				this.$emit("update:score", i);

				/*第二问题:可能会异步出现问题,建议使用$nextTick异步处理,即可解决:没有及时的被重新计算宽度问题*/
				this.$nextTick(() => {
					this.getWidth();
				})
			}
		}
	}
</script>

<style>
	.iconfont {
		src: url(../../public/imgs/icons/Logo2.png)
	}
</style>
