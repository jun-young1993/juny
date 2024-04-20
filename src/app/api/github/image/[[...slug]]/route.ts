import {GITHUB_API_URL, GITHUB_CONFIG, GITHUB_OBSIDIAN_CONFIG, GITHUB_RAW_CONTENT_URL} from "@/lib/config/config";
import {BlogContentInterface} from "@/types/blog.type";
import {
    ObsidianContentsByBlog,
    ObsidianContentsByImage,
    ObsidianFileContentsEncoding
} from "@/lib/client/obsidian.client";
import _ from "lodash";
import {NextResponse} from "next/server";
import {GithubImageContentInterface} from "@/types/github.type";

type Params = {
    params: {
        slug: string[]
    }
}

export async function GET(request: Request, { params }: Params){
    try{
        const path = _.join(params.slug,'/')


        const url = `${GITHUB_RAW_CONTENT_URL}/${GITHUB_OBSIDIAN_CONFIG.owner}/${GITHUB_OBSIDIAN_CONFIG.repo}/main/images/${path}`;

        const res = await fetch(url,{
            headers: {
                'Authorization': `Bearer ${GITHUB_OBSIDIAN_CONFIG.token}`,
                'Accept': 'application/vnd.github.raw+json',
                'X-GitHub-Api-Version': GITHUB_OBSIDIAN_CONFIG.version
            }
        });

        return res;
    }catch( error ){
        return NextResponse.json({
                error: error.toString()
        },{status: 500})
    }


}