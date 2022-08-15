import type { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

const config: UserConfig = {
	plugins: [
		Vue({
			include: [/\.vue$/, /\.md$/],
		}),

		// https://github.com/antfu/unplugin-auto-import
		AutoImport({
			imports: [
				'vue',
				//'vue-router',
				'vue/macros',
				'@vueuse/head',
				'@vueuse/core',
				//'@vueuse/sound',
				{
					'vue-router': ['useRoute', 'useRouter', 'onBeforeRouteLeave', 'onBeforeRouteUpdate'],
					
					// '@vueuse/core': [
					// 	// https://vueuse.org/guide/
					// 	// import { useMouse } from '@vueuse/core',
					// 	'useScriptTag',//https://vueuse.org/core/useScriptTag/
					// 	'useNetwork', 'useOnline',
					// 	'useClipboard',
					// 	'useFullscreen', //https://vueuse.org/core/useFullscreen/#demo
					// 	'useObjectUrl', //https://vueuse.org/core/useObjectUrl/#usage
					// 	'useFileDialog', //https://vueuse.org/core/useFileDialog/#demo
					// 	'useFileSystemAccess', //https://vueuse.org/core/useFileSystemAccess/#demo
					// 	'useEyeDropper', //https://vueuse.org/core/useEyeDropper/#component-usage
					// 	'useCssVar', 'useDark', 'useToggle', 'useMouse', 'onClickOutside', 'useConfirmDialog',
					// 	'useMediaControls', //https://vueuse.org/core/useMediaControls/
					// 	'useImage', 'useInfiniteScroll', 'useMouseInElement',
					// 	'useElementVisibility', 'useDocumentVisibility',
					// 	'useDevicesList', 'useUserMedia', 'useSpeechRecognition', 'useSpeechSynthesis',
					// 	// alias
					// 	['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
					// ],
					// '@vueuse/sound': ['useSound'], //import { useSound } from '@vueuse/sound'

					//'vue': ['defineComponent', 'computed'],
					//'~store/user': ['useUserStore'] 

					// 'axios': [['default', 'axios']], //// import { default as axios } from 'axios',
					// 'vue-request': ['useRequest', 'usePagination'],

					// //'^/type/speech-types': ['__postApi'],

					// '♥/setup/AppSetup': ['AppSetup'],

					// '^/mixin/GlobalFunction': ['__getWindow', '__postApi'],
					// '^/mixin/MixLayout': ['MixLayout'],
					// '^/mixin/MixPage': ['MixPage'],
					// '^/mixin/MixComponent': ['MixComponent'],

					'./store/page': ['usePageStore'], //import { usePageStore } from './store/page'
				},
				// '[package-name]': [
				// 	 '[import-names]',
				// 	 ['[from]', '[alias]'],
				// ],

			],
			dts: 'src/auto-imports.d.ts',
			dirs: [
				//'src/composables',
				//'src/store',
			],
			vueTemplate: true,
		}),

		// https://github.com/antfu/unplugin-vue-components
		Components({
			// relative paths to the directory to search for components.
			dirs: [
				`src/test`,
				//`src/${_projectCode}/components`,
				//`src/${_projectCode}/contents`,
				//__pathRuntimeShared,
				//__pathRuntimeProject,
			],

			// search for subdirectories
			deep: true,
			// resolvers for custom components
			resolvers: [],

			// generate `components.d.ts` global declarations,
			// also accepts a path for custom filename
			// default: `true` if package typescript is installed
			dts: false,

			// Allow subdirectories as namespace prefix for components.
			directoryAsNamespace: false,
			// Subdirectory paths for ignoring namespace prefixes
			// works when `directoryAsNamespace: true`
			globalNamespaces: [],

			// auto import for directives
			// default: `true` for Vue 3, `false` for Vue 2
			// Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
			// To install Babel, run: `npm install -D @babel/parser`
			directives: true,

			// Transform path before resolving
			//importPathTransform: v => v,

			// Allow for components to override other components with the same name
			allowOverrides: false,

			// valid file extensions for components.
			extensions: ['vue'],
			// filters for transforming targets
			include: [/\.vue$/, /\.vue\?vue/],
			exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
		}),

	],
	ssgOptions: {
		script: 'async',
		formatting: 'prettify',
		includedRoutes(paths, routes) {
			// exclude all the route paths that contains 'foo'
			//return paths.filter(i => !i.includes('foo'))
			return ['/', '/1-bac-si-cap-cuu-an-giang-dang-dieu-tri-100-benh-nhan-covid-19-169211210120133908'];
		},
	},
}

export default config
