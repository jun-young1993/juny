import {ObsidianContentsByBlog} from "@/lib/client/obsidian.client";
import {BlogContentInterface} from "@/types/blog.type";
import {NextResponse} from "next/server";
import {GITHUB_API_URL, GITHUB_OBSIDIAN_CONFIG} from "@/lib/config/config";
import {constants} from "http2";
import _ from "lodash";



type Params = {

    slug?: [] | string[]

}
export async function GET(request: Request, { params }: Params)
{

    const path = params.slug ? _.join(params.slug,'/') : '';

    const url = `${GITHUB_API_URL}/repos/${GITHUB_OBSIDIAN_CONFIG.owner}/${GITHUB_OBSIDIAN_CONFIG.repo}/contents/blog/${path}`;
    const res = await fetch(url,{
        headers: {
            'Authorization': `Bearer ${GITHUB_OBSIDIAN_CONFIG.token}`,
            'Accept': 'application/vnd.github.html+json',
            'X-GitHub-Api-Version': GITHUB_OBSIDIAN_CONFIG.version
        }
    })

    if(res.status !== constants.HTTP_STATUS_OK){
        throw new Error(res.statusText);
    }

    const data = await res.json();

    return NextResponse.json(data,{
        status: constants.HTTP_STATUS_OK,
    });
}