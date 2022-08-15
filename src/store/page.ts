import { defineStore } from 'pinia'

// Import axios to make HTTP requests
import axios from 'axios'

interface PageState {
	app: Record<string, any> | null,
	titles: any[] | [],
	paths: any[] | []
}

export const usePageStore = defineStore({
	id: 'page',
	state: (): PageState => ({
		app: null,
		titles: [],
		paths: []
	}),
	getters: {
		isReady(state) {
			return !!state.app
		},
	},
	actions: {

		async initialize() {
			if (this.isReady)
				return

			const page = { app: { path: '' }, titles: [], paths: [] }
			try {
				const rs = await Promise.all([
					axios.get('http://data.iot.vn/static/article/info-tits.json'),
					axios.get('http://data.iot.vn/static/article/info-path.json')
				]);
				let a = rs[0].data;
				a = a.filter((o: any, k: number) => k < 10);
				page.titles = a;

				a = rs[1].data;
				a = a.filter((o: any, k: number) => k < 10);
				page.paths = a;
			}
			catch (error) {
				alert(error)
				console.log(error)
			}

			console.log('Initialize page = ', page)
			
			this.app = page.app;
			this.titles = page.titles;
			this.paths = page.paths;
		}

	},
})
