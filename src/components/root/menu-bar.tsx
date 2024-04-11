'use client';
import _IMAGE from "@/defined/image";
import Image from "next/image";
import { useDraggyModal } from "@/store/recoil/draggy-modal.recoil";
import {MenuType, UnionsMenuType} from "@/types/menu.type";
import { GithubModal } from "../modal/github.modal";
import { usePathname, useRouter } from 'next/navigation';
import { BlogModal } from "../modal/blog.modal";
interface MenuIconProps {
	size: number
	src: string
	menu: UnionsMenuType
}
function MenuIcon(props: MenuIconProps){
	const { pushDraggyModal, draggyModals } = useDraggyModal();
	const router = useRouter();
	return (
		<div 
			className={"h-full flex items-center ml-3 dark:bg-dlate-100"}
			onClick={() => router.push(`/${props.menu}`)}
			onContextMenu={(event) => {
				event.preventDefault();
				pushDraggyModal(props.menu);
			}}
		>
			<div className="tooltip transition delay-350 hover:-translate-y-3" data-tip={props.menu}>
				<Image
					className='ml-3 hover:scale-110 hover:cursor-pointer duration-300 dark:bg-dlate-100'
					src={props.src}
					width={props.size}
					height={props.size}
					alt={props.menu}
				/>
			</div>
		</div>
	)
}
export default function MenuBar(){	
	const imageSize = 40;
	const borderMinHeight = imageSize + 10;

	return (
		<div className={"w-full h-full flex justify-center"}>
			<div
				className={`flex justify-start w-11/12 h-1/2 rounded-lg border-solid border-2 border-inherit dark:border-slate-200`}
				style={{
					minHeight: `${borderMinHeight}px`
				}}
			>
				<MenuIcon size={imageSize} src={_IMAGE.GITHUB} menu={MenuType.GITHUB} />
				<MenuIcon size={imageSize} src={_IMAGE.BLOG} menu={MenuType.BLOG} />
				<MenuIcon size={imageSize} src={_IMAGE.CALENDAR} menu={MenuType.CALENDAR} />
				{/*<GithubModal />*/}
				<BlogModal />
			</div>
		</div>

	)
}