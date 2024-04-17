import {ObsidianContentsByBlog, ObsidianFileContentsEncoding} from "@/lib/client/obsidian.client";
import {BlogContentInterface} from "@/types/blog.type";
import {NextResponse} from "next/server";
import {GITHUB_API_URL, GITHUB_OBSIDIAN_CONFIG} from "@/lib/config/config";
import {constants} from "http2";
import _ from "lodash";


type Params = {
    params: {
        slug?: [] | string[]
    }    
}
export async function GET(request: Request, { params }: Params)
{

    const path = params.slug ? _.join(params.slug,'/') : '';

    let data: BlogContentInterface[] = await ObsidianContentsByBlog(path);

    if(path.endsWith(".md")){
        data = await ObsidianFileContentsEncoding(data);
    };

    return NextResponse.json(data,{
        status: constants.HTTP_STATUS_OK,
    });
}