import {MultiSegmentApiParams} from "@/types/next.type";
import _ from "lodash";
import {ObsidianContentsByCalendar, ObsidianFileContentsEncoding} from "@/lib/client/obsidian.client";
import {NextResponse} from "next/server";
import {constants} from "http2";
import { fillWord } from "juny-tsutil";
import { YearMonthDayFilenameSlugInterface } from "@/app/calendar/[year]/[month]/[day]/[filename]/page";
interface YearMonthDayFilenameInterface {
    params: YearMonthDayFilenameSlugInterface
}
export async function GET(request: Request, { params }: YearMonthDayFilenameInterface) {
    const {year, month, day, filename } = params;
    const path = `${year}/${fillWord(month,2,"0")}/${fillWord(day,2,"0")}/${filename}`;
    let data = await ObsidianContentsByCalendar(path);

    if(path.endsWith(".md")){
        data = await ObsidianFileContentsEncoding(data);
    };


    return NextResponse.json(data,{
        status: constants.HTTP_STATUS_OK
    })
}