import { BlogPath } from "@/defined/blog.defined";
import { BlogContentProps } from "@/types/blog.type";
import _ from "lodash";
import Link from "next/link";

function generatePaths(str: string): string[]
{
	const parts = str.split('/');
	const result = parts.map((_, index) => parts.slice(0, index + 1).join(' / '));
	return result;
}

export function BlogContentMenuNav(props: BlogContentProps){
	const navClassName:string = "ml-1 hover:text-bold hover:underline hover:underline-offset-8 decoration-sky-500 dark:decoration-sky-200 hover:capitalize";
	return (
		
			<h2 className="menu-title dark:text-gray-200 text-lg">
				{(props?.modal?.onNavigationClick)
				?<span onClick={() => {
					if(props.modal?.onNavigationClick){
						props?.modal?.onNavigationClick(BlogPath,0);
					}
				}} className={navClassName+"hover:cursor-pointer"} key={`${BlogPath}`}><span className="hover:cursor-pointer">{"blog".toLocaleUpperCase()}</span>/</span>
				: <Link className={navClassName} href={BlogPath}>{"blog".toLocaleUpperCase()}</Link>
				}
				
				{generatePaths(props.path ?? '').map((path,index) => {
					const currentPath = props.path.split('/')[index];
					const userPath = `${BlogPath}/${path}`;
					if(_.isEmpty(path) || path === ''){
						return null;
					}
					if(props?.modal?.onNavigationClick){
						return <span onClick={() => {
							if(props.modal?.onNavigationClick){
								props?.modal?.onNavigationClick(userPath, index+1);
							}
						}} className={navClassName+"hover:cursor-pointer"} key={`${BlogPath} / ${path}`}><span className="hover:cursor-pointer">/{currentPath}</span></span>
					}
					return <Link className={navClassName} key={`${BlogPath} / ${path}`} href={userPath}>/ {currentPath}</Link>
				})}
			</h2>
	)
}