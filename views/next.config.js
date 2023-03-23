const nextConfig = {
	reactStrictMode: false,
	images: {
		unoptimized: true
	},
	exportPathMap: async function (defaultPathMap) {
		return {
			'/': { page: '/' },
			'/account': { page: '/account' },
			'/auth': { page: '/auth' },
			'/buycoin': { page: '/buycoin' },
			'/datasetlibrary': { page: '/datasetlibrary' },
			'/mysubscriptions': { page: '/mysubscriptions' },
			'/sellcoin': { page: '/sellcoin' },
			'/wallet': { page: '/wallet' },
		};
	},
	output: 'export',
}

module.exports = nextConfig
