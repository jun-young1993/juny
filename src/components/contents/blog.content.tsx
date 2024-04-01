'use client';
import { _BLOG_CONTENT_TYPE } from "@/defined/blog.defined";
import { BlogContentInterface } from "@/types/blog.type"
import Link from "next/link";
import { useState } from "react";
import { FileIcon, FolderIcon } from "../icons/svg.icon";

interface BlogContentProps {
	data: BlogContentInterface[]
	path: string
	modal?: boolean
}

function generatePaths(str: string): string[]
{
	const parts = str.split('/');
	const result = parts.map((_, index) => parts.slice(0, index + 1).join(' / '));
	return result;
}

export default function BlogContent(props: BlogContentProps){

	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const basePath = '/blog';

	const handleClickMenuItem = (content: BlogContentInterface, index: number) => {
		if(content.type === _BLOG_CONTENT_TYPE.FILE){
			setSelectedIndex(index);
		}
	}

	const makeLink = (content: BlogContentInterface,index: number) => {
		if(props.modal === true){
			return (
				<div onClick={()=> handleClickMenuItem(content,index)}>
				{content.type === _BLOG_CONTENT_TYPE.FILE ? <FileIcon /> : <FolderIcon />}
				<span className="truncate hover:text-clip">{content.name}
				</span>
				</div>
			)
		}
		return (
			content.type === _BLOG_CONTENT_TYPE.FILE
			? <div onClick={()=> handleClickMenuItem(content,index)}>
				<FileIcon />
				<span className="truncate hover:text-clip">{content.name}
				</span>
			</div>
			: <Link href={`/${content.path}`}>
					<FolderIcon />
					<span className="truncate hover:text-clip hover:underline-offset-8">
						{content.name}
					</span>
					
			</Link>
		)
	}


	return (
		<div className="flex h-[90%]">
			<div className={"flex-none w-1/4 h-full"}>
				<ul className="menu bg-base-200 w-56 rounded-box dark:bg-gray-600 dark:text-gray-200 w-full">
					<li className="w-full">
						<h2 className="menu-title dark:text-gray-200 text-lg">
							<Link className="hover:underline hover:underline-offset-8  decoration-sky-500 dark:decoration-sky-200 hover:capitalize " href={basePath}>{"blog".toLocaleUpperCase()}</Link>
							{generatePaths(props.path ?? '').map((path,index) => {
								const currentPath = props.path.split('/')[index];
								return <Link className="ml-1 hover:text-bold hover:underline hover:underline-offset-8 decoration-sky-500 dark:decoration-sky-200 hover:capitalize" key={`${basePath} / ${path}`} href={`${basePath}/${path}`}>/{currentPath}</Link>
							})}
						</h2>
						<ul>
							{props.data.map((content,index) => {
								return (
									<li
										key={content.name}
									>
										{
											(makeLink(content,index))
										}
									</li>
								);
							})}
						</ul>
					</li>
				</ul>
			</div>
			<div className={"flex-1 w-full h-full pl-10 dark:text-gray-200 overflow-y-scroll"}>
				{typeof props.data[selectedIndex].content === "string" &&
					<div className="w-full h-full">
						<div className="w-full flex justify-center h-1/12">
							<div className="text-xl font-bold italic">{props.data[selectedIndex].name}</div>
						</div>
						<div className="w-full h-11/12 flex justify-center">
							<article className="prose dark:text-gray-200" dangerouslySetInnerHTML={{__html: props.data[selectedIndex].content as string}} />
						</div>
					</div>
					
				}
			</div>
		</div>

	)
}