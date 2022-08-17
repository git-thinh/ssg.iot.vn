import axios from 'axios'

export async function apiGetPage(path_: string) {
	let url01 = 'https://m.op.pimage.mascot.dk/data/productsForFilter/productsForFilter-da.json'
	let url02 = 'https://m.op.pimage.mascot.dk/data/productsForFilter/productsForFilter-da.json'
	//url01 = 'http://data.iot.vn/static/article/info-tits.json'
	//url02 = 'http://data.iot.vn/static/article/info-path.json'

	const page = {
		ok: true,
		message: '',
		time: new Date().getTime(),
		app: {
			path: path_,
			theme: 'anime',
			template: '',
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
