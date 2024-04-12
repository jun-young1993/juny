import { MultiSegmentPageParams } from "@/types/next.type"
import { YearMonthInterface, getCalendarData } from "../page"
import { API_URL } from "@/lib/config/config";
import { CalendarInterface } from "@/types/calendar.type";
import { CalendarPath } from "@/defined/calendar.defined";

export interface YearMonthDayInterface extends YearMonthInterface{
	day: string
}
export interface MultiSegmentPageCalendarYearMonthDayParams extends MultiSegmentPageParams {
	params: YearMonthDayInterface
}

export default async function Page({ params }: MultiSegmentPageCalendarYearMonthDayParams){
	const { year, month, day} = params;
	const data:CalendarInterface[]| [] = await getCalendarData(
		`${year}/${month}/${day}`
	);
	console.log(data);
	return <div>{day}</div>
}