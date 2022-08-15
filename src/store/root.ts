import { defineStore } from 'pinia'

// Import axios to make HTTP requests
import axios from 'axios'

interface PageData {
	titles: any[] | [],
	paths: any[] | []
}

interface RootState {
	page: Record<string, PageData> | null
}

export const useRootStore = defineStore({
	id: 'root',
	state: (): RootState => ({
		page: null
	}),
	getters: {
		isReady(state) {
			return !!state.page
		},
	},
	actions: {

		async initialize() {
			if (this.isReady)
				return

			const page = { titles: [], paths: [] }
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
			this.page = page;
		}

	},
})
