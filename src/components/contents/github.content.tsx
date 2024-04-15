'use client';

import { GithubReadmeContentInterfaceGithubReadmeContent } from "@/types/github.type";

interface GithubContentInterface {
	content: GithubReadmeContentInterfaceGithubReadmeContent['content']
}
export default function GithubContent(props: GithubContentInterface){
	return (
		<div className="flex h-[90%] w-full justify-center overflow-y-scroll">
			<article className="prose dark:text-gray-200" dangerouslySetInnerHTML={{__html: props.content}} />
		</div>
	)
	
}