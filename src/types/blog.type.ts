import { _BLOG_CONTENT_TYPE } from "@/defined/blog.defined"
import { GithubContentInterface } from "./github.type"
import { ReactNode } from "react"

export interface BlogContentInterface extends GithubContentInterface{
	name: string
	path: string
	type: _BLOG_CONTENT_TYPE
	content?: string
	download_url: string
}

export interface BlogContentModalInterface {
	link?: (content: BlogContentInterface,index: number) => ReactNode
	selectedIndex?: number
	onNavigationClick?: (path: string, index: number) => void
}

export interface BlogContentProps {
	data: BlogContentInterface[] | []
	path: string
	modal?: BlogContentModalInterface
}