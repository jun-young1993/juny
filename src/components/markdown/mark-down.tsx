import MarkdownPreview, { MarkdownPreviewProps, MarkdownPreviewRef } from '@uiw/react-markdown-preview';
export function MarkDown(props: MarkdownPreviewProps & React.RefAttributes<MarkdownPreviewRef>){
	return (
		<MarkdownPreview
			{...props}
			style={{ padding: 16 }}
			rehypeRewrite={(node, index, parent) => {

				console.log("=>(mark-down.tsx:8) node, index,parent", node, index,parent);
			}}
		/>
	)
}