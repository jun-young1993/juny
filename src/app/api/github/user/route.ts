import { GITHUB_API_URL, GITHUB_CONFIG } from "@/lib/config/config";
import {GithubContentInterface, GithubReadmeContentInterface, GithubUserInterface} from "@/types/github.type";
import { constants } from "http2";
import _ from "lodash";
import { NextResponse } from "next/server";



export async function GET(request: Request)
{

    const url = `${GITHUB_API_URL}/user`;
    const res = await fetch(url,{
        headers: {
            'Authorization': `Bearer ${GITHUB_CONFIG.token}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': GITHUB_CONFIG.version
        }
    })



    if(res.status !== constants.HTTP_STATUS_OK){
        throw new Error(res.statusText);
    }

    const data: GithubUserInterface = await res.json();

    if(_.isEmpty(data)){
        throw new Error('not found github readme.md');
    }

    return NextResponse.json(data,{
        status: constants.HTTP_STATUS_OK,
    })


}