'use client'
import MarkdownPreview from "@uiw/react-markdown-preview";

interface MarkDownProps {
	source: string
}
export default function MarkDownPreview(props: MarkDownProps){
	return (
		<MarkdownPreview
			{...props}
			style={{ padding: 16 }}
			rehypeRewrite={(node, index, parent) => {
				console.log(node);
				if(node.type == 'text'){
					const obsidianImageRegex = /!\[\[(.*?)\]\]/;
					const imageMatch = node.value.match(obsidianImageRegex);

					if(imageMatch){
						const imageSrc = imageMatch[1];
						// console.log("=>(mark-down.tsx:18) imageMatch", imageMatch);
						// node.value = "![test](http://localhost:3000/api/github/image/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-04-20%20%EC%98%A4%ED%9B%84%2012.50.20.png)";
						// console.log("=>(mark-down.tsx:18) imageSrc", imageSrc);

					}

				}

			}}
		/>
	)
}