// Pre-render the app into static HTML.
// run `yarn generate` and then `dist/static` can be served as a static site.

import fs from 'fs'
import path from 'path'
import fg from 'fast-glob'
import { apiGetPage } from './src/api/apiPage'

const toAbsolute = (p: string) => path.resolve(__dirname, p)
function ensureDirExist(filePath: string) {
	const dirname = path.dirname(filePath)
	if (fs.existsSync(dirname))
		return true

	ensureDirExist(dirname)
	fs.mkdirSync(dirname)
}

export async function build() {
	// create vite dev server to transformIndexHtml
	// const vite = await import('vite').then(i => i.createServer({
	//   server: {
	//     middlewareMode: true,
	//   },
	// }))
	// @ts-ignore
	//const manifest = await import('./dist/static/ssr-manifest.json')
	const manifest = JSON.parse(fs.readFileSync('./dist/static/ssr-manifest.json', 'utf-8'))
	const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')

	// @ts-ignore
	const { render } = await import('./dist/server/entry-server.js')
	//const { render } = await import('./dist/server/assets__/js/entry-server.js')

	// determine routes to pre-render from src/pages
	const files = await fg('**/*.{vue,md}', {
		ignore: ['node_modules', '.git', '**/__*__/*'],
		cwd: path.resolve(process.cwd(), 'src/pages'),
	})

	const routesToPrerender = files
		.filter(i => !i.includes('['))
		.map((file) => {
			const name = file.replace(/\.(vue|md)$/, '').toLowerCase()
			return name === 'index' ? '/' : `/${name}`
		})

	// eslint-disable-next-line no-console
	console.log(routesToPrerender)


	// pre-render each route...
	for (const url of routesToPrerender) {
		const page = await apiGetPage(url);
		//console.log(`SERVER.PAGE = `, page);
		let jsData = '<script> window.__data__ = ' + JSON.stringify(page) + ' </script>';

		//const [appHtml, preloadLinks] = await render(url, manifest, page)
		const [appHtml, preloadLinks, headTags, htmlAttrs, bodyAttrs, bodyTags] = await render(url, manifest, page)
		// const postTemplate = await vite.transformIndexHtml(url, template)

		// const html = template
		// 	.replace('<!--preload-links-->', preloadLinks + jsData)
		// 	.replace('<!--app-html-->', appHtml)
		
		//console.log('SERVER: headTags = ',headTags)
		//console.log('SERVER: htmlAttrs = ',htmlAttrs)
		//console.log('SERVER: bodyAttrs = ',bodyAttrs)
		//console.log('SERVER: bodyTags = ',bodyTags)
		
		const html =
`<html${htmlAttrs}>		
  <head>
	${headTags}
	${preloadLinks}	
  </head>		
  <body${bodyAttrs}>
	<div id="app">${appHtml}</div>
	${bodyTags}
	<script type="module" crossorigin src="/index.js"></script>
	${jsData}			
  </body>		
</html>`
		
		const filePath = `dist/static${url === '/' ? '/index' : url}.html`
		ensureDirExist(filePath)
		fs.writeFileSync(toAbsolute(filePath), html)
		// eslint-disable-next-line no-console
		console.log('pre-rendered:', filePath)
	}

	// close vite dev server
	// await vite.close()
	// done, delete ssr manifest
	fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))
}

build()