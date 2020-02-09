const _routes = Symbol('routes')
const _callRoute = Symbol('callRoute')
const _routeParams = Symbol('routeParams')
const _currentRoute = Symbol('currentRoute')
const _currentParams = Symbol('currentParams')

export default class Router {
	constructor(routes = []) {
		this[_routes] = routes
		this[_callRoute](location.hash)
		window.addEventListener('hashchange', (e) => this[_callRoute](location.hash))
	}

	[_callRoute](hash) {
		if (this[_currentRoute] && this[_currentRoute].unload) {
			this[_currentRoute].unload()
		}

		const path = hash.replace(/(#\/|#|\/(?!.))/g, '')

		this[_currentRoute] = this[_routes].find(x => {
			if (x.route === '*') return true

			return this[_routeParams](x.route, path) === path
		})

		this[_currentRoute].load(this[_currentParams])
	}

	[_routeParams](route, path) {
		const routeArr = route.split('/')
		const pathArr = path.split('/')

		if (routeArr.length === 0 || routeArr.length !== pathArr.length) return route

		this[_currentParams] = {}
		const didPass = routeArr.every((fragment, i) => {
			const param = fragment.replace(/({|})/g, '')

			if (param !== fragment) {
				fragment = pathArr[i]
				this[_currentParams][param] = pathArr[i]
			}

			return fragment === pathArr[i]
		})

		if (!didPass) {
			this[_currentParams] = {}
		} else {
			route = path
		}

		return route
	}
}
