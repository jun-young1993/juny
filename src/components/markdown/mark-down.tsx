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
		/>
	)
}