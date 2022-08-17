import { defineStore } from 'pinia'

interface RootState {
	page: Record<string, any> | null
}

export const usePageStore = defineStore({
	id: 'root',
	state: (): RootState => ({
		page: null,
	}),
	getters: {
		isReady(state) {
			return !!state.page
		},
	},
	actions: {
		async initialize() {
			//console.log('[0] Initialize page ...')
			if (this.isReady) return this.page;

			const page = apiGetPage();
			console.log('[1] Initialize titles = ', page.titles.length)
			this.page = page;

			return page;
		},
	},
})












// interface PageState {
// 	//app: Record<string, any> | null,
// 	app: any | {},
// 	titles: any[] | [],
// 	paths: any[] | []
// }

// export const usePageStore = defineStore({
// 	id: 'page',
// 	state: (): PageState => ({
// 		app: null,
// 		titles: [],
// 		paths: []
// 	}),
// 	getters: {
// 		isReady(state) {
// 			return !!state.app
// 		},
// 	},
// 	actions: {

// 		async initialize() {
// 			if (this.isReady) return;
// 			let url01 = 'https://m.op.pimage.mascot.dk/data/productsForFilter/productsForFilter-da.json'
// 			let url02 = 'https://m.op.pimage.mascot.dk/data/productsForFilter/productsForFilter-da.json'
// 			//url01 = 'http://data.iot.vn/static/article/info-tits.json'
// 			//url02 = 'http://data.iot.vn/static/article/info-path.json'

// 			const page = { app: { path: '' }, titles: [], paths: [] }
// 			try {
// 				const rs = await Promise.all([
// 					axios.get(url01),
// 					axios.get(url02)
// 				]);
// 				let a = rs[0].data;
// 				a = a.filter((o: any, k: number) => k < 10);
// 				a = a.map(o=>o.n + ' ' + o.b + ' ' + o.r)
// 				page.titles = a;

// 				a = rs[1].data;
// 				a = a.filter((o: any, k: number) => k < 10);
// 				a = a.map(o=>(o.b + '-' + o.r+ '-' + o.n ).toLowerCase().split('®').join(''))
// 				page.paths = a;
// 			}
// 			catch (error) {
// 				alert(error)
// 				console.log(error)
// 			}

// 			console.log('Initialize titles = ', page.titles.length)
// 			this.app = page.app;
// 			this.titles = page.titles;
// 			this.paths = page.paths;


// 		}

// 	},
// })
