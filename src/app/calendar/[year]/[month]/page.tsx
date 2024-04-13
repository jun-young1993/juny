import Calendar from "@/components/calendar/calendar";
import ContainerLayout from "@/components/layouts/container.layouts"
import { MenuType } from "@/types/menu.type"
import { MultiSegmentPageParams } from "@/types/next.type"
import {redirect} from "next/navigation";
import {fillWord, getPreviousMonthLastSunday, removeFirstSegment} from "juny-tsutil";
import {API_URL} from "@/lib/config/config";
import {CalendarPath} from "@/defined/calendar.defined";
import _ from "lodash";
import {CalendarInterface} from "@/types/calendar.type";
export interface YearMonthInterface {
	
	year: string
	month: string

}
export interface MultiSegmentPageCalendarYearMonthParams extends MultiSegmentPageParams {
	params: YearMonthInterface
}
export async function getCalendarData(path?: string): Promise<CalendarInterface[] | []> {
	const dynamicPath = path ? path : '';

	const res = await fetch(API_URL(`${CalendarPath}/${dynamicPath}`),{
		method: 'GET',
		next: { tags: dynamicPath.split('/') }
	});

	const result = await res.json();

	return result;
}

export default async function Page({ params }: MultiSegmentPageCalendarYearMonthParams){

	const {year, month } = params;
	const data:CalendarInterface[]| [] = await getCalendarData(
		`${year}/${month}`
	);


	
	const result: {[key: string]: CalendarInterface[]} = {};

	for(const calendarForDay of data){
		const day = calendarForDay.name;
		const dataPath: string = `${year}/${month}/${day}`;
		const calendarForDayData = await getCalendarData(dataPath);


		result[day] = calendarForDayData;
	}

	return (
		<ContainerLayout
			type={MenuType.CALENDAR}
			title={MenuType.CALENDAR}
		>
			<Calendar
				data={result}
				year={parseInt(year)}
				month={parseInt(month)}
			/>
		</ContainerLayout>
	)
}