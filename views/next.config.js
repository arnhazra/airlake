const nextConfig = {
	reactStrictMode: false,
	images: {
		unoptimized: true
	},
	output: 'export',
	generateBuildId: async () => {
		return 'none'
	},
}

module.exports = nextConfig
