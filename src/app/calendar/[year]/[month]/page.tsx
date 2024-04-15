// @ts-ignore
import Calendar from "@/components/calendar/calendar";
import ContainerLayout from "@/components/layouts/container.layouts"
import { MenuType } from "@/types/menu.type"
import { MultiSegmentPageParams, YearMonthInterface } from "@/types/next.type"
import {DayByCalendarType} from "@/types/calendar.type";
import {getCalendarData} from "@/lib/client/calendar.client";
export interface MultiSegmentPageCalendarYearMonthParams extends MultiSegmentPageParams {
	params: YearMonthInterface
}
export async function getData(path: string){

	const data = await getCalendarData<DayByCalendarType>(path);
	return data;
}

export default async function Page({ params }: MultiSegmentPageCalendarYearMonthParams){

	const {year, month } = params;
	const result:DayByCalendarType = await getData(`${year}/${month}`);


	


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