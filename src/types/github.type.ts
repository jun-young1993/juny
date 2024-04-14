import { _BLOG_CONTENT_TYPE } from "@/defined/blog.defined"

export interface GithubContentInterface {
	name: string
	path: string
	type: _BLOG_CONTENT_TYPE
	content?: string
	download_url: string
	html_url: string
	git_url: string
	encoding?: BufferEncoding
}

export interface GithubReadmeContentInterfaceGithubReadmeContent {
	content: string
}

export interface GithubReadmeContentInterface extends GithubContentInterface{
	content: string
	encoding: BufferEncoding
}