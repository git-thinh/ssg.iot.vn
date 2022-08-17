import App from './App.vue'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
	const app = createSSRApp(App)
	const router = createRouter()

	app.use(router)

	const pinia = createPinia()
	app.use(pinia)

	// Before each route navigation we request the data needed for showing the page.
	router.beforeEach(async (to, from, next) => {

		// if (!!to.meta.state && Object.keys(to.meta.state).length > 0) {
		// 	console.log('[0] ROUTER state != NULL', Object.keys(to.meta.state))
		// 	// This route has state already (from server) so it can be reused.
		// 	// State is always empty in SPA development, but present in SSR development.
		// 	return next()
		// }

		// const store = usePageStore(pinia)
		// const page = await store.initialize()
		// to.meta.state = page;

		// console.log('[1] ROUTER state = NULL', Object.keys(page))


		// if (import.meta.env.SSR) {
		// 	console.log('SSR = ', page != null)
		// 	// this will be stringified and set to window.__INITIAL_STATE__
		// 	to.meta.state = page
		// }
		// else {
		// 	// on the client side, we restore the state
		// 	pinia.state.value = page || {}
		// }




		// // `isClient` here is a handy way to determine if it's SSR or not.
		// // However, it is a runtime variable so it won't be tree-shaked.
		// // Use Vite's `import.meta.env.SSR` instead for tree-shaking.
		// const baseUrl = isClient ? '' : url.origin

		// // Explanation:
		// // The first rendering happens in the server. Therefore, when this code runs,
		// // the server makes a request to itself (running the code below) in order to
		// // get the current page props and use that response to render the HTML.
		// // The browser shows this HTML and rehydrates the application, turning it into
		// // a normal SPA. After that, subsequent route navigation runs this code below
		// // from the browser and get the new page props, which is this time rendered
		// // directly in the browser, as opposed to the first page rendering.

		// try {
		// 	// Get our page props from our custom API:
		// 	const url = `${baseUrl}/api/getProps?path=${encodeURIComponent(to.path)}&name=${to.name}&client=${isClient}`;
		// 	const res = await fetch(url, {
		// 		method: 'GET',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 	})
		// 	to.meta.state = await res.json()
		// } catch (error) {
		// 	console.error(error)
		// 	// redirect to error route
		// }


		// const a = await apiGetPage();
		// console.log('[MAIN] a = ', Object.keys(a));
		// to.meta.state = a;

		next()
	})


	// // must be set by the user
	// if (import.meta.env.SSR) {
	// 	;
	// } else {
	// 	pinia.state.value = JSON.parse(window.__pinia)
	// }

	// router.beforeEach(async (to) => {
	// 	const store = usePageStore(pinia)
	// 	await store.initialize()
	// 	//if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
	// })

	// if (import.meta.env.SSR) {
	// 	console.log('pinia.state.value = ', pinia.state.value)

	// 	// this will be stringified and set to window.__INITIAL_STATE__
	// 	initialState.pinia = pinia.state.value
	// }
	// else {
	// 	// on the client side, we restore the state
	// 	pinia.state.value = initialState.pinia || {}
	// }

	// const store = usePageStore(pinia)
	// await store.initialize()

	return { app, router }
}
