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

async function getData(path?: string): Promise<CalendarInterface[] | []> {
	const dynamicPath = path ? path : '';

	const res = await fetch(API_URL(`${CalendarPath}/${dynamicPath}`),{
		method: 'GET',
		next: { tags: dynamicPath.split('/') }
	});

	const result = await res.json();

	return result;
}

export default async function Page({ params }: MultiSegmentPageParams){

	if(params.slug === undefined){
		redirect(`/${MenuType.CALENDAR}/${new Date().getFullYear()}/${fillWord((new Date().getMonth()+1).toString(), 2, '0')}`);
	}

	const path = params.slug
		? _.join(params.slug,'/')
		: undefined;
	const data:CalendarInterface[]| [] = await getData(
		path
	);


	const [year, month] = params.slug;
	const result: {[key: string]: CalendarInterface[] | []} = {};

	for(const calendarForDay of data){
		const day = calendarForDay.name;
		const dataPath: string = `${year}/${month}/${day}`;
		const calendarForDayData = await getData(dataPath);

		console.log("=>(page.tsx:47) calendarForDayData", calendarForDayData);
		result[day] = calendarForDayData;
	}

	return (
		<ContainerLayout
			type={MenuType.CALENDAR}
			title={MenuType.CALENDAR}
		>
			<Calendar
				data={result}
				year={year}
				month={month}
			/>
		</ContainerLayout>
	)
}