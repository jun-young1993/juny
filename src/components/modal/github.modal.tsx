import { MenuType } from "@/types/menu.type";
import DraggyModal from "./draggy.modal";

export function GithubModal(){
	return (
		<DraggyModal
		menuType={MenuType.GITHUB}
		>
			<div>
				test
			</div>
		</DraggyModal>
	)
}