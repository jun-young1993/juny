import {YearMonthDaySlugInterface} from "@/app/calendar/[year]/[month]/[day]/page";
import {MultiSegmentPageParams} from "@/types/next.type";
import {CalendarInterface} from "@/types/calendar.type";

import {MenuType} from "@/types/menu.type";
import ContainerLayout from "@/components/layouts/container.layouts";
import {CalendarLayout} from "@/components/layouts/calendar.layout";
import {getCalendarData} from "@/lib/client/calendar.client";

export interface MultiSegmentPageCalendarYearMonthDayFilenameParams extends MultiSegmentPageParams{
    params: YearMonthDaySlugInterface
}

export async function getData(path: string, contentPath: string): Promise<[CalendarInterface[]]>{

    const data:CalendarInterface[]| [] = await getCalendarData(
        path
    ) as CalendarInterface[];

    const content:CalendarInterface[] = await getCalendarData(
        contentPath
    ) as CalendarInterface[];
    return Promise.resolve([data, content]);
}

export default async function Page({params}: MultiSegmentPageCalendarYearMonthDayFilenameParams) {
    const { year, month, day, filename } = params;
    const [data, content] = await getData(`${year}/${month}/${day}`,`${year}/${month}/${day}/${filename}`);


    return (
        <ContainerLayout
            type={MenuType.CALENDAR}
            title={MenuType.CALENDAR}
        >
            <CalendarLayout
                data={data}
                content={content[0].content ?? ''}
            />
        </ContainerLayout>
    )
}