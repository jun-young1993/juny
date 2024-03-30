'use client';
import { BlogContentInterface } from "@/types/blog.type"
import {useBlog} from "@/store/recoil/blog.recoil";
import {useEffect, useState} from "react";
import Link from "next/link";

interface BlogContentProps {
	data: BlogContentInterface[]
	path: string
}
export default function BlogContent(props: BlogContentProps){

	const [selected, setSelected] = useState(null)
	const basePath = '/blog';

	console.log("=>(blog.content.tsx:16) props", props);
	function generatePaths(str: string): string[]
	{
		const parts = str.split('/');
		const result = parts.map((_, index) => parts.slice(0, index + 1).join('/'));
		return result;
	}


	return (
		<div className="">
		<ul className="menu bg-base-200 w-56 rounded-box dark:bg-gray-600 dark:text-gray-200">
		<li>
		<h2 className="menu-title dark:text-gray-200">
			<Link href={basePath}>blog</Link>
			{generatePaths(props.path ?? '').map((path,index) => {
				const currentPath = props.path.split('/')[index];
				return <Link className="ml-1" key={`${basePath}/${path}`} href={`${basePath}/${path}`}>/{currentPath}</Link>
			})}
		</h2>
			<ul>
				{props.data.map((content) => {
					return (
						<li
							key={content.name}
						>
							<Link href={`/${content.path}`}>
								{content.name}
							</Link>
						</li>
					);
				})}
			</ul>
		</li>
		</ul>
		</div>

	)
}