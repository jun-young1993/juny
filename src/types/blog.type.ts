import { _BLOG_CONTENT_TYPE } from "@/defined/blog.defined"
import { GithubContentInterface } from "./github.type"

export interface BlogContentInterface extends GithubContentInterface{
	name: string
	path: string
	type: _BLOG_CONTENT_TYPE
	content?: null | string
	download_url: string
}