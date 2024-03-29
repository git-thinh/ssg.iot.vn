import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'
import Inspect from 'vite-plugin-inspect'
import Restart from 'vite-plugin-restart'

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		__apiData: JSON.stringify('http://localhost:8585'),
		__apiOrder: JSON.stringify('http://localhost:8585'),
		__ssr: true,
		__runtime: false,
		//__data: globalData,
		//__project: JSON.stringify(_projectCode),
		__imagePng1x1Px: JSON.stringify('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='),
		//__pathRuntimeProject: JSON.stringify(__pathRuntimeProject),
		//__pathRuntimeShared: JSON.stringify(__pathRuntimeShared),
	},

	// vue: {
	// 	config: {
	// 		//silent: IsComRuntime === 1,
	// 		silent: true,
	// 	},
	// },
	
	///resolve: { alias: { vue: 'vue/dist/vue.esm-bundler.js' } }
	resolve: {
		alias: {
			'~/': `${path.resolve(__dirname, 'src')}/`,
			vue: 'vue/dist/vue.esm-bundler.js',
		},
	},

	plugins: [
		// https://github.com/vuejs/vue-next
		Vue(),

		// https://github.com/JohnCampionJr/vite-plugin-vue-layouts
		// Layouts(),

		// https://github.com/hannoeru/vite-plugin-pages
		// Pages({
		// 	extensions: ['vue'],
		// 	// extendRoute(route, parent) {
		// 	//   if (route.name === 'Index') {
		// 	//     // Index is unauthenticated.
		// 	//     return route
		// 	//   }

		// 	//   // Augment the route with meta that indicates that the route requires authentication.
		// 	//   return {
		// 	//     ...route,
		// 	//     meta: { auth: true },
		// 	//   }
		// 	// },
		// }),
		Pages({
			dirs: [
				{ dir: '~/pages', baseRoute: '' },
				//{ dir: `core/pages/test`, baseRoute: 'test' },
				//{ dir: `src/${_projectCode}/pages`, baseRoute: '' },
				//{ dir: '../shared.iot.vn/pages', baseRoute: '' },
				// { dir: 'src/pages', baseRoute: '' },
				// { dir: 'src/features/**/pages', baseRoute: 'features' },
				// { dir: 'src/admin/pages', baseRoute: 'admin' },
			],
			extensions: ['vue', 'md'],
			//exclude: ['**/components/*.vue'],
			// importMode(filepath, options) {
			// 	// default resolver
			// 	// for (const page of options.dirs) {
			// 	//   if (page.baseRoute === '' && filepath.startsWith(`/${page.dir}/index`))
			// 	//     return 'sync'
			// 	// }
			// 	// return 'async'
			// 	// Load about page synchronously, all other pages are async.
			// 	return filepath.includes('about') ? 'sync' : 'async'
			// },
		}),


		// https://github.com/antfu/unplugin-auto-import
		// AutoImport({
		//   imports: [
		//     'vue',
		//     'vue-router',
		//   ],      
		//   dts: 'src/auto-imports.d.ts'
		// }),
		AutoImport({
			include: [/\.ts$/, /\.vue$/, /\.md$/],
			imports: [
				//'vue',
				//'vue-router',
				//'vue/macros',
				//'@vueuse/head',
				//'@vueuse/sound',
				//'@vueuse/core',

				{
					'vue': ['createSSRApp', 'useSSRContext', 'ref', 'defineComponent', 'computed', 'reactive', 'h', 'compile'],
					'vue-router': ['useRoute', 'useRouter'],

					// https://github.com/vueuse/head
					'@vueuse/head': ['createHead', 'useHead'],

					'@nuxt/devalue': ['devalue'],
					'pinia': ['createPinia'],

					'~/router': ['createRouter'],
					'~/store/page': ['usePageStore'],

					'~/api/apiPage': ['apiGetPage'],
				},

				// 		{
				// 			'@vueuse/core': [
				// 				// https://vueuse.org/guide/
				// 				// import { useMouse } from '@vueuse/core',
				// 				'useScriptTag',//https://vueuse.org/core/useScriptTag/
				// 				'useNetwork', 'useOnline',
				// 				'useClipboard',
				// 				'useFullscreen', //https://vueuse.org/core/useFullscreen/#demo
				// 				'useObjectUrl', //https://vueuse.org/core/useObjectUrl/#usage
				// 				'useFileDialog', //https://vueuse.org/core/useFileDialog/#demo
				// 				'useFileSystemAccess', //https://vueuse.org/core/useFileSystemAccess/#demo
				// 				'useEyeDropper', //https://vueuse.org/core/useEyeDropper/#component-usage
				// 				'useCssVar', 'useDark', 'useToggle', 'useMouse', 'onClickOutside', 'useConfirmDialog',
				// 				'useMediaControls', //https://vueuse.org/core/useMediaControls/
				// 				'useImage', 'useInfiniteScroll', 'useMouseInElement',
				// 				'useElementVisibility', 'useDocumentVisibility',
				// 				'useDevicesList', 'useUserMedia', 'useSpeechRecognition', 'useSpeechSynthesis',
				// 				// alias
				// 				['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
				// 			],
				// 			'@vueuse/sound': ['useSound'], //import { useSound } from '@vueuse/sound'

				// 			//'vue': ['defineComponent', 'computed'],
				// 			//'~store/user': ['useUserStore'] 

				// 			'axios': [['default', 'axios']], //// import { default as axios } from 'axios',
				// 			'vue-request': ['useRequest', 'usePagination'],

				// 			//'^/type/speech-types': ['__postApi'],

				// 			'♥/setup/AppSetup': ['AppSetup'],

				// 			'^/mixin/GlobalFunction': ['__getWindow', '__postApi'],
				// 			'^/mixin/MixLayout': ['MixLayout'],
				// 			'^/mixin/MixPage': ['MixPage'],
				// 			'^/mixin/MixComponent': ['MixComponent'],
				// 		},
				// '[package-name]': [
				// 	 '[import-names]',
				// 	 ['[from]', '[alias]'],
				// ],
			],

			// Auto import for all module exports under directories
			// dirs: [
			// 	// './hooks',
			// 	// './composables'
			// 	// ...
			// ],

			// Filepath to generate corresponding .d.ts file.
			// Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
			// Set `false` to disable.
			dts: 'src/auto-imports.d.ts',
			//dts: `src/${_projectCode}/auto-imports.d.ts`,

			// Auto import inside Vue template
			// see https://github.com/unjs/unimport/pull/15
			//vueTemplate: false,

			// Custom resolvers, compatible with `unplugin-vue-components`
			// see https://github.com/antfu/unplugin-auto-import/pull/23/
			//resolvers: [/* ... */],
		}),

		// https://github.com/antfu/unplugin-vue-components
		// Components({
		// 	// relative paths to the directory to search for components
		// 	dirs: ['src/**/components'],
		// 	// allow auto load markdown components under `./src/components/`
		// 	extensions: ['vue'],
		// 	// allow auto import and register components used in markdown
		// 	include: [/\.vue$/, /\.vue\?vue/],
		// 	dts: 'src/components.d.ts'
		// }),
		// https://github.com/antfu/unplugin-vue-components
		Components({
			// relative paths to the directory to search for components.
			dirs: [
				`src/components`,
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
			//dts: false,
			dts: 'src/components.d.ts',

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


		// https://github.com/antfu/vite-plugin-pwa
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
			manifest: {
				name: 'Test',
				short_name: 'Test',
				theme_color: '#ffffff',
				// icons: [
				//   {
				//     src: '/pwa-192x192.png',
				//     sizes: '192x192',
				//     type: 'image/png',
				//   },
				//   {
				//     src: '/pwa-512x512.png',
				//     sizes: '512x512',
				//     type: 'image/png',
				//   },
				//   {
				//     src: '/pwa-512x512.png',
				//     sizes: '512x512',
				//     type: 'image/png',
				//     purpose: 'any maskable',
				//   },
				// ],
			},
		}),

		// https://github.com/antfu/vite-plugin-inspect
		Inspect({
			// change this to enable inspect for debugging
			enabled: false,
		}),

		// https://github.com/antfu/vite-plugin-restart
		Restart({
			restart: [
				'../../dist/*.js',
				//'./server.ts',
				//'./src/api/apiPage.ts',
			],
		}),
	],

	build: {
		minify: false,
		emptyOutDir: true,
		ssrManifest: true,
		//outDir: `./build`,
		//manifest: true,
		assetsDir: 'assets__',
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					let extType = assetInfo.name.split('.').at(1);
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
						extType = 'img';
					}
					//return `assets__/${extType}/[name]-[hash][extname]`;
					return `assets__/${extType}/[name][extname]`;
				},
				//chunkFileNames: 'assets__/js/[name]-[hash].js',
				//entryFileNames: 'assets__/js/[name]-[hash].js',
				chunkFileNames: 'assets__/js/[name].js',
				entryFileNames: '[name].js',
			},
		}
	},

	optimizeDeps: {
		include: [
			'vue',
			'vue-router'
		],
		exclude: [
			'vue-demi'
		]
	},
})

