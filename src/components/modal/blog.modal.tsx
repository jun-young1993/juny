import { MenuType } from "@/types/menu.type";
import DraggyModal from "./draggy.modal";
import BlogContent from "../contents/blog.content";

export function BlogModal(){
	return (
		<DraggyModal
			menuType={MenuType.BLOG}
		>
			<BlogContent />
		</DraggyModal>
	)
}