import type { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

const config: UserConfig = {
	plugins: [
		Vue({
			include: [/\.vue$/, /\.md$/],
		}),
		// https://github.com/antfu/unplugin-auto-import
		AutoImport({
			imports: [
				'vue',
				'vue-router',
				'vue/macros',
				'@vueuse/head',
				'@vueuse/core',
			],
			dts: 'src/auto-imports.d.ts',
			dirs: [
				//'src/composables',
				//'src/store',
			],
			vueTemplate: true,
		}),
	],
	ssgOptions: {
		script: 'async',
		formatting: 'prettify',
		includedRoutes(paths, routes) {
			// exclude all the route paths that contains 'foo'
			//return paths.filter(i => !i.includes('foo'))
			return ['/'];
		},
	},
}

export default config
