<script setup lang="ts">
	import {
		useHead
	} from '@vueuse/head'
	import {
		usePageStore
	} from './store/page'

	useHead({
		title: 'Hello World',
	})

	const store = usePageStore()
</script>

<template>
	<h2>Hello World</h2>
	<a href="/">Home</a> | 
	<a href="/1-bac-si-cap-cuu-an-giang-dang-dieu-tri-100-benh-nhan-covid-19-169211210120133908">
		1 bác sĩ cấp cứu An Giang đang điều trị 100 bệnh nhân COVID-19
	</a>
	<hr>
	<h3>Initial State:</h3>
	<pre>{{ store }}</pre>
</template>

<style>
	#app {
		padding: 4em 8em;
		font-family: sans-serif;
	}
</style>
