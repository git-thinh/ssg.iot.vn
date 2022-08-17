import axios from 'axios'

export async function apiGetPage(path_: string) {
	let url01 = 'https://m.op.pimage.mascot.dk/data/productsForFilter/productsForFilter-da.json'
	let url02 = 'https://m.op.pimage.mascot.dk/data/productsForFilter/productsForFilter-da.json'
	//url01 = 'http://data.iot.vn/static/article/info-tits.json'
	//url02 = 'http://data.iot.vn/static/article/info-path.json'
	url01 = 'http://localhost:5679/test/productsForFilter-da.json'
	url02 = 'http://localhost:5679/test/productsForFilter-da.json'

	const page = {
		ok: true,
		message: '',
		time: new Date().getTime(),
		head: {
			title: 'Test - 12345',
			meta: [
				{
					charset: "utf-8",
				},
				{
					name: "viewport", 
					content: "width=device-width, initial-scale=1.0"
				},
				{
					property: "og:locale:alternate",
					content: "zh",
					key: "zh",
				},
				{
					property: "og:locale:alternate",
					content: "en",
					key: "en",
				},
			],
			link: [
				{
					rel: 'icon',
					type: 'image/icon',
					href: '/favicon.ico',
				},
			],
			script: [
				{
					children: `console.log('Hello world!')`,
					body: true,
				},
			],
			style: [
				{
					children: `body {color: red}`,
				},
			],
			noscript: [
				{
					children: `Javascript is required`,
				},
			],
		},
		app: {
			path: path_,
			theme: 'anime',
			template: ''
		},
		data: {
			titles: [],
			paths: []
		}
	}

	try {
		const rs = await Promise.all([
			axios.get(url01),
			axios.get(url02)
		]);
		let a = rs[0].data;
		a = a.filter((o: any, k: number) => k < 5);
		a = a.map(o => o.n + ' ' + o.b + ' ' + o.r)
		page.titles = a;

		a = rs[1].data;
		a = a.filter((o: any, k: number) => k < 5);
		a = a.map(o => (o.b + '-' + o.r + '-' + o.n).toLowerCase().split('®').join(''))
		page.paths = a;
	}
	catch (error) {
		//alert(error)
		console.log(error)
	}

	return page;
}
