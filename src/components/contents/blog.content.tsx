'use client';
import { BlogPath, _BLOG_CONTENT_TYPE } from "@/defined/blog.defined";
import { BlogContentInterface, BlogContentProps } from "@/types/blog.type"
import Link from "next/link";
import { ReactNode, useState } from "react";
import { FileIcon, FolderIcon } from "../icons/svg.icon";
import _ from "lodash";
import { BlogContentMenuNav } from "../blog/blog-content-menu-nav";

export default function BlogContent(props: BlogContentProps){

	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	

	const handleClickMenuItem = (content: BlogContentInterface, index: number) => {
		if(content.type === _BLOG_CONTENT_TYPE.FILE){
			setSelectedIndex(index);
		}
	}

	const makeLink = (content: BlogContentInterface,index: number) => {
		if(props?.modal?.link){
			return props.modal.link(content, index);
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

	const isContent:boolean = (!_.isEmpty(props.data) && 
				typeof props.data[props?.modal?.selectedIndex ?? selectedIndex]?.content === "string");

	return (
		<div className="flex h-[90%]">
			<div className={`flex-none medium:w-1/4 mini:w-full h-full ${isContent ? 'mini:hidden medium:block' : 'mini:block'}`}>
				<ul className="menu bg-base-200 w-56 rounded-box dark:bg-gray-600 dark:text-gray-200 w-full">
					<li className="w-full">
						<BlogContentMenuNav {...props} />
				
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
			<div className={`flex-1 w-full h-full pl-10 dark:text-gray-200 overflow-y-scroll ${isContent ? 'mini:block' : 'mini:hidden'}`}>
				{(
				isContent
				) &&
					<div className="w-full h-full">
						<div className="w-full flex justify-center h-1/12">
							<BlogContent {...props} />
							<div className="text-xl font-bold italic">{props.data[props?.modal?.selectedIndex ?? selectedIndex].name}</div>
						</div>
						<div className="w-full h-11/12 flex justify-center">
							<article className="prose dark:text-gray-200" dangerouslySetInnerHTML={{__html: props.data[props?.modal?.selectedIndex ?? selectedIndex].content as string}} />
						</div>
					</div>
					
				}
			</div>
		</div>

	)
}