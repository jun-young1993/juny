import {ObsidianContentsByBlog} from "@/lib/client/obsidian.client";
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

    const url = `${GITHUB_API_URL}/repos/${GITHUB_OBSIDIAN_CONFIG.owner}/${GITHUB_OBSIDIAN_CONFIG.repo}/contents/blog/${path}`;
    const res = await fetch(url,{
        headers: {
            'Authorization': `Bearer ${GITHUB_OBSIDIAN_CONFIG.token}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': GITHUB_OBSIDIAN_CONFIG.version
        }
    })

    if(res.status !== constants.HTTP_STATUS_OK){
        throw new Error(res.statusText);
    }

    const data: BlogContentInterface[] = await res.json();

    const formattedData: BlogContentInterface[] = [];
    for(const item of data){
        console.log(item);
        let content: BlogContentInterface['content'] = null;
        if(item.type === 'file'){

            const contentRes = await fetch(item.download_url,{
                headers: {
                    'Authorization': `Bearer ${GITHUB_OBSIDIAN_CONFIG.token}`,
                    'Accept': 'application/vnd.github+json',
                    'X-GitHub-Api-Version': GITHUB_OBSIDIAN_CONFIG.version
                }
            });
            content = await contentRes.text();
            const markdownRes = await fetch(`${GITHUB_API_URL}/markdown`,{
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GITHUB_OBSIDIAN_CONFIG.token}`,
                    'Accept': 'application/vnd.github+json',
                    'X-GitHub-Api-Version': GITHUB_OBSIDIAN_CONFIG.version
                },
                body: JSON.stringify({
                    text: content
                })
            });
            content = await markdownRes.text();
        }

        const formattedItem: BlogContentInterface = {
            name: item.name,
            path: item.path,
            type: item.type,
            content: content,
            download_url: item.download_url
        };

        formattedData.push(formattedItem);
    }


    return NextResponse.json(formattedData,{
        status: constants.HTTP_STATUS_OK,
    });
}