import DraggyModal from "../modal/draggy.modal";
import _IMAGE from "@/defined/image";
import Image from "next/image";
import {useDraggyModal} from "@/store/recoil/draggy-modal.recoil";
import {MenuType} from "@/types/menu.type";
import {useEffect} from "react";
export default function MenuBar(){
	const { usePushDraggyModal, draggyModals } = useDraggyModal();
	const imageSize = 40;
	const borderMinHeight = imageSize + 10;
	useEffect(() => {
		// usePushDraggyModal('GITHUB');
	},[])


	console.log("=>(menu-bar.tsx:12) draggyModals", draggyModals);
	return (
		<div className={"w-full h-full flex justify-center"}>
			<div className={`w-11/12  h-1/2 min-h-[${borderMinHeight}px] rounded-lg border-solid border-2 border-inherit`}>
				<div className={"w-full h-full flex items-center"}>
						<Image
							onClick={() => {

							}}
							className='ml-3 transition delay-150 hover:-translate-y-3 hover:scale-110 hover:cursor-pointer duration-300'
							src={_IMAGE.GITHUB}
							width={imageSize}
							height={imageSize}
							alt={'github'}
						/>
				</div>
				<DraggyModal />
			</div>
		</div>

	)
}