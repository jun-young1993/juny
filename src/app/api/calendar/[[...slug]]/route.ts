import {MultiSegmentApiParams} from "@/types/next.type";
import _ from "lodash";
import {ObsidianContentsByCalendar, ObsidianFileContentsEncoding} from "@/lib/client/obsidian.client";
import {NextResponse} from "next/server";
import {constants} from "http2";

export async function GET(request: Request, { params }: MultiSegmentApiParams) {

    const path = params.slug ? _.join(params.slug,'/') : '';
    const data = await ObsidianContentsByCalendar(path);
    
    const reseult = await ObsidianFileContentsEncoding(data);
    return NextResponse.json(reseult,{
        status: constants.HTTP_STATUS_OK
    })
}