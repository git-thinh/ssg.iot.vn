<script setup lang="ts">
	let title = '';
	let path = '';

	const store = usePageStore()
	const page = store.page;
	
	if (page && page.titles.length > 0) {
		title = page.titles[0]
		path = '/' + page.paths[0]
	}

	useHead({
		title: title,
	})
</script>

<template>
	<h1>Test</h1>
	<a href="/">Home</a> |
	<a :href="path">{{title}}</a>
	<hr>
	<h3>Initial State:</h3>
	<pre>{{ page }}</pre>
</template>

<style>
	#app {
		padding: 4em 8em;
		font-family: sans-serif;
	}
</style>
