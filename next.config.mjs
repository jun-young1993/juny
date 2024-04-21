/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: 'export'
	typescript: {
		ignoreBuildErrors: true
	},
	experimental: {
		// react-markdown-preview exception
		esmExternals: "loose"
	}
}

export default nextConfig
