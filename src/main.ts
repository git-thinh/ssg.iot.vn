//https://router.vuejs.org/guide/advanced/composition-api.html#uselink
import devalue from '@nuxt/devalue'
import { createPinia } from 'pinia'
import { ViteSSG } from 'vite-ssg/single-page'
import { usePageStore } from './store/page'

import App from './App.vue'

export const createApp = ViteSSG(
	App,
	async ({ app, router, routes, isClient, initialState }) => {
		//console.log('app = ', app);

		const pinia = createPinia()
		app.use(pinia)

		if (import.meta.env.SSR) {
			console.log('pinia.state.value = ', pinia.state.value)

			// this will be stringified and set to window.__INITIAL_STATE__
			initialState.pinia = pinia.state.value
		}
		else {
			// on the client side, we restore the state
			pinia.state.value = initialState.pinia || {}
		}

		const store = usePageStore(pinia)
		await store.initialize()

	},
	{
		transformState(state) {
			return import.meta.env.SSR ? devalue(state) : state
		},
	},
)
