import {CalendarInterface} from "@/types/calendar.type";
import {FileIcon} from "@/components/icons/svg.icon";
import Link from "next/link";
import {LeftArrow} from "@/icons/svg";
import MarkDownPreview from "@/components/markdown/mark-down";
interface CalendarLayoutProps {
    data: CalendarInterface[] | []
    content?: string
}
export function CalendarLayout({data, content}: CalendarLayoutProps){

    const publicDataPathArray:string[] = data[0].path.split('/');
    publicDataPathArray.pop();
    publicDataPathArray.pop();

    return (
        <div className="flex h-[90%]">
            <div className={"flex-none w-1/4 h-full"}>
                <Link className="btn btn-circle btn-xs" href={`/${publicDataPathArray.join('/')}`}>
                    <LeftArrow />
                </Link>
                <ul className="menu bg-base-200 w-56 rounded-box dark:bg-gray-600 dark:text-gray-200 w-full">
                    {data.map((calendar) => {
                        return (
                            <li key={calendar.path}>
                                <Link href={`/${calendar.path}`}>
                                    <FileIcon />
                                    <span className="truncate hover:text-clip hover:underline-offset-8">
											{calendar.name}
										</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={"flex-1 w-full h-full pl-10 dark:text-gray-200 overflow-y-scroll"}>
                <MarkDownPreview source={content ?? 'no data'} />
            </div>
        </div>
    )
}