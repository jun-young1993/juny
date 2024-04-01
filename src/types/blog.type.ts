import { _BLOG_CONTENT_TYPE } from "@/defined/blog.defined"

export interface BlogContentInterface {
	name: string
	path: string
	type: _BLOG_CONTENT_TYPE
	content: null | string
	download_url: string
}