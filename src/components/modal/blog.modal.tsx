import { MenuType } from "@/types/menu.type";
import DraggyModal from "./draggy.modal";
import BlogContent from "../contents/blog.content";
import {useEffect, useState} from "react";


export function BlogModal(){
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch('/api/blog')
			.then((response) => response.json())
			.then((data) => {
				setData(data);
			})


	},[]);

	return (
		<DraggyModal
			menuType={MenuType.BLOG}
		>
			<BlogContent
				data={data}
				path={''}
			/>
		</DraggyModal>
	)
}