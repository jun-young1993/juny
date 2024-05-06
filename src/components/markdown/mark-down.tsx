'use client';
import MarkdownPreview from "@uiw/react-markdown-preview";
import {API_URL, PROTOCOL} from "@/lib/config/config";

interface MarkDownProps {
	source: string
	aLinkPrefix?: string
}
export default function MarkDownPreview(props: MarkDownProps){


	return (
		<MarkdownPreview
			{...props}
			style={{ padding: 16 }}
			rehypeRewrite={(node, index, parent) => {
				const obsidianImageRegex = /!\[\[(.*?)\]\]/;
				const obsidianBackLinkCheck = /\[\[([^|\]]+)\/([^|\]]+)\|([^|\]]+)\]\]/;


				if(node.type == 'text'){

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

					const backlinkMatch = node.value.match(obsidianBackLinkCheck);
					if(backlinkMatch){
						const backlinkPath = backlinkMatch[1];
						const backlinkFileName = backlinkMatch[2];
						const backlinkAliasName = backlinkMatch[3];

						Object.assign(node,{
							type: 'element',
							tagName: 'a',
							properties: { href: `${props.aLinkPrefix ?? ''}${backlinkPath}/${backlinkFileName}.md`},
							children: [{type: 'text', value: backlinkAliasName}]
						})
					}
				}


			}}
		/>
	)
}