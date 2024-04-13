import Calendar from "@/components/calendar/calendar";
import ContainerLayout from "@/components/layouts/container.layouts"
import { MenuType } from "@/types/menu.type"
import { MultiSegmentPageParams } from "@/types/next.type"
import {API_URL} from "@/lib/config/config";
import {CalendarPath} from "@/defined/calendar.defined";
import {CalendarInterface} from "@/types/calendar.type";
import {getCalendarData} from "@/lib/client/calendar.client";
import {fillWord} from "juny-tsutil";
export interface YearMonthInterface {
	
	year: string
	month: string

}
export interface MultiSegmentPageCalendarYearMonthParams extends MultiSegmentPageParams {
	params: YearMonthInterface
}
export async function getData(path: string, year:number, month: number): Promise<{[key: string]: CalendarInterface[]}> {
	const dynamicPath = path ? path : '';

	const data = await getCalendarData(path);
	const result: {[key: string]: CalendarInterface[]} = {};

	for(const calendarForDay of data){
		const day = calendarForDay.name;
		const dataPath: string = `${year}/${fillWord(month.toString(),2,"0")}/${fillWord(day.toString(),2,"0")}`;

		const calendarForDayData = await getCalendarData(dataPath);


		result[day] = calendarForDayData;
	}
	return result;
}

export default async function Page({ params }: MultiSegmentPageCalendarYearMonthParams){

	const {year, month } = params;
	const result:{[key: string]: CalendarInterface[]} = await getData(
		`${year}/${month}`,
		parseInt(fillWord(year,2,"0")),
		parseInt(fillWord(month,2,"0"))
	);


	


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