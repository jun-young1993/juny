'use client';

import React, { ReactNode } from "react";
import HeaderGroupButton from "../buttons/header-group.button";
import { useRouter } from "next/navigation";
import { MenuType, UnionsMenuType } from "@/types/menu.type";
import { useDraggyModal } from "@/store/recoil/draggy-modal.recoil";
import { MacContainer } from "juny-react-style";


interface ContainerLayoutInterface {
	children: ReactNode | string
	title?: string | ReactNode
	type?: UnionsMenuType
	onClose ?: () => void
}
export default function ContainerLayout({title, onClose, type,children}: ContainerLayoutInterface){
	const router = useRouter();
	const { pushDraggyModal } = useDraggyModal();
	type NewType = ReactNode;

	return (
		<MacContainer
			onClose={() => {
				if(onClose) {
					onClose();
				}else{
					router.push('/')
				}
			}}
			onMinimize={() => {
				pushDraggyModal(type);
				router.push('/');
			}}
			header={{
				title: title
			}}
		>
			{children}
		</MacContainer>
	)
	return (
		<div className='w-full h-full bg-slate-100 dark:bg-gray-700 rounded-lg'> 
			<div className="w-full dark:bg-gray-700 pt-3 rounded-lg">
				<HeaderGroupButton
					maximized={true}
					title={props.title}
					onClose={() => {
						if(props.onClose) {
							props.onClose();
						}else{
							router.push('/')
						}
						
					}}
					onMinimize={() => {
						pushDraggyModal(props.type);
						router.push('/')
					}}
				/>
			</div>
			<div className='w-full medium:h-[87%] mini:h-[85%] p-3 dark:text-slate-100 flex-1'>
				{props.children}
			</div>
	      </div>
	)
}