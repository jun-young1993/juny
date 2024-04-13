import { MultiSegmentPageParams } from "@/types/next.type"
import { YearMonthInterface } from "../page"
import { API_URL } from "@/lib/config/config";
import { CalendarInterface } from "@/types/calendar.type";
import { CalendarPath } from "@/defined/calendar.defined";
import {MenuType} from "@/types/menu.type";
import ContainerLayout from "@/components/layouts/container.layouts";
import Link from "next/link";
import {FileIcon} from "@/components/icons/svg.icon";
import {CalendarLayout} from "@/components/layouts/calendar.layout";
import {getCalendarData} from "@/lib/client/calendar.client";

export interface YearMonthDaySlugInterface extends YearMonthInterface{
	day: string
}
export interface MultiSegmentPageCalendarYearMonthDayParams extends MultiSegmentPageParams {
	params: YearMonthDaySlugInterface
}

export async function getData(path: string){
	const data:CalendarInterface[]| [] = await getCalendarData(
		path
	);
	return data;
}


export default async function Page({ params }: MultiSegmentPageCalendarYearMonthDayParams){
	const { year, month, day} = params;
	const data:CalendarInterface[]| [] = await getData(
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