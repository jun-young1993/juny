import MarkdownPreview, { MarkdownPreviewProps, MarkdownPreviewRef } from '@uiw/react-markdown-preview';
export function MarkDown(props: MarkdownPreviewProps & React.RefAttributes<MarkdownPreviewRef>){
	return <MarkdownPreview {...props} />
}