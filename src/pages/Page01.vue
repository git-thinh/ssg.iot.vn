<script lang="ts" setup>
	//const config = useRuntimeConfig();	
	//const route = useRoute();
	//console.log('setup = ', route)

	// const url = 'http://data.iot.vn/static/article/info-tits.json';
	// const [{
	// 	data: site
	// }, {
	// 	data: cafe
	// }] = await Promise.all([
	// 	useFetch(url),
	// 	useFetch(url)
	// ])
</script>
<script lang="ts">
	export default {
		props: ['page', 'name'],
		emits: ['update:modelValue'],
		// async setup() {
		// 	const config = useRuntimeConfig();
		// 	const route = useRoute();
		// 	console.log('setup = ', route)

		// 	const url = 'http://data.iot.vn/static/article/info-tits.json';
		// 	const [{
		// 		data: site
		// 	}, {
		// 		data: cafe
		// 	}] = await Promise.all([
		// 		useFetch(url),
		// 		useFetch(url)
		// 	])

		// 	return {
		// 		site,
		// 		cafe
		// 	}
		// },
		// head() {
		// 	return {
		// 		//title: '.',
		// 	};
		// },
		render() {
			let name = this.name || '';
			console.log('INDEX.name = ', name);

			// //name = this.config.public.forClient 
			// name = this.config.API_BASE_URL
			// console.log('forClient = ', name);

			const c0 = resolveComponent('Header')
			const c1 = resolveComponent('Test01')
			const c2 = resolveComponent('Test02')

			console.log(c0);

			// //console.log(com)
			// // // use an array to return multiple root nodes
			// // return [
			// //   h('div'),
			// //   h('div'),
			// //   h('div')
			// // ]

			const n1 = h(c1, {
				name: '12345 ' + name,
				//site: {},

				// https://vuejs.org/guide/extras/render-function.html#v-model
				'onUpdate:modelValue': (vc) => {
					//this.$emit('update:modelValue', vc)
					//console.log('PageIndex = ', vc);
				}
			});

			const n2 = h(c2, {
				name: '789 ' + name,
				//site: {},
			});

			//return [n1, n2];
			//return h('h1', {}, 'Index - 12345');			
			return h('main', {}, [n1, n2]);
		}
	}
</script>
