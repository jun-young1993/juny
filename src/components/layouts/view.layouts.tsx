import { ReactNode } from "react";
interface ViewMenuInterface {
	title: ReactNode
	children: ReactNode
}
interface ViewlayoutInterface {
	children: ReactNode
	menu: ReactNode
}
export function ViewMenu({children, title}: ViewMenuInterface){
	return (
		<div className={"flex-none w-1/4 h-full"}>
				<ul className="menu bg-base-200 w-56 rounded-box dark:bg-gray-600 dark:text-gray-200 w-full">
					<li className="w-full">
						<h2 className="menu-title dark:text-gray-200 text-lg">
							{title}
						</h2>
						<ul>
							{children}
						</ul>
					</li>
				</ul>
			</div>
	)
}
export function Viewlayout({children}: ViewlayoutInterface){
	return (
		<div className="flex h-[90%]">
			
			<div className={"flex-1 w-full h-full pl-10 dark:text-gray-200 overflow-y-scroll"}>
				{children}
			</div>
		</div>
	)
}