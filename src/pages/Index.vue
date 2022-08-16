<script lang="ts" setup>
	const context = useSSRContext()
	console.log('Index: useSSRContext = ', context)
	
	const count = ref(0)

	function click() {
		count.value++
	}

	// const context = useSSRContext()
	// console.log('SETUP_INDEX = ', context.data)
</script>

<template>
	<h1>Home</h1>
	<p>{{ count }}</p>
	<button @click="click">Click</button>
</template>
