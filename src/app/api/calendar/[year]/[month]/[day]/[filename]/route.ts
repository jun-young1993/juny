import {MultiSegmentApiParams} from "@/types/next.type";
import _ from "lodash";
import {ObsidianContentsByCalendar, ObsidianFileContentsEncoding} from "@/lib/client/obsidian.client";
import {NextResponse} from "next/server";
import {constants} from "http2";

export async function GET(request: Request, { params }: MultiSegmentApiParams) {

    const path = params.slug ? _.join(params.slug,'/') : '';
    let data = await ObsidianContentsByCalendar(path);

    if(path.endsWith(".md")){
        data = await ObsidianFileContentsEncoding(data);
    };


    return NextResponse.json(data,{
        status: constants.HTTP_STATUS_OK
    })
}