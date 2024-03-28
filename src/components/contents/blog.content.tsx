import { BlogContentInterface } from "@/types/blog.type"

interface BlogContentProps {
	data: BlogContentInterface[]
}
export default function BlogContent(props: BlogContentProps){
	return (
		<div className="">
		<ul className="menu bg-base-200 w-56 rounded-box dark:bg-gray-600 dark:text-gray-200">
		<li>
		<h2 className="menu-title dark:text-gray-200">Title</h2>
			<ul>
				{props.data.map((content) => {
					return (
						<li>
							<a>
								{content.name}
							</a>
						</li>
					);
				})}
			</ul>
		</li>
		</ul>
		</div>

	)
}