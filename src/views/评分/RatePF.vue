<template>
	<div class="box">
		<h2>评分</h2>
		只读,不显示数字:
		<rate :score="1.3" :disabled="disabled" :showText="false" />
		只读,显示数字:
		<rate :score="2.4" :disabled="disabled" :showText="true" />
		鼠标点击评分,并显示数字:
		<rate :score.sync="score" :disabled="false" @set-score="setScore" :showText="showText" /><!-- :score.sync="score" 与 @set-score="setScore" 实现的效果是一样的 -->
	</div>
	</div>
</template>

<script>
	import Rate from '../../components/Rate'
	export default {
		name: "RowTable",
		components: {
			Rate
		},
		data() {
			return {
				score: 1.6,
				curScore: 0,
				disabled: true,
				showText: true,
			}
		},
		methods: {
			setScore(i) {
				this.score = i;
			}
		}
	}
</script>

<style>
</style>
