'use client';

import { ReactNode } from "react";
import HeaderGroupButton from "../buttons/header-group.button";
import { useRouter } from "next/navigation";

interface ContainerLayoutInterface {
	children: ReactNode
	title?: string
}
export default function ContainerLayout(props: ContainerLayoutInterface){
	const router = useRouter();
	return (
		<div className='w-full h-full bg-slate-100 dark:bg-gray-700 rounded-lg'> 
			<div className="w-full dark:bg-gray-700 pt-3 rounded-lg">
				<HeaderGroupButton
					title={props.title}
					onClose={() => {
						router.push('/')
					}}
					onMaximize={() => {

					}}
					onMinimize={() => {

					}}
				/>
			</div>
			<div className='w-full h-full p-3'>
				{props.children}
			</div>
	      </div>
	)
}