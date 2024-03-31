export interface BlogContentInterface {
	name: string
	path: string
	type: 'file' | 'dir'
	content: null | string
	download_url: string
}