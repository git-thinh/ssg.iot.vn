<script lang="ts">
	import Header from './components/Header.vue';
	
	export default defineComponent({
		//  render() {
		//  	//return h('h1', 'The quick brown fox...')
		// 	const f = compile('<li>The quick brown fox...</li>');
		// 	return f();
		// }
		
		setup() {
			return compile('<h3>Test: <Header/> </h3>')
		}
	})
</script>
