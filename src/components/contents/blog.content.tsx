'use client';
import { BlogContentInterface } from "@/types/blog.type"
import Link from "next/link";

interface BlogContentProps {
	data: BlogContentInterface[]
	path: string
}
export default function BlogContent(props: BlogContentProps){


	const basePath = '/blog';

	function generatePaths(str: string): string[]
	{
		const parts = str.split('/');
		const result = parts.map((_, index) => parts.slice(0, index + 1).join('/'));
		return result;
	}

	console.log("=>(blog.content.tsx:24) props.data[0].content", props.data);

	return (
		<div className="flex">
			<div className={"flex-none"}>
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
			<div className={"flex-1 w-full"}>
				{typeof props.data[0].content === "string" &&
					<article className="prose w-full" dangerouslySetInnerHTML={{__html: props.data[0].content as string}} />
				}
			</div>
		</div>

	)
}