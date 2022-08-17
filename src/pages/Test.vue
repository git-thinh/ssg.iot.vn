<script lang="ts" setup>	
	let page = {
		ok: false
	};

	const ssr =
		import.meta.env.SSR;
	if (ssr) {
		const context = useSSRContext()
		if (context) page = context.page;
	} else {
		page = window.__data__;
	}

	console.log('Index: page = ', page.ok)

	const count = ref(0)

	function click() {
		count.value++
	}

	let title = '';
	let path = '';
	if (page && page.titles && page.titles.length > 0) {
		title = page.titles[0]
		path = '/' + page.paths[0]
	}

	//useHead({ title: title })

	// const siteData = reactive({
	// 	title: `My website - ` + title,
	// 	description: `My beautiful website`,
	// })
	// useHead({
	// 	// Can be static or computed
	// 	title: computed(() => siteData.title),
	// 	meta: [{
	// 		name: `description`,
	// 		content: computed(() => siteData.description),
	// 	}, ],
	// })
</script>

<template>	
	<h1>Test - {{title}}</h1>
	<p>{{ count }}</p>
	<button @click="click">Click</button>
</template>
