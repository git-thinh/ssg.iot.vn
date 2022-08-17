<route>{name:"Index", layout:"Default", meta:{requiresAuth: false}}</route>

<script lang="ts" setup>
	let page = {};
	//const context = useSSRContext()
	//if(context) page = context.page;
	//console.log('Index.useSSRContext: page = ', page)

	const count = ref(0)

	function click() {
		count.value++
	}

	// const context = useSSRContext()
	// console.log('SETUP_INDEX = ', context.data)
</script>

<template>
	<h1>Index Test</h1>
	<p>{{ count }}</p>
	<button @click="click">Click</button>
</template>


