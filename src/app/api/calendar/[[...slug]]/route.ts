import {MultiSegmentApiParams} from "@/types/next.type";
import _ from "lodash";
import {ObsidianContentsByCalendar} from "@/lib/client/obsidian.client";
import {NextResponse} from "next/server";
import {constants} from "http2";

export async function GET(request: Request, { params }: MultiSegmentApiParams) {

    const path = params.slug ? _.join(params.slug,'/') : '';
    const data = await ObsidianContentsByCalendar(path);

    return NextResponse.json(data,{
        status: constants.HTTP_STATUS_OK
    })
}