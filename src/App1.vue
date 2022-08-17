<template>
	<RouterView :name="'789'" />
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ''
			}
		},
		created() {
			console.log('APP.created: name = ', this.name)
		}
	}
</script>
