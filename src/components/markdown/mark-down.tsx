'use client';
import MarkdownPreview from "@uiw/react-markdown-preview";
import {API_URL, PROTOCOL} from "@/lib/config/config";

interface MarkDownProps {
	source: string
}
export default function MarkDownPreview(props: MarkDownProps){


	return (
		<MarkdownPreview
			{...props}
			style={{ padding: 16 }}
			rehypeRewrite={(node, index, parent) => {

				if(node.type == 'text'){
					const obsidianImageRegex = /!\[\[(.*?)\]\]/;
					const imageMatch = node.value.match(obsidianImageRegex);
					if(imageMatch){
						const name = imageMatch[1];
						const src = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_URL}/api/github/image/${name}`;
						Object.assign(node,{
							type: 'element',
							tagName: 'img',
							properties: {
								src: src,
								alt: src
							},
							children: [],
							position : node.position
						})
					}
				}

			}}
		/>
	)
}