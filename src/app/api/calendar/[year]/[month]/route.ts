import {MultiSegmentApiParams, YearMonthInterface} from "@/types/next.type";
import _ from "lodash";
import {ObsidianContentsByCalendar, ObsidianFileContentsEncoding} from "@/lib/client/obsidian.client";
import {NextResponse} from "next/server";
import {constants} from "http2";
import { fillWord } from "juny-tsutil";
import { DayByCalendarType } from "@/types/calendar.type";
interface CalendarYearMonthInterface{
    params: YearMonthInterface
}
export async function GET(request: Request, { params}: CalendarYearMonthInterface)
{
    const { year, month } = params;
    const path = `${year}/${fillWord(month,2,"0")}`;
    let data = await ObsidianContentsByCalendar(path);

    const result: DayByCalendarType = {};
    for(const calendarForDay of data){
        const day = calendarForDay.name;
        const dataPath: string = `${year}/${fillWord(month.toString(),2,"0")}/${fillWord(day.toString(),2,"0")}`;
        const calendarForDayData = await ObsidianContentsByCalendar(dataPath);

		result[day] = calendarForDayData;

    }


    return NextResponse.json(result,{
        status: constants.HTTP_STATUS_OK
    })
}