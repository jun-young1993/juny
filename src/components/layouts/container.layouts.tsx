'use client';

import { ReactNode } from "react";
import HeaderGroupButton from "../buttons/header-group.button";
import { useRouter } from "next/navigation";
import { MenuType, UnionsMenuType } from "@/types/menu.type";
import { useDraggyModal } from "@/store/recoil/draggy-modal.recoil";


interface ContainerLayoutInterface {
	children: ReactNode
	title?: string | ReactNode
	type?: UnionsMenuType
}
export default function ContainerLayout(props: ContainerLayoutInterface){
	const router = useRouter();
	const { pushDraggyModal } = useDraggyModal();
	return (
		<div className='w-full h-full bg-slate-100 dark:bg-gray-700 rounded-lg'> 
			<div className="w-full dark:bg-gray-700 pt-3 rounded-lg">
				<HeaderGroupButton
					maximized={true}
					title={props.title}
					onClose={() => {
						router.push('/')
					}}
					onMinimize={() => {
						pushDraggyModal(props.type);
						router.push('/')
					}}
				/>
			</div>
			<div className='w-full h-[90%] mini:h-[90%] p-3 dark:text-slate-100'>
				{props.children}
			</div>
	      </div>
	)
}