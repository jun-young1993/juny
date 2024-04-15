import {MultiSegmentApiParams, YearMonthDaySlugInterface} from "@/types/next.type";
import _ from "lodash";
import {ObsidianContentsByCalendar, ObsidianFileContentsEncoding} from "@/lib/client/obsidian.client";
import {NextResponse} from "next/server";
import {constants} from "http2";
import { DayByCalendarType } from "@/types/calendar.type";
import { fillWord } from "juny-tsutil";
interface CalendarYearMonthDayInterface {
    params: YearMonthDaySlugInterface
}
export async function GET(request: Request, { params }: CalendarYearMonthDayInterface) {
    const {year, month, day } = params;
    const path = `${year}/${fillWord(month,2,"0")}/${fillWord(day,2,"0")}`;

    const data = await ObsidianContentsByCalendar(path);

    return NextResponse.json(data,{
        status: constants.HTTP_STATUS_OK
    })
}