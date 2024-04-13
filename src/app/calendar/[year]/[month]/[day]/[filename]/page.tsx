import {YearMonthDaySlugInterface} from "@/app/calendar/[year]/[month]/[day]/page";
import {MultiSegmentPageParams} from "@/types/next.type";
import {CalendarInterface} from "@/types/calendar.type";
import {getCalendarData} from "@/app/calendar/[year]/[month]/page";
import {MenuType} from "@/types/menu.type";
import ContainerLayout from "@/components/layouts/container.layouts";
import {CalendarLayout} from "@/components/layouts/calendar.layout";

export interface YearMonthDayFileNameSlugInterface extends YearMonthDaySlugInterface {
    filename: string
}
export interface MultiSegmentPageCalendarYearMonthDayFilenameParams extends MultiSegmentPageParams{
    params: YearMonthDaySlugInterface
}
export default async function Page({params}: MultiSegmentPageCalendarYearMonthDayFilenameParams) {
    const { year, month, day, filename } = params;
    const data:CalendarInterface[]| [] = await getCalendarData(
        `${year}/${month}/${day}`
    );

    const content:CalendarInterface[] = await getCalendarData(
        `${year}/${month}/${day}/${filename}`
    );

    return (
        <ContainerLayout
            type={MenuType.CALENDAR}
            title={MenuType.CALENDAR}
        >
            <CalendarLayout data={data}>
                {content[0].content}
            </CalendarLayout>
        </ContainerLayout>
    )
}