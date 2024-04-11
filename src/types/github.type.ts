import { _BLOG_CONTENT_TYPE } from "@/defined/blog.defined"

export interface GithubContentInterface {
	name: string
	path: string
	type: _BLOG_CONTENT_TYPE
	content?: null | string
	download_url: string
	html_url: string
	git_url: string
	encoding?: BufferEncoding
}

export interface GithubReadmeContent {
	content: string
}