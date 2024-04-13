import { MultiSegmentPageParams } from "@/types/next.type"
import { YearMonthInterface, getCalendarData } from "../page"
import { API_URL } from "@/lib/config/config";
import { CalendarInterface } from "@/types/calendar.type";
import { CalendarPath } from "@/defined/calendar.defined";
import {MenuType} from "@/types/menu.type";
import ContainerLayout from "@/components/layouts/container.layouts";
import Link from "next/link";
import {FileIcon} from "@/components/icons/svg.icon";
import {CalendarLayout} from "@/components/layouts/calendar.layout";

export interface YearMonthDaySlugInterface extends YearMonthInterface{
	day: string
}
export interface MultiSegmentPageCalendarYearMonthDayParams extends MultiSegmentPageParams {
	params: YearMonthDaySlugInterface
}



export default async function Page({ params }: MultiSegmentPageCalendarYearMonthDayParams){
	const { year, month, day} = params;
	const data:CalendarInterface[]| [] = await getCalendarData(
		`${year}/${month}/${day}`
	);

	return (
		<ContainerLayout
			type={MenuType.CALENDAR}
			title={MenuType.CALENDAR}
		>
			<CalendarLayout

				data={data}
			/>
		</ContainerLayout>
	)
}