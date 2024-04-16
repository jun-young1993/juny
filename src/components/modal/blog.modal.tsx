import { MenuType } from "@/types/menu.type";
import DraggyModal from "./draggy.modal";
import BlogContent from "../contents/blog.content";
import {ReactNode, useEffect, useState} from "react";
import { BlogContentInterface } from "@/types/blog.type";
import { BlogPath, _BLOG_CONTENT_TYPE } from "@/defined/blog.defined";
import { FileIcon, FolderIcon } from "../icons/svg.icon";
import { usePathname, useRouter } from 'next/navigation';

export function BlogModal(){
	const [data, setData] = useState<[] | BlogContentInterface[] >([]);
	const [path, setPath] = useState<string>('');
	const [url, setUrl] = useState(`/api${BlogPath}`);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const router = useRouter();
	
	
	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setData(data);
			});
	},[url]);

	

	const onClickMenu = (content: BlogContentInterface, index: number) => {
		const path = content.path;
		const type = content.type;
		if(type == _BLOG_CONTENT_TYPE.DIR){
			setUrl(`/api/${path}`);
			setPath(path.split('/').splice(1).join('/'));
		}else{
			setSelectedIndex(index);
		}
	}
	
	const makeLink = (content: BlogContentInterface, index: number): ReactNode => {
		return (
			<div onClick={()=> onClickMenu(content, index)}>
				{content.type === _BLOG_CONTENT_TYPE.FILE ? <FileIcon /> : <FolderIcon />}
				<span className="truncate hover:text-clip">{content.name}</span>
			</div>
		)
	}
	
	return (
		<DraggyModal
			menuType={MenuType.BLOG}
			onMaximize={() => {
                            router.push(`${BlogPath}/${path}`);
			}}
		>
			<BlogContent
				data={data}
				path={path ?? ''}
				modal={{
					link: makeLink,
					selectedIndex: selectedIndex,
					onNavigationClick: (path, index) => {
						setUrl(`/api/${path}`);		
						setPath(path.split('/').splice(2).join('/'));
					}

				}}
			/>
		</DraggyModal>
	)
}