'use client';
import { ListItem } from "juny-react-style";
import ContainerLayout from "../layouts/container.layouts";
import { LatestBlogInterface } from "@/app/page";
import Link from "next/link";
interface LatestBlogProps {
	latestBlog: LatestBlogInterface[] | []
}
export default function LatestBlog(props:LatestBlogProps){
	return <ContainerLayout
		title={"Latest Posts"}
	>
		{props.latestBlog.map(({filename}) => {
			return (
				<Link key={filename} href={`/${filename}`}>
					<ListItem key={filename}>{filename.split('/').pop()?.split('.').shift()}</ListItem>
				</Link>
			)
			// 
		})}
		
	</ContainerLayout>
}