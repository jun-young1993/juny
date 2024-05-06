import {NextResponse} from "next/server";
import {constants} from "http2";
import {GITHUB_API_URL, GITHUB_OBSIDIAN_CONFIG, ORIGIN} from "@/lib/config/config";

export const dynamic = 'force-dynamic';
export async function GET(request: Request){

    const url = `${GITHUB_API_URL}/repos/${GITHUB_OBSIDIAN_CONFIG.owner}/${GITHUB_OBSIDIAN_CONFIG.repo}/git/trees/main?recursive=true`
    const res = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${GITHUB_OBSIDIAN_CONFIG.token}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': GITHUB_OBSIDIAN_CONFIG.version
        }
    });
    const jsonData = await res.json();
    const tree = jsonData.tree;
    const result = [];
    console.log("=>(route.ts:19) jsonData", jsonData.length);
    for(let index=0; index<tree.length; index++){
        const currentData = tree[index];
        if(currentData.path.startsWith('blog') && currentData.path.endsWith('.md')){
            result.push({
                url: `${ORIGIN}/${currentData.path}`,
                lastModified: new Date(),
                changeFrequency: 'yearly',
                priority: 1,
            })
        }
    }

    return NextResponse.json(result,{
        status: constants.HTTP_STATUS_OK
    })
}